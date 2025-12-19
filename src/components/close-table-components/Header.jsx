import React from "react";
import PropTypes from "prop-types";

const Header = ({ tableCode, seats, orderKots, serverName }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            Close Table — {tableCode}
          </h1>
          <p className="text-sm text-gray-500">
            Review order, apply offers, and complete billing.
          </p>
        </div>
        <div className="text-sm text-gray-600">
          <div className="grid grid-cols-4 gap-x-10 gap-y-1">
            <div>
              <div className="text-gray-500">Table No.</div>
              <div className="font-medium">{tableCode.replace(/^T/, "")}</div>
            </div>
            <div>
              <div className="text-gray-500">Assigned Staff</div>
              <div className="font-medium">{serverName}</div>
            </div>
            <div>
              <div className="text-gray-500">Zone</div>
              <div className="font-medium">Indoor</div>
            </div>
            <div>
              <div className="text-gray-500">Order ID</div>
              <div className="font-medium">#ORD-2024-0156</div>
            </div>
            <div>
              <div className="text-gray-500">Guests</div>
              <div className="font-medium">{seats} Pax</div>
            </div>
            <div>
              <div className="text-gray-500">Time</div>
              <div className="font-medium">2:45 PM</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  tableCode: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired,
  orderKots: PropTypes.number.isRequired,
  serverName: PropTypes.string.isRequired,
};

export default Header;
