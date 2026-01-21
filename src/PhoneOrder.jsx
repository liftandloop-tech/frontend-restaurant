import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Header from "./components/take-order-components/Header";
import Menu from "./components/take-order-components/Menu";
import OrderSummary from "./components/take-order-components/OrderSummary";
import Footer from "./components/take-order-components/Footer";
import DiscountModal from "./components/take-order-components/DiscountModal";
import { TAX_RATE, SERVICE_CHARGE_RATE } from "./utils/constants";
import { getSubtotal, getTax, getServiceCharge, getTotal } from "./utils/calc";
import { useCreateOrderMutation } from "./features/orders/ordersApiSlice";
import { useCreateKOTMutation } from "./features/kots/kotsApiSlice";
import { useGetCustomersQuery } from "./features/customers/customersApiSlice";

const PhoneOrder = ({ show, onClose }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [orderNotes, setOrderNotes] = useState("");
  const [discount, setDiscount] = useState(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedStations, setSelectedStations] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [selectedWaiterId, setSelectedWaiterId] = useState("");

  // RTK Query Hooks
  const { data: customersResponse } = useGetCustomersQuery({ isActive: true });
  const [createOrderApi] = useCreateOrderMutation();
  const [createKOTApi] = useCreateKOTMutation();

  const customers = useMemo(() => {
    return customersResponse?.success ? customersResponse.data : [];
  }, [customersResponse]);

  // Delivery details for phone orders
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");

  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    serviceCharge: 0,
    discount: 0,
    total: 0,
  });

  // Recalculate totals whenever the orderItems array or discount changes.
  useEffect(() => {
    // Use utility functions to compute all totals, for maintainability
    const subtotal = getSubtotal(orderItems);
    const tax = getTax(subtotal);
    const serviceChargeResult = 0; // Service charge disabled: getServiceCharge(subtotal);

    // Calculate discount
    let discountAmount = 0;
    if (discount) {
      if (discount.type === "percentage") {
        discountAmount = (subtotal * discount.value) / 100;
      } else {
        discountAmount = discount.value;
      }
      // Ensure discount doesn't exceed subtotal
      discountAmount = Math.min(discountAmount, subtotal);
    }

    const totalCalculated = getTotal(subtotal, tax, serviceChargeResult) - discountAmount;
    setTotals({ subtotal, tax, serviceCharge: serviceChargeResult, discount: discountAmount, total: Math.max(0, totalCalculated) });
  }, [orderItems, discount]);

  /**
   * Adds a new item to the order or increments the quantity if it already exists.
   * @param {object} item - The menu item to add.
   */
  const addToOrder = (item) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        // If item exists, return a new array with the updated quantity.
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // If item is new, add it to the array with a quantity of 1.
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  /**
   * Updates the quantity of an item in the order.
   * If the new quantity is 0 or less, the item is removed.
   * @param {string} itemName - The name of the item to update.
   * @param {number} newQuantity - The new quantity.
   */
  const updateQuantity = (itemName, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromOrder(itemName);
    } else {
      setOrderItems((prevItems) =>
        prevItems.map((i) =>
          i.name === itemName ? { ...i, quantity: newQuantity } : i
        )
      );
    }
  };

  /**
   * Removes an item from the order completely.
   * @param {string} itemName - The name of the item to remove.
   */
  const removeFromOrder = (itemName) => {
    setOrderItems((prevItems) => prevItems.filter((i) => i.name !== itemName));
  };

  /**
   * Handle applying discount
   */
  const handleApplyDiscount = (discountData) => {
    setDiscount(discountData);
    setIsDiscountModalOpen(false);
  };

  /**
   * Handle station selection in footer
   */
  const handleStationToggle = (station) => {
    setSelectedStations((prev) => {
      if (prev.includes(station)) {
        return prev.filter((s) => s !== station);
      } else {
        return [...prev, station];
      }
    });
  };

  /**
   * Handle sending phone order to KOT (Kitchen Order Ticket)
   */
  const handleSendToKOT = async () => {
    // Validation
    if (orderItems.length === 0) {
      setError("Please add items to the order before sending to kitchen.");
      return;
    }

    if (!deliveryPhone || deliveryPhone.trim() === "") {
      setError("Please enter delivery phone number.");
      return;
    }

    if (!deliveryAddress || deliveryAddress.trim() === "") {
      setError("Please enter delivery address.");
      return;
    }

    if (selectedStations.length === 0) {
      setError("Please select at least one station (Kitchen, Bar, or Beverage).");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Create the order
      // Find selected customer data
      const selectedCustomer = customers.find(c => c._id === selectedCustomerId);

      const orderData = {
        items: orderItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          specialInstructions: item.specialInstructions || item.note || undefined,
        })),
        notes: orderNotes.trim(),
        discount: discount || undefined,
        source: "phone",
        customerId: selectedCustomerId && selectedCustomerId.trim() !== "" ? selectedCustomerId : null,
        customerName: selectedCustomer ? selectedCustomer.name : (deliveryAddress ? deliveryAddress.split(',')[0].trim() : 'Phone Customer'),
        customerPhone: selectedCustomer ? selectedCustomer.phone : deliveryPhone,
        customerEmail: null,
        deliveryAddress: deliveryAddress || null,
        deliveryPhone: deliveryPhone || null,
        deliveryTime: deliveryTime || 'ASAP',
        waiterId: selectedWaiterId && selectedWaiterId.trim() !== "" ? selectedWaiterId : null,
        status: 'confirmed' // Phone orders start as confirmed
      };

      // Validate customerId - must be a 24-character hex string or undefined
      if (orderData.customerId && (!/^[a-fA-F0-9]{24}$/.test(orderData.customerId))) {
        console.error('Invalid customerId:', orderData.customerId);
        delete orderData.customerId; // Remove invalid customerId
      }

      // Validate waiterId - must be a 24-character hex string or undefined
      if (orderData.waiterId && (!/^[a-fA-F0-9]{24}$/.test(orderData.waiterId))) {
        console.error('Invalid waiterId:', orderData.waiterId);
        delete orderData.waiterId; // Remove invalid waiterId
      }

      const orderResponse = await createOrderApi(orderData).unwrap();

      if (!orderResponse.success || !orderResponse.data?._id) {
        throw new Error("Failed to create phone order");
      }

      const orderId = orderResponse.data._id;

      // Step 2: Create KOTs for each selected station
      const stationsToCreate = selectedStations.length > 0 ? selectedStations : ['kitchen'];
      const kotPromises = stationsToCreate.map((station) =>
        createKOTApi({ orderId, station }).unwrap()
      );

      await Promise.all(kotPromises);

      // Success
      const stationsMessage = selectedStations.length > 0
        ? selectedStations.join(", ")
        : "kitchen (default)";
      setSuccess(
        `Phone order created successfully! KOTs sent to: ${stationsMessage}`
      );

      // Reset form after 2 seconds
      setTimeout(() => {
        setOrderItems([]);
        setOrderNotes("");
        setDeliveryAddress("");
        setDeliveryPhone("");
        setDeliveryTime("");
        setDiscount(null);
        setSelectedStations([]);
        setSelectedCustomerId("");
        setCustomerSearchTerm("");
        setSelectedWaiterId("");
        setSuccess("");
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Error creating phone order/KOT:", err);
      setError(err.data?.message || err.message || "Failed to create phone order and send KOT. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle save draft
   */
  const handleSaveDraft = () => {
    // For now, just show a message
    alert("Draft saved! (This feature will be implemented soon)");
  };

  /**
   * Handle cancel
   */
  const handleCancel = () => {
    if (
      orderItems.length > 0 &&
      !window.confirm(
        "Are you sure you want to cancel? All items will be lost."
      )
    ) {
      return;
    }
    setOrderItems([]);
    setOrderNotes("");
    setDeliveryAddress("");
    setDeliveryPhone("");
    setDeliveryTime("");
    setDiscount(null);
    setSelectedStations([]);
    setSelectedCustomerId("");
    setCustomerSearchTerm("");
    setSelectedWaiterId("");
    setError("");
    setSuccess("");
    onClose();
  };

  // Do not render the component if the 'show' prop is false.
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-lg bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col">
        <Header
          onClose={onClose}
          title="Phone Order"
          selectedWaiterId={selectedWaiterId}
          onWaiterChange={setSelectedWaiterId}
        />
        <main className="flex flex-1 overflow-hidden">
          <div className="w-2/3 p-6 overflow-y-auto scrollbar-hide">
            <Menu onAddToOrder={addToOrder} />
          </div>
          {/* Right Panel: Order Summary */}
          <div className="w-1/3 bg-gray-50 border-l border-gray-200 flex flex-col h-full">
            <OrderSummary
              orderItems={orderItems}
              totals={totals}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromOrder}
              orderNotes={orderNotes}
              onOrderNotesChange={setOrderNotes}
              discount={discount}
              onSendToKOT={handleSendToKOT}
              onSaveDraft={handleSaveDraft}
              onCancel={handleCancel}
              onApplyDiscount={() => setIsDiscountModalOpen(true)}
              loading={loading}
              error={error}
              success={success}
              selectedCustomerId={selectedCustomerId}
              onCustomerChange={setSelectedCustomerId}
              customers={customers}
              customerSearchTerm={customerSearchTerm}
              onCustomerSearchChange={setCustomerSearchTerm}
              // Phone order specific fields
              deliveryAddress={deliveryAddress}
              onDeliveryAddressChange={setDeliveryAddress}
              deliveryPhone={deliveryPhone}
              onDeliveryPhoneChange={setDeliveryPhone}
              deliveryTime={deliveryTime}
              onDeliveryTimeChange={setDeliveryTime}
              isPhoneOrder={true}
            />
          </div>
        </main>
        <Footer
          orderItems={orderItems}
          selectedStations={selectedStations}
          onStationToggle={handleStationToggle}
        />

        {/* Discount Modal */}
        <DiscountModal
          isOpen={isDiscountModalOpen}
          onClose={() => setIsDiscountModalOpen(false)}
          onApplyDiscount={handleApplyDiscount}
          currentDiscount={discount}
        />
      </div>
    </div>
  );
};

// PropTypes validation for the PhoneOrder component.
PhoneOrder.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PhoneOrder;
