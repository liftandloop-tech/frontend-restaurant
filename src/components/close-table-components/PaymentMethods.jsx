import React from "react";
import PropTypes from "prop-types";

const Option = ({ id, label, icon, value, current, onChange }) => {
  const selected = current === value;
  return (
    <button
      id={id}
      className={`h-20 rounded-lg p-3 text-sm border flex flex-col items-center justify-center gap-2 ${
        selected ? "bg-blue-50 text-blue-700 border-blue-500" : "bg-white text-gray-700 border-gray-200"
      }`}
      onClick={() => onChange(value)}
      type="button"
    >
      <div className="text-xl">{icon}</div>
      <div className="font-medium">{label}</div>
    </button>
  );
};

Option.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  current: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PaymentMethods = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-3">Payment Method</h2>
      <div className="grid grid-cols-2 gap-3">
        <Option id="pm-cash" label="Cash" icon={"💵"} value="cash" current={value} onChange={onChange} />
        <Option id="pm-card" label="Card" icon={"💳"} value="card" current={value} onChange={onChange} />
        <Option id="pm-upi" label="UPI" icon={"📱"} value="upi" current={value} onChange={onChange} />
        <Option id="pm-split" label="Split" icon={"➗"} value="split" current={value} onChange={onChange} />
      </div>
    </div>
  );
};

PaymentMethods.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaymentMethods;


