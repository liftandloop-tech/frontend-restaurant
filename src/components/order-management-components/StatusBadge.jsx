import React from "react";

const StatusBadge = ({ status, paymentStatus, source }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case "new":
        return {
          label: "New",
          className: "bg-blue-100 text-blue-800 border-blue-200",
          dotColor: "bg-blue-400",
        };
      case "pending":
        return {
          label: "Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
          dotColor: "bg-yellow-400",
        };
      case "confirmed":
        return {
          label: "Confirmed",
          className: "bg-blue-100 text-blue-800 border-blue-200",
          dotColor: "bg-blue-400",
        };
      case "preparing":
        return {
          label: "Preparing",
          className: "bg-orange-100 text-orange-800 border-orange-200",
          dotColor: "bg-orange-400",
        };
      case "ready":
        return {
          label: "Ready",
          className: "bg-green-100 text-green-800 border-green-200",
          dotColor: "bg-green-400",
        };
      case "served":
        return {
          label: "Served",
          className: "bg-purple-100 text-purple-800 border-purple-200",
          dotColor: "bg-purple-400",
        };
      case "completed":
        return {
          label: "Completed",
          className: "bg-gray-100 text-gray-800 border-gray-200",
          dotColor: "bg-gray-400",
        };
      case "cancelled":
        return {
          label: "Cancelled",
          className: "bg-red-100 text-red-800 border-red-200",
          dotColor: "bg-red-400",
        };
      default:
        return {
          label: status,
          className: "bg-gray-100 text-gray-800 border-gray-200",
          dotColor: "bg-gray-400",
        };
    }
  };

  const getSourceConfig = (source) => {
    switch (source) {
      case "online":
        return {
          label: "Online",
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };
      case "phone":
        return {
          label: "Phone",
          className: "bg-green-50 text-green-700 border-green-200",
        };
      case "dine-in":
        return {
          label: "Dine-in",
          className: "bg-purple-50 text-purple-700 border-purple-200",
        };
      case "takeaway":
        return {
          label: "Takeaway",
          className: "bg-orange-50 text-orange-700 border-orange-200",
        };
      default:
        return {
          label: source,
          className: "bg-gray-50 text-gray-700 border-gray-200",
        };
    }
  };

  const orderStatusConfig = getStatusConfig(status);
  const sourceConfig = getSourceConfig(source);

  return (
    <div className="flex flex-col space-y-1">
      {/* Source Badge */}
      {source && (
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${sourceConfig.className}`}
        >
          {sourceConfig.label}
        </span>
      )}

      {/* Order Status */}
      <span
        className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium border ${orderStatusConfig.className}`}
      >
        <span
          className={`w-2 h-2 rounded-full mr-1.5 ${orderStatusConfig.dotColor}`}
        ></span>
        {orderStatusConfig.label}
      </span>
    </div>
  );
};

export default StatusBadge;
