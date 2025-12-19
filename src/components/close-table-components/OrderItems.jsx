import React from "react";
import PropTypes from "prop-types";

const Row = ({ item, onUpdateQty }) => {
  // Increase item quantity
  const inc = () => onUpdateQty(item.id, item.quantity + 1);
  // Decrease item quantity
  const dec = () => onUpdateQty(item.id, item.quantity - 1);
  return (
    <div className="grid grid-cols-12 gap-3 items-center py-3 border-b border-gray-200">
      <div className="col-span-6">
        <div className="text-gray-800 font-medium">{item.name}</div>
        {item.note && <div className="text-xs text-gray-500">{item.note}</div>}
      </div>
      <div className="col-span-2 text-sm text-gray-600">₹{item.price}</div>
      <div className="col-span-2 flex items-center gap-2">
        <button className="h-7 w-7 rounded border border-gray-300" onClick={dec}>-</button>
        <span className="w-6 text-center text-sm">{item.quantity}</span>
        <button className="h-7 w-7 rounded border border-gray-300" onClick={inc}>+</button>
      </div>
      <div className="col-span-2 text-right font-medium">₹{item.price * item.quantity}</div>
    </div>
  );
};

Row.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    note: PropTypes.string,
    quantity: PropTypes.number.isRequired, // CHANGED from qty to quantity
    price: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQty: PropTypes.func.isRequired,
};

const OrderItems = ({ items, onUpdateQty }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800">Order Items</h2>
        <button className="text-sm text-blue-600">+ Add Item</button>
      </div>
      <div className="grid grid-cols-12 text-xs text-gray-500 pb-2 border-b border-gray-200">
        <div className="col-span-6">Item</div>
        <div className="col-span-2">Unit Price</div>
        <div className="col-span-2">Quantity</div> {/* CHANGED label from Qty to Quantity for clarity */}
        <div className="col-span-2 text-right">Total</div>
      </div>
      {items.length === 0 ? (
        <div className="py-6 text-center text-gray-500 text-sm">No items</div>
      ) : (
        items.map((it) => (
          <Row key={it.id} item={it} onUpdateQty={onUpdateQty} />
        ))
      )}
      <div className="flex justify-end mt-3 text-sm text-gray-600">
        <button className="px-3 py-2 border border-gray-300 rounded-md">
          + Add Item
        </button>
      </div>
    </div>
  );
};

OrderItems.propTypes = {
  items: PropTypes.arrayOf(Row.propTypes.item).isRequired,
  onUpdateQty: PropTypes.func.isRequired,
};

export default OrderItems;
