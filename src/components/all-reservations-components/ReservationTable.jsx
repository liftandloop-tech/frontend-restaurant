import React from "react";

const ReservationTable = ({ reservations, onDelete, onStatusChange }) => {
  // Function to render status badge with appropriate styling
  const renderStatusBadge = (status) => {
    const badgeClasses = {
      "checked-in": "bg-green-100 text-green-800",
      seated: "bg-blue-100 text-blue-800",
      confirmed: "bg-indigo-100 text-indigo-800",
      pending: "bg-amber-100 text-amber-800",
      upcoming: "bg-blue-100 text-blue-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
      "no-show": "bg-red-50 text-red-600",
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

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Table
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Party Size
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {reservations.length === 0 ? (
            <tr>
              <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                No reservations found matching your criteria.
              </td>
            </tr>
          ) : (
            reservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-gray-50 transition-colors">
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
                    {reservation.dateInfo}
                  </div>
                  <div className="text-sm text-gray-500">
                    {reservation.originalData.reservationTime}
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
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    {renderStatusBadge(reservation.status)}
                    <select
                      className="text-[10px] border border-gray-200 rounded px-1 py-0.5 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 mt-1"
                      value={reservation.status}
                      onChange={(e) => onStatusChange(reservation.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="checked-in">Checked-in</option>
                      <option value="seated">Seated</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="no-show">No-Show</option>
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => onDelete(reservation.id)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
