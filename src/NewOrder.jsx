import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderInfo from "./components/new-order-components/OrderInfo";
import MenuSection from "./components/new-order-components/MenuSection";
import OrderCart from "./components/new-order-components/OrderCart";
import OrdersTable from "./components/new-order-components/OrdersTable";
import { createOrder } from "./utils/orders";
import { createKOT, markKOTPrinted } from "./utils/kots";
import { updateTableStatus, getTables } from "./utils/tables";
import { openWhatsAppChat } from "./utils/whatsapp";
import { useGetAllStaffQuery } from "./features/staff/staffApiSlice";

const NewOrder = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [orderType, setOrderType] = useState("takeaway"); // takeaway, phone, online
  const [orderInfo, setOrderInfo] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    tableNumber: "",
    deliveryAddress: "",
    deliveryPhone: "",
    deliveryTime: "",
    notes: "",
    waiterId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Get staff data for WhatsApp integration
  const { data: staffData } = useGetAllStaffQuery();
  const waiters = staffData?.data || [];

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
              <h3>KITCHEN ORDER TICKET (NEW)</h3>
              <p>Type: ${orderType.toUpperCase()}</p>
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

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      } else {
        return [...prev, { ...item, qty: 1, note: item.note || "No special instructions" }];
      }
    });
  };

  const handleSaveDraft = async () => {
    setError("");
    setSuccess("");

    if (cartItems.length === 0) {
      setError("Please add at least one item to save as draft");
      return;
    }

    setLoading(true);

    try {
      const validatedItems = cartItems.map((item) => ({
        name: item.name.trim(),
        qty: parseInt(item.qty),
        price: parseFloat(item.price)
      }));

      const orderData = {
        items: validatedItems,
        notes: orderInfo.notes ? orderInfo.notes.trim() : "",
        source: orderType,
        status: 'draft',
        waiterId: orderInfo.waiterId && orderInfo.waiterId.trim() !== "" ? orderInfo.waiterId : null,
      };

      if (orderType === "takeaway") {
        if (orderInfo.tableNumber) orderData.tableNumber = parseInt(orderInfo.tableNumber);
        orderData.customerName = orderInfo.customerName;
        orderData.customerPhone = orderInfo.customerPhone;
      } else if (orderType === "phone") {
        orderData.customerName = orderInfo.customerName;
        orderData.customerPhone = orderInfo.customerPhone;
        orderData.deliveryAddress = orderInfo.deliveryAddress;
        orderData.deliveryPhone = orderInfo.deliveryPhone;
        orderData.deliveryTime = orderInfo.deliveryTime;
      } else if (orderType === "online") {
        orderData.customerName = orderInfo.customerName;
        orderData.customerEmail = orderInfo.customerEmail;
        orderData.deliveryAddress = orderInfo.deliveryAddress;
        orderData.deliveryPhone = orderInfo.deliveryPhone;
        orderData.deliveryTime = orderInfo.deliveryTime;
      }

      if (orderData.waiterId && (!/^[a-fA-F0-9]{24}$/.test(orderData.waiterId))) {
        delete orderData.waiterId;
      }

      const response = await createOrder(orderData);

      if (response.success) {
        setSuccess(`Draft order saved successfully! ID: ${response.data.orderNumber || "N/A"}`);
        setTimeout(() => {
          setCartItems([]);
          setOrderInfo({
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            tableNumber: "",
            deliveryAddress: "",
            deliveryPhone: "",
            deliveryTime: "",
            notes: "",
            waiterId: "",
          });
          setSuccess("");
          navigate("/orders");
        }, 2000);
      }
    } catch (error) {
      console.error("Save draft error:", error);
      setError(error.message || "Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (cartItems.length > 0 && !window.confirm("Are you sure you want to cancel? All items will be lost.")) {
      return;
    }
    navigate("/orders");
  };

  const handleConfirmOrder = async () => {
    // Clear previous messages
    setError("");
    setSuccess("");

    // Validation
    if (cartItems.length === 0) {
      setError("Please add at least one item to the cart");
      return;
    }

    // Validation based on order type
    if (orderType === "takeaway") {
      // Validate table number for takeaway orders
      const tableNumberCheck = parseInt(orderInfo.tableNumber);
      if (!orderInfo.tableNumber || isNaN(tableNumberCheck) || tableNumberCheck < 1) {
        setError("Please enter a valid table number (must be 1 or greater)");
        return;
      }
      // Validate customer details for takeaway orders
      if (!orderInfo.customerName || orderInfo.customerName.trim() === "") {
        setError("Please enter customer name");
        return;
      }
      if (!orderInfo.customerPhone || orderInfo.customerPhone.trim() === "") {
        setError("Please enter customer phone number");
        return;
      }
    } else if (orderType === "phone") {
      // Validate customer details for phone orders
      if (!orderInfo.customerName || orderInfo.customerName.trim() === "") {
        setError("Please enter customer name");
        return;
      }
      if (!orderInfo.customerPhone || orderInfo.customerPhone.trim() === "") {
        setError("Please enter customer phone number");
        return;
      }
      // Validate delivery details for phone orders
      if (!orderInfo.deliveryPhone || orderInfo.deliveryPhone.trim() === "") {
        setError("Please enter delivery phone number");
        return;
      }
      if (!orderInfo.deliveryAddress || orderInfo.deliveryAddress.trim() === "") {
        setError("Please enter delivery address");
        return;
      }
    } else if (orderType === "online") {
      // Validate customer details for online orders
      if (!orderInfo.customerName || orderInfo.customerName.trim() === "") {
        setError("Please enter customer name");
        return;
      }
      if (!orderInfo.deliveryPhone || orderInfo.deliveryPhone.trim() === "") {
        setError("Please enter delivery phone number");
        return;
      }
      if (!orderInfo.deliveryAddress || orderInfo.deliveryAddress.trim() === "") {
        setError("Please enter delivery address");
        return;
      }
    }

    setLoading(true);

    try {
      // Validate and map items with proper types
      const validatedItems = cartItems.map((item, index) => {
        const qty = parseInt(item.qty);
        const price = parseFloat(item.price);

        if (!item.name || item.name.trim() === "") {
          throw new Error(`Item ${index + 1}: Name is required`);
        }
        if (isNaN(qty) || qty < 1) {
          throw new Error(`Item ${index + 1}: Quantity must be at least 1`);
        }
        if (isNaN(price) || price <= 0) {
          throw new Error(`Item ${index + 1}: Price must be greater than 0`);
        }

        return {
          name: item.name.trim(),
          qty: qty,
          price: price
        };
      });

      // Prepare order data based on order type
      const orderData = {
        items: validatedItems,
        notes: orderInfo.notes ? orderInfo.notes.trim() : "",
        source: orderType,
        waiterId: orderInfo.waiterId && orderInfo.waiterId.trim() !== "" ? orderInfo.waiterId : null,
        customerId: null, // Will be set below if needed
        customerName: null, // Will be set below if needed
        customerPhone: null, // Will be set below if needed
        customerEmail: null, // Will be set below if needed
        deliveryAddress: null, // Will be set below if needed
        deliveryPhone: null, // Will be set below if needed
        deliveryTime: null // Will be set below if needed
      };

      // Add type-specific fields
      if (orderType === "takeaway") {
        const tableNumber = parseInt(orderInfo.tableNumber);
        if (isNaN(tableNumber) || tableNumber < 1) {
          setError("Please enter a valid table number (must be 1 or greater)");
          return;
        }
        orderData.tableNumber = tableNumber;
        orderData.source = "takeaway";
        orderData.customerName = orderInfo.customerName;
        orderData.customerPhone = orderInfo.customerPhone;
      } else if (orderType === "phone") {
        orderData.source = "phone";
        orderData.customerName = orderInfo.customerName;
        orderData.customerPhone = orderInfo.customerPhone;
        orderData.deliveryAddress = orderInfo.deliveryAddress;
        orderData.deliveryPhone = orderInfo.deliveryPhone;
        orderData.deliveryTime = orderInfo.deliveryTime;
      } else if (orderType === "online") {
        orderData.source = "online";
        orderData.customerName = orderInfo.customerName;
        orderData.customerEmail = orderInfo.customerEmail;
        orderData.deliveryAddress = orderInfo.deliveryAddress;
        orderData.deliveryPhone = orderInfo.deliveryPhone;
        orderData.deliveryTime = orderInfo.deliveryTime;
      }

      // Validate waiterId - must be a 24-character hex string or undefined
      if (orderData.waiterId && (!/^[a-fA-F0-9]{24}$/.test(orderData.waiterId))) {
        console.error('Invalid waiterId:', orderData.waiterId);
        delete orderData.waiterId; // Remove invalid waiterId
      }

      // Call API to create order
      const response = await createOrder(orderData);

      if (response.success) {
        const orderId = response.data._id;

        // Auto-create KOT for kitchen when order is created
        try {
          const kotResponse = await createKOT(orderId, 'kitchen');

          // Print KOT and Send WhatsApp
          const createdOrder = response.data;

          // Print KOT
          printKOT(createdOrder, validatedItems);

          // Mark KOT as printed
          if (kotResponse && kotResponse.success && kotResponse.data && kotResponse.data._id) {
            try {
              await markKOTPrinted(kotResponse.data._id);
            } catch (markErr) {
              console.warn("Failed to mark KOT as printed:", markErr);
            }
          }

          // Send WhatsApp to Waiter (if assigned)
          if (orderData.waiterId) {
            const waiter = waiters.find(w => (w._id === orderData.waiterId || w.id === orderData.waiterId));
            if (waiter && waiter.phone) {
              const kotItemsList = validatedItems.map(i => `${i.name} x${i.qty}`).join('\n');
              const message = `New Order Alert (${orderType})!\nOrder #${orderId.slice(-6)}\n\nItems:\n${kotItemsList}\n\nPlease attend to this order.`;

              // Open WhatsApp chat
              openWhatsAppChat(waiter.phone, message);
            }
          }

        } catch (kotError) {
          console.error('Failed to create KOT:', kotError);
          // Don't fail the order creation if KOT creation fails
        }

        // Auto-update table status to 'serving'
        if ((orderType === "takeaway" || orderData.tableNumber) && orderData.tableNumber) {
          try {
            // Fetch tables to find the ID for the given table number
            // We assume getTables returns all tables or we can filter
            const tablesResponse = await getTables();
            if (tablesResponse.success && tablesResponse.data) {
              const table = tablesResponse.data.find(t => t.tableNumber === parseInt(orderData.tableNumber));
              if (table) {
                await updateTableStatus(table._id, "serving");
              }
            }
          } catch (tableErr) {
            console.error("Failed to update table status:", tableErr);
          }
        }

        setSuccess(`${orderType.charAt(0).toUpperCase() + orderType.slice(1)} order created successfully! Order Number: ${response.data.orderNumber || "N/A"}`);

        // Clear form after 2 seconds and redirect
        setTimeout(() => {
          // Reset form
          setCartItems([]);
          setOrderInfo({
            customerName: "",
            customerPhone: "",
            customerEmail: "",
            tableNumber: "",
            deliveryAddress: "",
            deliveryPhone: "",
            deliveryTime: "",
            notes: "",
            waiterId: "",
          });
          setSuccess("");

          // Redirect to order management page
          navigate("/orders");
        }, 2000);
      }
    } catch (error) {
      // Handle authentication errors
      if (error.status === 401 || error.message.includes('Token') || error.message.includes('Unauthorized')) {
        // Session expired message removed as per user request
      } else if (error.status === 400 && error.validationErrors && error.validationErrors.length > 0) {
        // Handle validation errors - show detailed messages
        const validationMessages = error.validationErrors.map(err => {
          const field = err.field || 'unknown';
          const message = err.message || 'Invalid value';
          // Format field names for better readability
          const formattedField = field.replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          return `${formattedField}: ${message}`;
        });
        setError(`Validation failed:\n${validationMessages.join('\n')}`);
      } else {
        // Show error message (may include validation details)
        setError(error.message || "Failed to create order. Please try again.");
      }
      console.error("Order creation error:", error);
      if (error.validationErrors) {
        console.error("Validation errors:", error.validationErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main container */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">New Order</h1>
            <div className="flex gap-3">
              <button
                onClick={handleSaveDraft}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M7 2a1 1 0 000 2h6a1 1 0 100-2H7zM4 5a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 8a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" />
                </svg>
                {loading ? 'Saving...' : 'Save Draft'}
              </button>
              <button
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                Cancel
              </button>
            </div>
          </div>

          {/* Order Type Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setOrderType("takeaway")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${orderType === "takeaway"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              Takeaway (Walk-in)
            </button>
            <button
              onClick={() => setOrderType("phone")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${orderType === "phone"
                ? "bg-green-600 text-white"
                : "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
                }`}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Phone Order
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Order Info */}
          <div className="lg:col-span-2">
            <OrderInfo orderInfo={orderInfo} setOrderInfo={setOrderInfo} orderType={orderType} />
          </div>

          {/* Right Column - Order Cart */}
          <div className="lg:col-span-1">
            <OrderCart
              cartItems={cartItems}
              setCartItems={setCartItems}
              onConfirmOrder={handleConfirmOrder}
              orderType={orderType}
              loading={loading}
              error={error}
              success={success}
            />
          </div>
        </div>

        {/* Menu Section */}
        <div className="mb-6">
          <MenuSection onAddToCart={handleAddToCart} />
        </div>

        {/* Orders Table */}
        <OrdersTable />
      </div>
    </div>
  );
};

export default NewOrder;
