import React from "react";
import PropTypes from "prop-types";

const FooterBar = ({ total, onSaveDraft, onCancel, onCloseAndPrint, loading = false }) => {
  return (
    <>
      <div className="mt-10 mb-15 bg-white rounded-xl border border-gray-200 p-4 grid grid-cols-4 text-center">
        <div>
          <div className="text-lg font-semibold">9</div>
          <div className="text-xs text-gray-500">Total Orders</div>
        </div>
        <div>
          <div className="text-lg font-semibold">₹{Math.round(total)}</div>
          <div className="text-xs text-gray-500">Total Bill Value</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-green-600">₹200</div>
          <div className="text-xs text-gray-500">Tip Amount</div>
        </div>
        <div>
          <div className="text-lg font-semibold text-blue-600">Cash</div>
          <div className="text-xs text-gray-500">Payment Method</div>
        </div>
      </div>
      <div className="mt-3 bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">Total to Pay</div>
        <div className="flex items-center gap-3">
          <div className="text-lg font-semibold text-gray-800">
            ₹{Math.round(total)}
          </div>
          <button
            className="h-10 px-4 bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-md"
            onClick={onSaveDraft}
          >
            Save as Draft
          </button>
          <button
            className="h-10 px-4 bg-white border border-gray-300 text-gray-800 text-sm font-medium rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="h-10 px-5 bg-blue-600 text-white text-sm font-medium rounded-md disabled:bg-blue-400 disabled:cursor-not-allowed"
            onClick={onCloseAndPrint}
            disabled={loading}
          >
            {loading ? "Processing..." : "Close & Print Bill"}
          </button>
        </div>
      </div>
    </>
  );
};

FooterBar.propTypes = {
  total: PropTypes.number.isRequired,
  onSaveDraft: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onCloseAndPrint: PropTypes.func.isRequired,
};

export default FooterBar;
