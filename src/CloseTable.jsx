import React, { useMemo, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/close-table-components/Header";
import OrderItems from "./components/close-table-components/OrderItems";
import Offers from "./components/close-table-components/Offers";
import QRPay from "./components/close-table-components/QRPay";
import BillSummary from "./components/close-table-components/BillSummary";
import TaxAndCharges from "./components/close-table-components/TaxAndCharges";
import PaymentMethods from "./components/close-table-components/PaymentMethods";
import UpiOptions from "./components/close-table-components/UpiOptions";
import ReceiptOptions from "./components/close-table-components/ReceiptOptions";
import FooterBar from "./components/close-table-components/FooterBar";
import { TAX_RATE, SERVICE_CHARGE_RATE } from "./utils/constants";
import { getSubtotal, getTax, getServiceCharge, getTotal } from "./utils/calc";
import { useGetOrderByIdQuery, useGetOrdersQuery, useUpdateOrderStatusMutation } from "./features/orders/ordersApiSlice";
import { useCreateBillMutation, useProcessPaymentMutation } from "./features/bills/billsApiSlice";
import { useUpdateTableStatusMutation, useGetTablesQuery } from "./features/tables/tablesApiSlice";

const CloseTable = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search || "");
  const stateOrderId = location.state?.orderId || searchParams.get("orderId");
  const stateTableNumber =
    location.state?.tableNumber || searchParams.get("tableNumber");
  const derivedContext = useMemo(() => {
    if (stateOrderId || stateTableNumber) {
      return {
        orderId: stateOrderId || undefined,
        tableNumber: stateTableNumber || undefined,
      };
    }

    if (typeof window === "undefined") {
      return { orderId: undefined, tableNumber: undefined };
    }

    try {
      const stored = localStorage.getItem("tableOrders");
      if (!stored) {
        return { orderId: undefined, tableNumber: undefined };
      }
      const parsed = JSON.parse(stored);
      const entries = Object.values(parsed || {});
      if (!Array.isArray(entries) || entries.length === 0) {
        return { orderId: undefined, tableNumber: undefined };
      }
      const latest = entries
        .filter((entry) => entry?.orderId && entry?.tableNumber)
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt || 0) -
            new Date(a.updatedAt || a.createdAt || 0)
        )[0];
      if (!latest) {
        return { orderId: undefined, tableNumber: undefined };
      }
      return {
        orderId: latest.orderId,
        tableNumber: latest.tableNumber,
      };
    } catch (error) {
      console.warn("Failed to read stored table orders:", error);
      return { orderId: undefined, tableNumber: undefined };
    }
  }, [stateOrderId, stateTableNumber]);

  const orderId = derivedContext.orderId;
  const tableNumber = derivedContext.tableNumber;
  const tableId = location.state?.tableId;

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0); // absolute value
  const [tipAmount] = useState(0); // setTipAmount was unused
  const [includeServiceCharge, setIncludeServiceCharge] = useState(true);
  const [includeTax, setIncludeTax] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // cash|card|upi|wallet
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tableInfo, setTableInfo] = useState({
    tableCode: tableNumber ? `T${tableNumber}` : "T12",
    seats: 4,
    orderKots: 1,
    serverName: "Staff",
  });

  // RTK Query Hooks
  const { data: orderByIdData } = useGetOrderByIdQuery(orderId, { skip: !orderId });
  const { data: ordersByTableData } = useGetOrdersQuery({ tableNumber: parseInt(tableNumber) }, { skip: !!orderId || !tableNumber });
  const { data: allTablesData } = useGetTablesQuery(undefined, { skip: !localStorage.getItem('authToken') });

  const [updateOrderStatusApi] = useUpdateOrderStatusMutation();
  const [createBillApi] = useCreateBillMutation();
  const [processPaymentApi] = useProcessPaymentMutation();
  const [updateTableStatusApi] = useUpdateTableStatusMutation();

  useEffect(() => {
    if (tableNumber) {
      setTableInfo((prev) => ({
        ...prev,
        tableCode: `T${tableNumber}`,
      }));
    }
  }, [tableNumber]);

  // Handle data mapping from RTK Query
  useEffect(() => {
    let orderData = null;
    if (orderId && orderByIdData?.success) {
      orderData = orderByIdData.data;
    } else if (tableNumber && ordersByTableData?.success && ordersByTableData.data.length > 0) {
      const relevantStatuses = ["pending", "confirmed", "preparing", "ready", "served"];
      const activeOrders = ordersByTableData.data
        .filter((ord) => relevantStatuses.includes(ord.status))
        .sort((a, b) => {
          const aDate = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const bDate = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return bDate - aDate;
        });
      if (activeOrders.length > 0) {
        orderData = activeOrders[0];
      }
    }

    if (orderData) {
      setOrder(orderData);
      const formattedItems = orderData.items.map((item, index) => ({
        id: index + 1,
        name: item.name,
        note: item.specialInstructions || "",
        quantity: item.qty,
        price: item.price,
      }));
      setItems(formattedItems);
      setDiscount(orderData.discount || 0);

      setTableInfo({
        tableCode: `T${orderData.tableNumber}`,
        seats: 4,
        orderKots: 1,
        serverName: orderData.waiterId?.name || "Staff",
      });
    }
  }, [orderId, tableNumber, orderByIdData, ordersByTableData]);

  // Calculates subtotal, tax, service charge, and final amount to pay for the order.
  const calculations = useMemo(() => {
    // Use order totals if available, otherwise calculate from items
    if (order) {
      const subtotal = order.subtotal || getSubtotal(items);
      const taxAmount = order.tax || getTax(subtotal, discount);
      const tax = includeTax ? taxAmount : 0;
      const serviceChargeResult = includeServiceCharge ? getServiceCharge(subtotal, includeServiceCharge) : 0;
      const totalPayable = subtotal - discount + tax + serviceChargeResult + tipAmount;
      return { subtotal, tax, serviceCharge: serviceChargeResult, totalPayable };
    }

    // Fallback calculation
    const subtotal = getSubtotal(items);
    const taxAmount = getTax(subtotal, discount);
    const tax = includeTax ? taxAmount : 0;
    const serviceChargeResult = getServiceCharge(subtotal, includeServiceCharge);
    const totalPayable = getTotal(
      subtotal,
      tax,
      serviceChargeResult,
      tipAmount,
      discount
    );
    return { subtotal, tax, serviceCharge: serviceChargeResult, totalPayable };
  }, [items, discount, includeServiceCharge, includeTax, tipAmount, order]);

  // Updates the quantity of a specific item. If set to 0, remove the item.
  const updateQty = (id, nextQty) => {
    if (nextQty <= 0) {
      setItems((prev) => prev.filter((i) => i.id !== id)); // Remove item
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: nextQty } : i))
    ); // Update given item
  };

  // Handle closing table and printing bill
  const handleCloseAndPrint = async () => {
    if (!order || !order._id) {
      setError("Order data is missing. Please refresh the page.");
      return;
    }

    // Check user role before attempoting to create bill
    const userDataStr = localStorage.getItem('userData');
    if (userDataStr) {
      try {
        const userData = JSON.parse(userDataStr);
        const userRole = userData.role;
        const allowedRoles = ['Owner', 'Admin', 'Manager', 'Cashier'];

        if (!allowedRoles.includes(userRole)) {
          setError(`Access Denied: You don't have permission to create bills.\n\nRequired roles: ${allowedRoles.join(', ')}\nYour role: ${userRole || 'Unknown'}\n\nPlease contact your administrator to get the required permissions.`);
          return;
        }
      } catch (parseError) {
        console.warn("Failed to parse user data:", parseError);
      }
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Ensure order status is 'served' (required for billing)
      if (order.status !== 'served') {
        await updateOrderStatusApi({ orderId: order._id, status: 'served' }).unwrap();
      }

      // Step 2: Create bill
      const billResponse = await createBillApi({ orderId: order._id }).unwrap();
      if (!billResponse.success || !billResponse.data?._id) {
        throw new Error("Failed to create bill");
      }

      const billId = billResponse.data._id;
      const billData = billResponse.data;

      // Step 3: Process payment
      let paymentResponse = null;
      if (!billData.paid) {
        const generateUUID = () => {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
        };
        const paymentIdValue = generateUUID()
        paymentResponse = await processPaymentApi({
          billId,
          paymentId: paymentIdValue,
          paymentMethod: paymentMethod,
          transactionId: paymentMethod === 'cash' ? undefined : `TXN-${Date.now()}`,
          gatewayResponse: paymentMethod === 'cash' ? undefined : { status: 'success' }
        }).unwrap();

        if (!paymentResponse.success) {
          throw new Error("Failed to process payment");
        }
      }

      // Step 4: Update table status to 'available'
      let targetTableId = tableId;
      if (!targetTableId && tableNumber && allTablesData?.success) {
        const table = allTablesData.data.find(t => t.tableNumber === parseInt(tableNumber));
        if (table) {
          targetTableId = table._id;
        }
      }

      if (targetTableId) {
        try {
          await updateTableStatusApi({ tableId: targetTableId, status: 'available' }).unwrap();
        } catch (tableError) {
          console.warn("Failed to update table status:", tableError);
          // Don't fail the whole process if table update fails
        }
      }

      if (typeof window !== "undefined" && tableNumber) {
        try {
          const raw = localStorage.getItem("tableOrders");
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed && parsed[tableNumber]) {
              delete parsed[tableNumber];
              localStorage.setItem("tableOrders", JSON.stringify(parsed));
            }
          }
        } catch (storageError) {
          console.warn("Failed to clear stored table order context:", storageError);
        }
      }

      // Step 5: Print bill using frontend (skip backend printing for now)
      try {
        console.log('Printing bill using frontend method');

        // Use the payment data from the processPayment response if available
        const paymentData = paymentResponse?.data?.payment || paymentResponse?.data || null;
        printBill(billData, paymentData);
      } catch (printError) {
        console.error('Frontend printing failed:', printError);
        alert('Failed to print bill. Please try again.');
      }

      // Success
      setSuccess("Table closed successfully! Bill printed.");

      // Redirect to tables page after 2 seconds
      setTimeout(() => {
        navigate('/restaurant-tables');
      }, 2000);
    } catch (err) {
      console.error("Error closing table:", err);

      // Handle permission errors (403)
      if (err.status === 403 || err.message?.includes('Access denied') || err.message?.includes('Insufficient permissions')) {
        const userDataStr = localStorage.getItem('userData');
        let userRole = 'Unknown';
        try {
          if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            userRole = userData.role || 'Unknown';
          }
        } catch (parseErr) {
          console.error("Error parsing user data:", parseErr);
        }
        setError(`Access Denied: You don't have permission to create bills.\n\nRequired roles: Owner, Admin, Manager, or Cashier\nYour role: ${userRole}\n\nPlease contact your administrator to get the required permissions.`);
      }
      else {
        setError(err.data?.message || err.message || "Failed to close table and print bill. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Print bill function - Frontend only, no API calls
  const printBill = (billData, paymentData) => {
    try {
      console.log('=== BILL PRINT DEBUG ===');
      console.log('Bill Data exists:', !!billData);
      console.log('Payment Data exists:', !!paymentData);
      console.log('Component Order exists:', !!order);
      console.log('Component Items length:', items?.length || 0);

      // Check if popup is blocked
      const printWindow = window.open('', '_blank', 'width=800,height=600');

      if (!printWindow) {
        // Popup blocked - show alert and try alternative method
        alert('Popup blocked! Please allow popups for this site to print the bill.\n\nAlternatively, the bill data has been logged to the console.');
        console.log('Bill Data (fallback):', billData ? 'Present' : 'Missing');
        console.log('Payment Data (fallback):', paymentData ? 'Present' : 'Missing');
        return;
      }

      // Ensure we have valid bill data
      if (!billData) {
        console.error('Bill data is missing');
        printWindow.close();
        return;
      }

      // Get bill items from order (populated in billData) - prioritize bill data over component state
      const billItems = billData.orderId?.items || billData.items || [];
      console.log('Bill Items used for printing:', billItems);
      const billNumber = billData.billNumber || billData._id?.slice(-8) || 'N/A';
      const billDate = billData.createdAt ? new Date(billData.createdAt).toLocaleString() : new Date().toLocaleString();
      const tableNum = billData.orderId?.tableNumber || order?.tableNumber || tableNumber || 'N/A';
      const orderNum = billData.orderId?.orderNumber || order?.orderNumber || order?._id?.slice(-8) || 'N/A';
      const cashierName = billData.cashierId?.name || billData.cashierId || 'N/A';
      // const customerName = billData.customerId?.name || billData.customerId || 'Walk-in Customer';
      // const customerPhone = billData.customerId?.phone || '';

      const customerName = billData.customerId?.name || billData.orderId?.customerName || order?.customerName || 'Walk-in Customer';
      const customerPhone = billData.customerId?.phone || billData.orderId?.customerPhone || order?.customerPhone || '';


      const subtotal = billData.subtotal || calculations.subtotal || 0;
      const tax = billData.tax || calculations.tax || 0;
      const billDiscount = billData.discount || discount || 0;
      const serviceCharge = billData.serviceCharge || calculations.serviceCharge || 0;
      const total = billData.total || billData.totalAmount || calculations.totalPayable || 0;
      const paymentMethodName = paymentData?.paymentMethod || paymentMethod || 'Cash';
      const transactionId = paymentData?.gatewayTransactionId || paymentData?.transactionId || '';

      const billContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Bill - ${billNumber}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                max-width: 300px;
                margin: 20px auto;
                padding: 20px;
              }
              .header {
                text-align: center;
                border-bottom: 2px solid #000;
                padding-bottom: 10px;
                margin-bottom: 20px;
              }
              .bill-info {
                margin-bottom: 15px;
              }
              .bill-info div {
                display: flex;
                justify-content: space-between;
                margin: 5px 0;
              }
              .items {
                margin: 20px 0;
                border-top: 1px solid #ccc;
                border-bottom: 1px solid #ccc;
                padding: 10px 0;
              }
              .item {
                display: flex;
                justify-content: space-between;
                margin: 8px 0;
              }
              .total {
                font-weight: bold;
                font-size: 18px;
                margin-top: 15px;
                padding-top: 15px;
                border-top: 2px solid #000;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 12px;
                color: #666;
              }
              @media print {
                body { margin: 0; padding: 10px; }
                @page { margin: 0.5cm; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h2>RESTAURANT BILL</h2>
              <p>Bill #: ${billNumber}</p>
              <p>Date: ${billDate}</p>
            </div>
            
            <div class="bill-info">
              <div><span>Table:</span> <span>T${tableNum}</span></div>
              <div><span>Order #:</span> <span>${orderNum}</span></div>
              <div><span>Customer:</span> <span>${customerName}${customerPhone ? ` (${customerPhone})` : ''}</span></div>
              <div><span>Cashier:</span> <span>${cashierName}</span></div>
            </div>

            <div class="items">
              ${billItems.map(item => {
        const itemName = item.name || item.itemName || 'Item';
        const itemQty = item.quantity || item.qty || 1;
        const itemPrice = item.price || 0;
        const itemTotal = (itemPrice * itemQty).toFixed(2);
        return `
                  <div class="item">
                    <span>${itemName} x${itemQty}</span>
                    <span>₹${itemTotal}</span>
                  </div>
                `;
      }).join('')}
            </div>

            <div class="bill-info">
              <div><span>Subtotal:</span> <span>₹${subtotal.toFixed(2)}</span></div>
              ${billDiscount > 0 ? `<div><span>Discount:</span> <span>-₹${billDiscount.toFixed(2)}</span></div>` : ''}
              <div><span>CGST:</span> <span>₹${(tax / 2).toFixed(2)}</span></div>
              <div><span>SGST:</span> <span>₹${(tax / 2).toFixed(2)}</span></div>
              ${serviceCharge > 0 ? `<div><span>Service Charge:</span> <span>₹${serviceCharge.toFixed(2)}</span></div>` : ''}
              ${tipAmount > 0 ? `<div><span>Tip:</span> <span>₹${tipAmount.toFixed(2)}</span></div>` : ''}
            </div>

            <div class="total">
              <div style="display: flex; justify-content: space-between;">
                <span>TOTAL:</span>
                <span>₹${total.toFixed(2)}</span>
              </div>
            </div>

            <div class="bill-info">
              <div><span>Payment Method:</span> <span>${paymentMethodName.toUpperCase()}</span></div>
              ${transactionId ? `<div><span>Transaction ID:</span> <span>${transactionId}</span></div>` : ''}
            </div>

            <div class="footer">
              <p>Thank you for dining with us!</p>
              <p>Visit us again soon</p>
            </div>
          </body>
        </html>
      `;

      printWindow.document.write(billContent);
      printWindow.document.close();

      // Wait for content to load, then print
      setTimeout(() => {
        printWindow.focus();
        printWindow.print();
        // Close window after printing (optional - user can keep it open if needed)
        // setTimeout(() => printWindow.close(), 1000);
      }, 500);
    } catch (error) {
      console.error('Error printing bill:', error);
      alert('Failed to print bill. Please check the console for details.');
    }
  };

  // Handle save draft
  const handleSaveDraft = () => {
    // For now, just show a message
    alert("Draft saved! (This feature will be implemented soon)");
  };

  // Handle cancel
  const handleCancel = () => {
    navigate('/restaurant-tables');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <Header
          tableCode={tableInfo.tableCode}
          seats={tableInfo.seats}
          orderKots={tableInfo.orderKots}
          serverName={tableInfo.serverName}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Left two-thirds */}
          <div className="lg:col-span-2 space-y-6">
            <OrderItems items={items} onUpdateQty={updateQty} />
            <Offers onApplyDiscount={(value) => setDiscount(value)} />
            <QRPay amount={Math.round(calculations.totalPayable)} />
          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <BillSummary
              subtotal={calculations.subtotal}
              tax={calculations.tax}
              serviceCharge={calculations.serviceCharge}
              discount={discount}
              tip={tipAmount}
              total={calculations.totalPayable}
            />
            <TaxAndCharges
              taxRate={TAX_RATE}
              serviceRate={SERVICE_CHARGE_RATE}
              includeServiceCharge={includeServiceCharge}
              includeTax={includeTax}
              onToggleService={() => setIncludeServiceCharge((v) => !v)}
              onToggleTax={() => setIncludeTax((v) => !v)}
            />
            <PaymentMethods value={paymentMethod} onChange={setPaymentMethod} />
            {paymentMethod === "upi" && <UpiOptions />}
            <ReceiptOptions />
          </div>
        </div>

        <FooterBar
          total={calculations.totalPayable}
          onSaveDraft={handleSaveDraft}
          onCancel={handleCancel}
          onCloseAndPrint={handleCloseAndPrint}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CloseTable;
