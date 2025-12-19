import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * RightSidebar shows weekly summary and a compact list of reservations.
 */
const RightSidebar = () => {
  const navigate = useNavigate();
  const reservations = [
    {
      id: "r1",
      name: "John Smith",
      people: 2,
      table: "Table 1",
      time: "Mon, Jan 15 · 7:00 PM",
      status: "reserved",
    },
    {
      id: "r2",
      name: "Sarah Johnson",
      people: 2,
      table: "Table 1",
      time: "Wed, Jan 17 · 6:30 PM",
      status: "checked-in",
    },
    {
      id: "r3",
      name: "Mike Davis",
      people: 2,
      table: "Table 2",
      time: "Fri, Jan 19 · 8:00 PM",
      status: "reserved",
    },
  ];

  return (
    <aside className="w-full lg:w-[320px] shrink-0">
      {/* Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="font-medium mb-3">This Week Summary</div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <Stat label="Total Reservations" value={24} />
          <Stat label="Today" value={8} />
          <Stat label="Upcoming" value={16} />
          <Stat label="Cancelled" value={2} />
        </div>
      </div>

      {/* List */}
      <div className="bg-white border border-gray-200 rounded-lg mt-4">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="font-medium">Week Reservations</div>
          <button className="text-[12px] text-blue-600">Sort by Time</button>
        </div>
        <div className="p-2">
          {reservations.map((r) => (
            <div key={r.id} className="p-3 rounded-md hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="font-medium text-[13px]">{r.name}</div>
                <Badge status={r.status} />
              </div>
              <div className="mt-1 text-[12px] text-gray-600">
                {r.people} people
              </div>
              <div className="mt-1 text-[12px] text-gray-600 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <Icon path="M4 10h16M4 6h16M4 14h16M4 18h16" /> {r.table}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Icon path="M12 8v4l3 3" /> {r.time}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-6">
                <button className="h-7 px-2 rounded-md bg-green-100 text-green-700 text-[12px]">
                  Check-in
                </button>
                <button className="h-7 px-2 rounded-md border border-gray-200 text-[12px]">
                  Edit
                </button>
                <button className="h-7 px-2 rounded-md bg-red-100 text-red-700 text-[12px]">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-gray-200">
          <button
            className="w-full h-9 rounded-md border border-gray-200 text-[12px] hover:bg-gray-50"
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
    <div className="text-[12px] text-gray-600">{label}</div>
  </div>
);

const Badge = ({ status }) => {
  const map = {
    reserved: "bg-amber-100 text-amber-700",
    "checked-in": "bg-blue-100 text-blue-700",
    cancelled: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`h-6 px-2 inline-grid place-items-center text-[11px] rounded-md ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
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
    className="w-4 h-4"
  >
    <path d={path} />
  </svg>
);

export default RightSidebar;
