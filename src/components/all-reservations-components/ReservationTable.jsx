import React from "react";

const ReservationTable = ({ reservations }) => {
  // Function to render status badge with appropriate styling
  const renderStatusBadge = (status) => {
    const badgeClasses = {
      "checked-in": "bg-green-100 text-green-800",
      upcoming: "bg-blue-100 text-blue-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${badgeClasses[status] || "bg-gray-100"
          }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // Function to render action buttons based on reservation status
  const renderActions = () => {
    return (
      <div className="flex space-x-2">
        <button className="p-1 text-blue-600 hover:text-blue-800">
          <span>✏️</span>
        </button>
        <button className="p-1 text-red-600 hover:text-red-800">
          <span>×</span>
        </button>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Table
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Party Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Staff
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">
                  {reservation.customer.name}
                </div>
                <div className="text-sm text-gray-500">
                  {reservation.customer.phone}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">
                  {reservation.date}
                </div>
                <div className="text-sm text-gray-500">
                  {reservation.dateInfo}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="font-medium text-gray-900">
                  {reservation.table}
                </div>
                <div className="text-sm text-gray-500">
                  Capacity: {reservation.capacity}
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {reservation.partySize} guests
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {reservation.staff}
              </td>
              <td className="px-6 py-4">
                {renderStatusBadge(reservation.status)}
              </td>
              <td className="px-6 py-4">{renderActions()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
