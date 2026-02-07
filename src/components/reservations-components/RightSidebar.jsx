import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateReservationStatusMutation, useDeleteReservationMutation } from "../../features/reservations/reservationsApiSlice";

/**
 * RightSidebar shows weekly summary and a compact list of reservations.
 */
const RightSidebar = ({ reservations = [], filterLabel = "This Week" }) => {
  const navigate = useNavigate();
  const [updateStatus] = useUpdateReservationStatusMutation();
  const [deleteReservation] = useDeleteReservationMutation();

  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    return {
      total: reservations.length,
      today: reservations.filter(r => r.reservationDate.split('T')[0] === todayStr).length,
      upcoming: reservations.filter(r => ["pending", "confirmed"].includes(r.status)).length,
      cancelled: reservations.filter(r => r.status === "cancelled").length
    };
  }, [reservations]);

  const summaryTitle = useMemo(() => {
    if (filterLabel === "This Week (Mon–Sun)") return "This Week Summary";
    return `${filterLabel} Summary`;
  }, [filterLabel]);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateStatus({ id, status }).unwrap();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this reservation?")) {
      try {
        await deleteReservation(id).unwrap();
      } catch (err) {
        console.error("Failed to delete reservation:", err);
      }
    }
  };

  return (
    <aside className="w-full lg:w-[320px] shrink-0">
      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
        <div className="font-medium mb-3">{summaryTitle}</div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <Stat label="Total Reservations" value={stats.total} />
          <Stat label="Today" value={stats.today} />
          <Stat label="Upcoming" value={stats.upcoming} />
          <Stat label="Cancelled" value={stats.cancelled} />
        </div>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-lg mt-4 shadow-sm">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="font-medium">Recent Reservations</div>
          <button className="text-[12px] text-blue-600">Sort by Time</button>
        </div>
        <div className="p-2 max-h-[500px] overflow-y-auto scrollbar-hide">
          {reservations.length === 0 ? (
            <div className="p-4 text-center text-gray-400 text-[12px]">
              No reservations found for {filterLabel.toLowerCase()}
            </div>
          ) : (
            reservations.slice(0, 10).map((r) => (
              <div key={r._id} className="p-3 rounded-md hover:bg-gray-50 border-b border-gray-50 last:border-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-[13px]">{r.customerName || 'Guest'}</div>
                  <Badge status={r.status || "reserved"} />
                </div>
                <div className="mt-1 text-[12px] text-gray-600">
                  {r.numberOfGuests} people
                </div>
                <div className="mt-1 text-[12px] text-gray-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="inline-flex items-center gap-1">
                    <Icon path="M4 10h16M4 6h16M4 14h16M4 18h16" /> Table {r.tableNumber}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Icon path="M12 8v4l3 3" /> {r.reservationTime}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  {r.status === "pending" && (
                    <button
                      onClick={() => handleStatusUpdate(r._id, "checked-in")}
                      className="h-7 px-2 rounded-md bg-green-100 text-green-700 text-[11px] hover:bg-green-200"
                    >
                      Check-in
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(r._id)}
                    className="h-7 px-2 rounded-md bg-red-100 text-red-700 text-[11px] hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-3 border-t border-gray-200">
          <button
            className="w-full h-9 rounded-md border border-gray-200 text-[12px] hover:bg-gray-50 font-medium"
            onClick={() => navigate("/reservations/all")}
          >
            View All Reservations
          </button>
        </div>
      </div>
    </aside>
  );
};

const Stat = ({ label, value }) => (
  <div className="bg-gray-50 rounded-md p-3">
    <div className="text-[20px] font-semibold text-gray-900">{value}</div>
    <div className="text-[12px] text-gray-600 leading-tight">{label}</div>
  </div>
);

const Badge = ({ status }) => {
  const map = {
    pending: "bg-amber-100 text-amber-700",
    "checked-in": "bg-green-100 text-green-700",
    seated: "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
    confirmed: "bg-indigo-100 text-indigo-700",
  };
  return (
    <span
      className={`h-5 px-1.5 inline-grid place-items-center text-[10px] rounded-md font-medium ${map[status] || "bg-gray-100 text-gray-700"
        }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Icon = ({ path }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-3.5 h-3.5"
  >
    <path d={path} />
  </svg>
);

export default RightSidebar;
