import React from "react";
import PropTypes from "prop-types";

const Offers = () => {
  // Offer/discount UI intentionally disabled per current requirements.
  // Keep the component to preserve layout and allow future enablement.
  // To re-enable, add inputs and call onApplyDiscount with the value.
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold text-gray-800">Offers & Discounts</h2>
      </div>
      <div className="text-sm text-gray-500">No offers applied.</div>
    </div>
  );
};

Offers.propTypes = {};

export default Offers;


