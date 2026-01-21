import React from "react";
import PropTypes from "prop-types";

const Row = ({ label, value, strong }) => (
  <div className={`flex items-center justify-between ${strong ? "font-semibold" : "text-gray-700"}`}>
    <span className="text-sm">{label}</span>
    <span className="text-sm">₹{value.toFixed(0)}</span>
  </div>
);

Row.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  strong: PropTypes.bool,
};

const BillSummary = ({ subtotal, tax, serviceCharge, discount, tip, total }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Bill Summary</h2>
      <div className="space-y-2">
        <Row label="Subtotal" value={subtotal} />
        <Row label="CGST" value={tax / 2} />
        <Row label="SGST" value={tax / 2} />
        {/* <Row label="Service Charge" value={serviceCharge} /> */}
        {discount > 0 && <Row label="Discount" value={-discount} />}
        {tip > 0 && <Row label="Tip" value={tip} />}
        <div className="pt-3 border-t border-gray-200">
          <Row label="Total Payable" value={total} strong />
        </div>
      </div>
    </div>
  );
};

BillSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  tax: PropTypes.number.isRequired,
  serviceCharge: PropTypes.number.isRequired,
  discount: PropTypes.number.isRequired,
  tip: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default BillSummary;


