import React from "react";
import PropTypes from "prop-types";

/**
 * CustomerInfo: name, phone, email fields.
 */
const CustomerInfo = ({ form, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <LabeledInput
        label="Customer Name *"
        placeholder="Enter full name"
        value={form.name}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <LabeledInput
        label="Phone Number *"
        placeholder="+1 (555) 123-4567"
        value={form.phone}
        onChange={(e) => onChange("phone", e.target.value)}
      />
      <div className="md:col-span-2">
        <LabeledInput
          label="Email Address"
          placeholder="customer@example.com"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </div>
    </div>
  );
};

CustomerInfo.propTypes = {
  form: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomerInfo;

const LabeledInput = ({ label, ...rest }) => (
  <label className="block text-[12px]">
    <span className="block mb-1 text-gray-700">{label}</span>
    <input
      className="w-full h-9 px-3 rounded-md border border-gray-200 bg-white text-[13px] placeholder:text-gray-400"
      {...rest}
    />
  </label>
);

LabeledInput.propTypes = {
  label: PropTypes.string.isRequired,
};
