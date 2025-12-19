import React from "react";
import PropTypes from "prop-types";
import { Minus, Plus, Trash2 } from "lucide-react";

const OrderSummaryItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { name, price, quantity } = item;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-semibold text-gray-800 text-lg">{name}</h4>
          <p className="text-sm text-gray-500">${price.toFixed(2)}</p>
        </div>
        <button
          onClick={() => onRemoveItem(name)}
          className="text-gray-400 hover:text-red-500"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex justify-between items-center">
        {/* Quantity Adjuster */}
        <div className="flex items-center border border-gray-300 rounded-md">
          <button
            onClick={() => onUpdateQuantity(name, quantity - 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-md"
          >
            <Minus size={16} />
          </button>
          <span className="w-10 text-center font-semibold text-gray-800 border-l border-r border-gray-300">
            {quantity}
          </span>
          <button
            onClick={() => onUpdateQuantity(name, quantity + 1)}
            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-md"
          >
            <Plus size={16} />
          </button>
        </div>
        {/* Total Price */}
        <span className="font-bold text-xl text-gray-900">
          ${(price * quantity).toFixed(2)}
        </span>
      </div>

      <input
        type="text"
        placeholder="Special instructions..."
        className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

OrderSummaryItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default OrderSummaryItem;
