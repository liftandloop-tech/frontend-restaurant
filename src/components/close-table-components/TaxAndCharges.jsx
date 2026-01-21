import React from "react";
import PropTypes from "prop-types";

const TaxAndCharges = ({
  taxRate,
  serviceRate,
  includeServiceCharge,
  includeTax,
  onToggleService,
  onToggleTax,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h2 className="text-base font-semibold text-gray-800 mb-3">
        Tax & Charges
      </h2>
      <div className="space-y-3 text-sm text-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={includeTax}
                onChange={onToggleTax}
              />
              <div
                className={`w-10 h-6 rounded-full ${includeTax ? "bg-blue-500" : "bg-gray-300"
                  }`}
              ></div>
            </label>
            <span>CGST</span>
          </div>
          <span className="font-medium text-gray-800">
            {(taxRate * 100 / 2).toFixed(1)}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="ml-[52px]">SGST</span>
          <span className="font-medium text-gray-800">
            {(taxRate * 100 / 2).toFixed(1)}%
          </span>
        </div>
        {/* <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only"
                checked={includeServiceCharge}
                onChange={onToggleService}
              />
              <div
                className={`w-10 h-6 rounded-full ${includeServiceCharge ? "bg-blue-500" : "bg-gray-300"
                  }`}
              ></div>
            </label>
            <span>Service Charge</span>
          </div>
          <span className="font-medium text-gray-800">
            {(serviceRate * 100).toFixed(0)}%
          </span>
        </div> */}
      </div>
    </div>
  );
};

TaxAndCharges.propTypes = {
  taxRate: PropTypes.number.isRequired,
  serviceRate: PropTypes.number.isRequired,
  includeServiceCharge: PropTypes.bool.isRequired,
  includeTax: PropTypes.bool.isRequired,
  onToggleService: PropTypes.func.isRequired,
  onToggleTax: PropTypes.func.isRequired,
};

export default TaxAndCharges;
