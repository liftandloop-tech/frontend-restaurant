import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Header from "./components/take-order-components/Header";
import Menu from "./components/take-order-components/Menu";
import OrderSummary from "./components/take-order-components/OrderSummary";
import Footer from "./components/take-order-components/Footer";
import DiscountModal from "./components/take-order-components/DiscountModal";
import { TAX_RATE, SERVICE_CHARGE_RATE } from "./utils/constants";
import { getSubtotal, getTax, getServiceCharge, getTotal } from "./utils/calc";
import { createOrder } from "./utils/orders";
import { createKOT } from "./utils/kots";
//import { getCustomers } from "./utils/customers";
import {getCustomers} from "./utils/customers"
const TakeOrder = ({ show, onClose, tableNumber: initialTableNumber }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(initialTableNumber || "");
  const [orderNotes, setOrderNotes] = useState("");
  const [discount, setDiscount] = useState(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
   const [selectedStations, setSelectedStations] = useState([]);
  // const [customers, setCustomers] = useState([]);
  // const [selectedCustomerId, setSelectedCustomerId] = useState("");
  // const [customerSearchTerm, setCustomerSearchTerm] = useState("");
const [customers,setCustomers] = useState([])
const [selectedCustomerId, setSelectedCustomerId] =useState("")
const [customerSearchTerm, setCustomerSearchTerm] = useState("")
const [selectedWaiterId, setSelectedWaiterId] = useState("")

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
    const serviceCharge = getServiceCharge(subtotal);
    
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
    
    const total = getTotal(subtotal, tax, serviceCharge) - discountAmount;
    setTotals({ subtotal, tax, serviceCharge, discount: discountAmount, total: Math.max(0, total) });
  }, [orderItems, discount]);

  // Load customers for selection
  // useEffect(() => {
  //   const loadCustomers = async () => {
  //     try {
  //       const response = await getCustomers({ isActive: true });
  //       if (response.success && response.data) {
  //         setCustomers(response.data);
  //       }
  //     } catch (err) {
  //       console.error("Error loading customers:", err);
  //     }
  //   };

  //   loadCustomers();
  // }, []);

  //laod customers for selection
  useEffect(() => {
    const loadCustomers = async () => {
      try{
        const response = await getCustomers({ isActive: true})
        if(response.success && response.data){
          setCustomers(response.data)
        }
      } catch (err) {
        console.error("Error loading customer: ", err)
      }
    };
    ;loadCustomers()
  },[])

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
    customer.phone.includes(customerSearchTerm)
  );

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
   * Handle sending order to KOT (Kitchen Order Ticket)
   */
  const handleSendToKOT = async () => {
    // Validation
    if (orderItems.length === 0) {
      setError("Please add items to the order before sending to kitchen.");
      return;
    }

    if (!tableNumber || tableNumber.trim() === "") {
      setError("Please enter a table number.");
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
      const numericTableNumber = parseInt(tableNumber, 10);
      const orderData = {
        tableNumber: numericTableNumber,
        items: orderItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          specialInstructions: item.specialInstructions || item.note || undefined,
        })),
        notes: orderNotes.trim(),
        discount: discount || undefined,
        source: "dine-in",
        customerId: selectedCustomerId && selectedCustomerId.trim() !== "" ? selectedCustomerId : null,
        customerName: null, // Not required for dine-in
        customerPhone: null, // Not required for dine-in
        waiterId: selectedWaiterId && selectedWaiterId.trim() !== "" ? selectedWaiterId : null
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

      const orderResponse = await createOrder(orderData);

      if (!orderResponse.success || !orderResponse.data?._id) {
        throw new Error("Failed to create order");
      }

      const orderId = orderResponse.data._id;

      if (typeof window !== "undefined") {
        try {
          const raw = localStorage.getItem("tableOrders");
          const existing = raw ? JSON.parse(raw) : {};
          existing[numericTableNumber] = {
            orderId,
            tableNumber: numericTableNumber,
            updatedAt: new Date().toISOString(),
          };
          localStorage.setItem("tableOrders", JSON.stringify(existing));
        } catch (storageError) {
          console.warn("Failed to persist table order context:", storageError);
        }
      }

      // Step 2: Create KOTs for each selected station, or default to kitchen if none selected
      const stationsToCreate = selectedStations.length > 0 ? selectedStations : ['kitchen'];
      const kotPromises = stationsToCreate.map((station) =>
        createKOT(orderId, station)
      );

      const kotResponses = await Promise.all(kotPromises);

      // Success
      const stationsMessage = selectedStations.length > 0 
        ? selectedStations.join(", ") 
        : "kitchen (default)";
      setSuccess(
        `Order created successfully! KOTs sent to: ${stationsMessage}`
      );

      // Reset form after 2 seconds
      setTimeout(() => {
        setOrderItems([]);
        setTableNumber("");
        setOrderNotes("");
        setDiscount(null);
        setSelectedStations([]);
        setSuccess("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error creating order/KOT:", error);
      
      // Handle authentication errors
      if (error.status === 401 || error.message.includes('Token') || error.message.includes('Unauthorized') || error.message.includes('expired') || error.isRefreshFailure) {
        if (error.isRefreshFailure) {
          // Redirect is already happening from api.js
          return;
        }
        
        setError("Your session has expired. Please login again.");
        setTimeout(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('isAuthenticated');
          window.location.href = '/login';
        }, 2000);
      } else if (error.status === 400 && error.validationErrors && error.validationErrors.length > 0) {
        // Handle validation errors
        const validationMessages = error.validationErrors.map(err => {
          const field = err.field || 'unknown';
          const message = err.message || 'Invalid value';
          const formattedField = field.replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          return `${formattedField}: ${message}`;
        });
        setError(`Validation failed:\n${validationMessages.join('\n')}`);
      } else {
        // Other errors
        setError(
          error.message ||
            "Failed to create order and send KOT. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle saving draft
   */
  const handleSaveDraft = async () => {
    // Validation - at least table number is required for drafts
    if (!tableNumber || tableNumber.trim() === "") {
      setError("Please enter a table number to save draft.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Create the order as draft
      const numericTableNumber = parseInt(tableNumber, 10);
      const orderData = {
        tableNumber: numericTableNumber,
        items: orderItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          specialInstructions: item.specialInstructions || item.note || undefined,
        })),
        notes: orderNotes.trim(),
        discount: discount || undefined,
        source: "dine-in",
        customerId: selectedCustomerId && selectedCustomerId.trim() !== "" ? selectedCustomerId : undefined,
        waiterId: selectedWaiterId && selectedWaiterId.trim() !== "" ? selectedWaiterId : undefined,
        status: "draft" // Set status to draft
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

      const orderResponse = await createOrder(orderData);

      if (!orderResponse.success || !orderResponse.data?._id) {
        throw new Error("Failed to save draft order");
      }

      setSuccess("Draft order saved successfully!");

      // Reset form after 2 seconds
      setTimeout(() => {
        setOrderItems([]);
        setTableNumber("");
        setOrderNotes("");
        setDiscount(null);
        setSelectedStations([]);
        setSelectedCustomerId("");
        setCustomerSearchTerm("");
        setSelectedWaiterId("");
        setSuccess("");
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error saving draft order:", error);

      // Handle authentication errors
      if (error.status === 401 || error.message.includes('Token') || error.message.includes('Unauthorized') || error.message.includes('expired') || error.isRefreshFailure) {
        if (error.isRefreshFailure) {
          // Redirect is already happening from api.js
          return;
        }

        setError("Your session has expired. Please login again.");
        setTimeout(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('isAuthenticated');
          window.location.href = '/login';
        }, 2000);
      } else {
        setError(
          error.message ||
          "Failed to save draft order. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
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
    setTableNumber("");
    setOrderNotes("");
    setDiscount(null);
    setSelectedStations([]);
    setSelectedCustomerId("")
    setCustomerSearchTerm("")
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
          tableNumber={tableNumber}
          selectedWaiterId={selectedWaiterId}
          onWaiterChange={setSelectedWaiterId}
        />
        <main className="flex flex-1 overflow-hidden">
          <div className="w-2/3 p-6 overflow-y-auto scrollbar-hide">
            <Menu onAddToOrder={addToOrder} />
          </div>
          {/* Right Panel: Order Summary - Padding has been removed from this container */}
          <div className="w-1/3 bg-gray-50 border-l border-gray-200 flex flex-col h-full">
            <OrderSummary
              orderItems={orderItems}
              totals={totals}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeFromOrder}
              tableNumber={tableNumber}
              onTableNumberChange={setTableNumber}
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

// PropTypes validation for the TakeOrder component.
TakeOrder.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TakeOrder;
