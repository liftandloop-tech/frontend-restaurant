import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import Header from "./components/take-order-components/Header";
import Menu from "./components/take-order-components/Menu";
import OrderSummary from "./components/take-order-components/OrderSummary";
import Footer from "./components/take-order-components/Footer";
import DiscountModal from "./components/take-order-components/DiscountModal";
import { getSubtotal, getTax, getServiceCharge, getTotal } from "./utils/calc";

// Redux / RTK Query imports
import { useGetCustomersQuery } from "./features/customers/customersApiSlice";
import { useCreateOrderMutation } from "./features/orders/ordersApiSlice";
import { useCreateKOTMutation, useMarkKOTPrintedMutation } from "./features/kots/kotsApiSlice";
import { useGetAllStaffQuery } from "./features/staff/staffApiSlice";
import { openWhatsAppChat } from "./utils/whatsapp";

const TakeOrder = ({ show, onClose, tableNumber: initialTableNumber, isSidebarCollapsed }) => {
  const [orderItems, setOrderItems] = useState([]);
  const [tableNumber, setTableNumber] = useState(initialTableNumber || "");
  const [orderNotes, setOrderNotes] = useState("");
  const [discount, setDiscount] = useState(null);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);

  // Close modal on navigation
  const location = useLocation();
  const [initialPath] = useState(location.pathname);

  useEffect(() => {
    if (location.pathname !== initialPath) {
      onClose();
    }
  }, [location.pathname, initialPath, onClose]);

  // Local UI state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedStations, setSelectedStations] = useState([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [selectedWaiterId, setSelectedWaiterId] = useState("");

  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    serviceCharge: 0,
    discount: 0,
    total: 0,
  });

  // RTK Query Hooks
  const { data: customersResponse } = useGetCustomersQuery({ isActive: true });
  const { data: staffData } = useGetAllStaffQuery();
  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [createKOT, { isLoading: isCreatingKOT }] = useCreateKOTMutation();
  const [markKOTPrinted] = useMarkKOTPrintedMutation();

  const loading = isCreatingOrder || isCreatingKOT;
  const customers = customersResponse?.data || [];
  const waiters = staffData?.data || [];

  // Recalculate totals
  useEffect(() => {
    const subtotal = getSubtotal(orderItems);
    const tax = getTax(subtotal);
    const serviceCharge = 0; // Service charge disabled: getServiceCharge(subtotal);

    let discountAmount = 0;
    if (discount) {
      if (discount.type === "percentage") {
        discountAmount = (subtotal * discount.value) / 100;
      } else {
        discountAmount = discount.value;
      }
      discountAmount = Math.min(discountAmount, subtotal);
    }

    const total = getTotal(subtotal, tax, serviceCharge) - discountAmount;
    setTotals({ subtotal, tax, serviceCharge, discount: discountAmount, total: Math.max(0, total) });
  }, [orderItems, discount]);

  const addToOrder = (item) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.name === item.name);
      if (existingItem) {
        return prevItems.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

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

  const removeFromOrder = (itemName) => {
    setOrderItems((prevItems) => prevItems.filter((i) => i.name !== itemName));
  };

  const handleApplyDiscount = (discountData) => {
    setDiscount(discountData);
    setIsDiscountModalOpen(false);
  };

  const handleStationToggle = (station) => {
    setSelectedStations((prev) => {
      if (prev.includes(station)) {
        return prev.filter((s) => s !== station);
      } else {
        return [...prev, station];
      }
    });
  };

  const printKOT = (orderData, kotItems) => {
    const printWindow = window.open('', '_blank', 'width=300,height=600');
    if (!printWindow) return;

    const itemsHtml = kotItems.map(item => `
        <div style="display: flex; justify-content: space-between; margin: 5px 0;">
          <span>${item.name} x${item.qty || item.quantity}</span>
        </div>
        ${item.specialInstructions ? `<div style="font-size: 12px; font-style: italic;">Note: ${item.specialInstructions}</div>` : ''}
      `).join('');

    const html = `
        <html>
          <head>
            <style>
              body { font-family: monospace; padding: 10px; max-width: 300px; margin: 0 auto; }
              .header { text-align: center; border-bottom: 1px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
              .footer { text-align: center; border-top: 1px dashed #000; padding-top: 10px; margin-top: 10px; font-size: 12px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h3>KITCHEN ORDER TICKET</h3>
              <p>Table: ${orderData.tableNumber}</p>
              <p>Date: ${new Date().toLocaleString()}</p>
              <p>Order #: ${orderData._id?.slice(-6) || 'N/A'}</p>
            </div>
            <div>
              ${itemsHtml}
            </div>
            <div class="footer">
              <p>Printed: ${new Date().toLocaleTimeString()}</p>
            </div>
          </body>
        </html>
      `;
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  const processOrder = async (shouldPrint = false) => {
    if (orderItems.length === 0) {
      setError("Please add items to the order before sending to kitchen.");
      return;
    }

    if (!tableNumber || tableNumber.trim() === "") {
      setError("Please enter a table number.");
      return;
    }

    const numericTableNumber = parseInt(tableNumber, 10);
    if (isNaN(numericTableNumber) || numericTableNumber < 1) {
      setError("Please enter a valid table number (must be a number greater than 0).");
      return;
    }

    if (selectedStations.length === 0) {
      setError("Please select at least one station (Kitchen, Bar, or Beverage).");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const numericTableNumber = parseInt(tableNumber, 10);
      const orderData = {
        tableNumber: numericTableNumber,
        items: orderItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          specialInstructions: item.specialInstructions || item.note || undefined,
        })),
        notes: orderNotes.trim() || undefined,
        discount: discount || undefined,
        source: "dine-in"
      };

      // Only add customerId if it's a valid ObjectId
      if (selectedCustomerId && selectedCustomerId.trim() !== "" && /^[a-fA-F0-9]{24}$/.test(selectedCustomerId)) {
        orderData.customerId = selectedCustomerId;
      }

      // Only add waiterId if it's a valid ObjectId
      if (selectedWaiterId && selectedWaiterId.trim() !== "" && /^[a-fA-F0-9]{24}$/.test(selectedWaiterId)) {
        orderData.waiterId = selectedWaiterId;
      }

      // Create Order
      const orderResponse = await createOrder(orderData).unwrap();

      if (!orderResponse.success || !orderResponse.data?._id) {
        throw new Error("Failed to create order");
      }

      const orderId = orderResponse.data._id;
      const createdOrder = orderResponse.data;

      // Persist table order context
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

      // Create KOTs
      const stationsToCreate = selectedStations.length > 0 ? selectedStations : ['kitchen'];
      const kotPromises = stationsToCreate.map((station) =>
        createKOT({ orderId, station }).unwrap()
      );

      const createdKots = await Promise.all(kotPromises);

      // Handle Printing and WhatsApp
      if (shouldPrint) {
        // Print KOT
        printKOT(createdOrder, orderItems);

        // Mark all created KOTs as printed
        if (createdKots && createdKots.length > 0) {
          for (const kotResult of createdKots) {
            const kotData = kotResult?.data || kotResult;
            if (kotData && kotData._id) {
              try {
                await markKOTPrinted(kotData._id).unwrap();
              } catch (err) {
                console.warn("Failed to mark KOT as printed:", err);
              }
            }
          }
        }

        // Send WhatsApp to Waiter
        if (selectedWaiterId) {
          const waiter = waiters.find(w => (w._id === selectedWaiterId || w.id === selectedWaiterId));
          if (waiter && waiter.phone) {
            const kotItemsList = orderItems.map(i => `${i.name} x${i.quantity}`).join('\n');
            const message = `KOT Alert!\nTable: ${numericTableNumber}\nOrder #${orderId.slice(-6)}\n\nItems:\n${kotItemsList}\n\nPlease attend to this order.`;

            // Open WhatsApp chat
            openWhatsAppChat(waiter.phone, message);
          }
        }
      }

      const stationsMessage = selectedStations.length > 0
        ? selectedStations.join(", ")
        : "kitchen (default)";
      setSuccess(
        `Order created successfully! KOTs sent to: ${stationsMessage}`
      );

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

      const errorMessage = error.data?.message || error.message || "Failed to create order and send KOT.";

      if (error.status === 400 && error.data?.errors) {
        const validationMessages = error.data.errors.map(err => {
          return `${err.field}: ${err.message}`;
        });
        setError(`Validation failed:\n${validationMessages.join('\n')}`);
      } else {
        setError(errorMessage);
      }
    }
  };

  const handleSendToKOT = () => processOrder(true);
  const handlePrintAndSend = () => processOrder(true);

  const handleSaveDraft = async () => {
    if (!tableNumber || tableNumber.trim() === "") {
      setError("Please enter a table number to save draft.");
      return;
    }

    const numericTableNumber = parseInt(tableNumber, 10);
    if (isNaN(numericTableNumber) || numericTableNumber < 1) {
      setError("Please enter a valid table number (must be a number greater than 0).");
      return;
    }

    setError("");
    setSuccess("");

    try {
      const numericTableNumber = parseInt(tableNumber, 10);
      const orderData = {
        tableNumber: numericTableNumber,
        items: orderItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          specialInstructions: item.specialInstructions || item.note || undefined,
        })),
        notes: orderNotes.trim() || undefined,
        discount: discount || undefined,
        source: "dine-in",
        status: "draft"
      };

      // Only add customerId if it's a valid ObjectId
      if (selectedCustomerId && selectedCustomerId.trim() !== "" && /^[a-fA-F0-9]{24}$/.test(selectedCustomerId)) {
        orderData.customerId = selectedCustomerId;
      }

      // Only add waiterId if it's a valid ObjectId
      if (selectedWaiterId && selectedWaiterId.trim() !== "" && /^[a-fA-F0-9]{24}$/.test(selectedWaiterId)) {
        orderData.waiterId = selectedWaiterId;
      }

      const orderResponse = await createOrder(orderData).unwrap();

      if (!orderResponse.success || !orderResponse.data?._id) {
        throw new Error("Failed to save draft order");
      }

      setSuccess("Draft order saved successfully!");

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
      setError(error.data?.message || error.message || "Failed to save draft order.");
    }
  };

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

  if (!show) {
    return null;
  }

  const sidebarWidth = isSidebarCollapsed ? "80px" : "260px";

  return (
    <div
      className="fixed inset-0 bg-white/20 backdrop-blur-lg bg-opacity-25 flex items-center justify-center z-50 transition-[left] duration-300 ease-in-out"
      onClick={onClose}
      style={{ left: sidebarWidth }}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
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
              onPrintAndSend={handlePrintAndSend}
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

TakeOrder.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tableNumber: PropTypes.string,
};

export default TakeOrder;
