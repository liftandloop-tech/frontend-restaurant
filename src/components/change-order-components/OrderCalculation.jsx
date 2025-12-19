import React, { useState } from "react";
import PropTypes from "prop-types";

const OrderCalculation = ({ totals }) => {
  const [serviceChargeEnabled, setServiceChargeEnabled] = useState(true);
  const { subtotal, tax, serviceCharge } = totals;
  // Total reflects toggle-able service charge. This mirrors display amounts to avoid drift.
  const total = subtotal + tax + (serviceChargeEnabled ? serviceCharge : 0);

  return (
    <div className="border-t border-gray-200 pt-4 space-y-2">
      <div className="flex justify-between text-sm text-gray-600">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600">
        <span>Tax (8.5%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 items-center">
        <div>
          <span>Service Charge</span>
          <span className="text-xs ml-1">(15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <label
            htmlFor="change-service-charge-toggle"
            className="flex items-center cursor-pointer"
          >
            <div className="relative">
              <input
                type="checkbox"
                id="change-service-charge-toggle"
                className="sr-only"
                checked={serviceChargeEnabled}
                onChange={() => setServiceChargeEnabled(!serviceChargeEnabled)}
              />
              <div
                className={`block w-10 h-6 rounded-full ${
                  serviceChargeEnabled ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                  serviceChargeEnabled ? "transform translate-x-full" : ""
                }`}
              ></div>
            </div>
          </label>
          <span>${serviceCharge.toFixed(2)}</span>
        </div>
      </div>
      <div className="flex justify-between font-bold text-lg text-gray-800 pt-7 border-t border-gray-200 mt-1">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

OrderCalculation.propTypes = {
  totals: PropTypes.shape({
    subtotal: PropTypes.number.isRequired,
    tax: PropTypes.number.isRequired,
    serviceCharge: PropTypes.number.isRequired,
  }).isRequired,
};

export default OrderCalculation;
