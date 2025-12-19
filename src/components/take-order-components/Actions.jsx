import React from "react";
import { Send } from "lucide-react";

const Actions = ({
  onSendToKOT,
  onSaveDraft,
  onCancel,
  onApplyDiscount,
  loading = false,
  discount = null,
}) => {
  return (
    <div className="space-y-3">
      {/* Send to KOT Button */}
      <button
        type="button"
        onClick={onSendToKOT}
        disabled={loading}
        className="w-full bg-blue-600 text-white font-medium py-[10px] rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        <Send size={18} />
        <span>{loading ? "Sending..." : "Send to Kitchen (KOT)"}</span>
      </button>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onSaveDraft}
          className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Save Draft
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full bg-white border border-gray-300 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Discount Button */}
      <div className="text-center">
        <button
          type="button"
          onClick={onApplyDiscount}
          className={`text-[15px] font-medium hover:underline ${
            discount ? "text-green-600" : "text-blue-600"
          }`}
        >
          {discount
            ? `Discount: ${discount.type === "percentage" ? `${discount.value}%` : `₹${discount.value}`} (Click to change)`
            : "Apply Discount"}
        </button>
      </div>
    </div>
  );
};

export default Actions;
