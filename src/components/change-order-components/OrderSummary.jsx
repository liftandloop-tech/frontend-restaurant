import React from "react";
import PropTypes from "prop-types";
import OrderSummaryItem from "./OrderSummaryItem";
import OrderNotes from "./OrderNotes";
import OrderCalculation from "./OrderCalculation";

const OrderSummary = ({
  orderItems,
  totals,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  return (
    <div className="flex h-fit flex-col overflow-auto scrollbar-hide bg-gray-50">
      <div className="flex-shrink-0 p-6">
        <h2 className="text-xl font-bold text-gray-800">Change Order</h2>
        <p className="text-sm text-gray-500">Table #12 • 4 Seats</p>
      </div>
      <div className="flex-grow px-6 space-y-4">
        {orderItems.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500 text-center">
              No items yet. Add from the left.
            </p>
          </div>
        ) : (
          orderItems.map((item) => (
            <OrderSummaryItem
              key={item.name}
              item={item}
              onUpdateQuantity={onUpdateQuantity}
              onRemoveItem={onRemoveItem}
            />
          ))
        )}
      </div>
      <div className="flex-shrink-0 p-6 space-y-6">
        <OrderNotes />
        <OrderCalculation totals={totals} />
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  totals: PropTypes.object.isRequired,
  onUpdateQuantity: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default OrderSummary;
