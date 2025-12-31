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

const PopularAlerts = ({ summary }) => {
  const alerts = [];

  if (summary?.lowStockItems?.length > 0) {
    const item = summary.lowStockItems[0];
    alerts.push({
      bg: "bg-red-50",
      icon: <span className="text-red-500 text-[14px]">⚠️</span>,
      title: "Low Stock Alert",
      subtitle: `${item.name} is low (${item.currentStock} ${item.unit} left)`
    });
  }

  if (summary?.orderStatuses?.pending > 0) {
    alerts.push({
      bg: "bg-yellow-50",
      icon: <span className="text-yellow-600 text-[14px]">🕒</span>,
      title: "Pending Orders",
      subtitle: `${summary.orderStatuses.pending} orders are currently pending preparation.`
    });
  }

  if (summary?.orderStatuses?.ready > 0) {
    alerts.push({
      bg: "bg-green-50",
      icon: <span className="text-green-600 text-[14px]">✅</span>,
      title: "Orders Ready",
      subtitle: `${summary.orderStatuses.ready} orders are ready for serving.`
    });
  }

  // Fallback / default alerts if nothing active
  if (alerts.length < 3) {
    alerts.push({
      bg: "bg-blue-50",
      icon: <span className="text-blue-600 text-[14px]">📊</span>,
      title: "Today's Performance",
      subtitle: `Revenue: ₹${summary?.revenue || 0} from ${summary?.bills || 0} bills.`
    });
  }

  return (
    <div className="bg-transparent rounded-xl flex flex-col justify-center h-fit w-full">
      <div className="bg-white rounded-xl h-fit border-1 px-5 py-7 border-gray-300 w-full">
        <h2 className="text-[16px] font-semibold mb-4">Alerts & Reminders</h2>
        <div className="flex flex-col gap-3">
          {alerts.map((alert, index) => (
            <AlertRow
              key={index}
              bg={alert.bg}
              icon={alert.icon}
              title={alert.title}
              subtitle={alert.subtitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularAlerts;
