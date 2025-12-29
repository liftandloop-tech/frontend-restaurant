import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Header from "./components/change-order-components/Header";
import Menu from "./components/change-order-components/Menu";
import OrderSummary from "./components/change-order-components/OrderSummary";
import Footer from "./components/change-order-components/Footer";
import { getSubtotal, getTax, getServiceCharge, getTotal } from "./utils/calc";
import { useUpdateOrderMutation } from "./features/orders/ordersApiSlice";
import { useCreateKOTMutation } from "./features/kots/kotsApiSlice";

const mapOrderItems = (items) =>
  Array.isArray(items)
    ? items.map((item, index) => ({
      id: item._id || item.id || `item-${index}`,
      name: item.name,
      price: Number(item.price ?? 0),
      quantity: Number(item.quantity ?? item.qty ?? 0) || 1,
      category: item.category || "Menu",
    }))
    : [];

const ChangeOrder = ({
  show,
  onClose,
  order,
  table,
  initialItems = [],
  onOrderUpdated,
}) => {
  const [orderItems, setOrderItems] = useState(
    mapOrderItems(order?.items ?? initialItems)
  );
  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    serviceCharge: 0,
    total: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedStations] = useState(["kitchen"]);
  const [selectedWaiterId, setSelectedWaiterId] = useState(
    order?.waiterId?._id || order?.waiterId || ""
  );

  const [updateOrderApi] = useUpdateOrderMutation();
  const [createKOTApi] = useCreateKOTMutation();

  useEffect(() => {
    if (show) {
      setOrderItems(mapOrderItems(order?.items ?? initialItems));
      setError("");
      setSuccess("");
    }
  }, [order, show, initialItems]);

  useEffect(() => {
    const subtotal = getSubtotal(orderItems);
    const tax = getTax(subtotal);
    const serviceCharge = getServiceCharge(subtotal);
    const total = getTotal(subtotal, tax, serviceCharge);
    setTotals({ subtotal, tax, serviceCharge, total });
  }, [orderItems]);

  const orderMeta = useMemo(
    () => ({
      id: order?.id || order?._id || null,
      status: order?.status,
      notes: order?.notes,
    }),
    [order]
  );

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

  const handleSaveDraft = () => {
    setSuccess("Draft saved locally.");
  };

  const handleCancelChanges = () => {
    onClose();
  };

  const handleUpdateOrder = async () => {
    if (!orderMeta.id) {
      setError("Order id is missing. Please close and try again.");
      return;
    }
    if (orderItems.length === 0) {
      setError("Add at least one item before updating the order.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const payload = {
        orderId: orderMeta.id,
        items: orderItems.map((item) => ({
          name: item.name,
          qty: item.quantity,
          price: item.price,
          specialInstructions: item.specialInstructions || item.note || undefined,
        })),
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
      };

      if (orderMeta.notes) {
        payload.notes = orderMeta.notes;
      }

      await updateOrderApi(payload).unwrap();

      // Create KOTs for selected stations after order update
      try {
        const kotPromises = selectedStations.map((station) =>
          createKOTApi({ orderId: orderMeta.id, station }).unwrap()
        );
        await Promise.all(kotPromises);
        setSuccess(`Order updated and KOTs sent to: ${selectedStations.join(", ")}`);
      } catch (kotError) {
        console.error("Error creating KOTs:", kotError);
        // Still show success for order update, but warn about KOT
        setSuccess("Order updated successfully, but failed to send KOTs. Please try sending KOTs manually.");
      }

      onOrderUpdated?.();
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error("Failed to update order:", err);
      setError(err.data?.message || err.message || "Unable to update order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-white/20 backdrop-blur-lg bg-opacity-25 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col">
        <Header
          onClose={onClose}
          table={table}
          order={order}
          selectedWaiterId={selectedWaiterId}
          onWaiterChange={setSelectedWaiterId}
        />
        {(error || success) && (
          <div className="px-6 pt-2">
            {error && (
              <div className="mb-2 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-2 rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-700">
                {success}
              </div>
            )}
          </div>
        )}
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
            />
          </div>
        </main>
        <Footer
          orderItems={orderItems}
          onSaveDraft={handleSaveDraft}
          onCancelChanges={handleCancelChanges}
          onUpdateOrder={handleUpdateOrder}
          isUpdating={isSubmitting}
        />
      </div>
    </div>
  );
};

ChangeOrder.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.object,
  table: PropTypes.object,
  initialItems: PropTypes.array,
  onOrderUpdated: PropTypes.func,
};

ChangeOrder.defaultProps = {
  order: null,
  table: null,
  initialItems: [],
  onOrderUpdated: undefined,
};

export default ChangeOrder;
