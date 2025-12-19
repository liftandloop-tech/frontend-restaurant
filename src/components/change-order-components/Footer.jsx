import React from "react";
import PropTypes from "prop-types";
import { Send } from "lucide-react";

const Footer = ({
  orderItems,
  onSaveDraft,
  onCancelChanges,
  onUpdateOrder,
  isUpdating,
}) => {
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <footer className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
      <div>
        <span className="text-sm text-gray-600">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
        <span className="mx-2 text-gray-300">•</span>
        <span className="text-sm text-gray-600">Editing existing order</span>
      </div>
      <div className="flex items-center gap-3">
        <button
          className="h-10 px-4 bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          onClick={onSaveDraft}
        >
          Save Draft
        </button>
        <button
          className="h-10 px-4 bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors"
          onClick={onCancelChanges}
        >
          Cancel Changes
        </button>
        <button
          className="h-10 px-5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-blue-300"
          onClick={onUpdateOrder}
          disabled={isUpdating}
        >
          <Send size={18} className={isUpdating ? "animate-spin" : ""} />
          <span>{isUpdating ? "Updating..." : "Update Order & Send KOT"}</span>
        </button>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSaveDraft: PropTypes.func.isRequired,
  onCancelChanges: PropTypes.func.isRequired,
  onUpdateOrder: PropTypes.func.isRequired,
  isUpdating: PropTypes.bool,
};

Footer.defaultProps = {
  isUpdating: false,
};

export default Footer;
