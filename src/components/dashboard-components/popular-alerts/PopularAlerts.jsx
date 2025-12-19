import React from "react";
import PropTypes from "prop-types";



const AlertRow = ({ bg, icon, title, subtitle }) => (
  <div className={`rounded-lg px-4 py-3 ${bg}`}>
    <div className="flex items-center gap-3">
      {icon}
      <div className="flex flex-col">
        <span className="text-[13px] text-gray-800">{title}</span>
        <span className="text-[12px] text-gray-600">{subtitle}</span>
      </div>
    </div>
  </div>
);

AlertRow.propTypes = {
  bg: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

AlertRow.defaultProps = {
  bg: "bg-gray-50",
  icon: null,
};

const PopularAlerts = () => {
  return (
    <div className="bg-transparent rounded-xl flex flex-col justify-center h-fit w-[100%]">
     
     
        <div className="bg-white rounded-xl h-fit border-1 px-5 py-7 border-gray-300 w-[100%]">
          <h2 className="text-[16px] font-semibold mb-4">Alerts & Reminders</h2>
          <div className="flex flex-col gap-3">
            <AlertRow
              bg="bg-red-50"
              icon={<span className="text-red-500 text-[14px]">⚠️</span>}
              title="Low Stock Alert"
              subtitle="Tomatoes running low (5kg left)"
            />
            <AlertRow
              bg="bg-yellow-50"
              icon={<span className="text-yellow-600 text-[14px]">🕒</span>}
              title="Pending Payment"
              subtitle="Table 8 – ₹675 (15 min ago)"
            />
            <AlertRow
              bg="bg-blue-50"
              icon={<span className="text-blue-600 text-[14px]">📅</span>}
              title="Reservation"
              subtitle="Table 12 reserved for 8:00 PM"
            />
          </div>
        </div>
      </div>
    
  );
};

export default PopularAlerts;
