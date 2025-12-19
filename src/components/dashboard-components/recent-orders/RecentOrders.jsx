import React from "react";

const statusBadge = (label, color) => (
  <span className={`text-[12px] px-2 py-[2px] rounded-full ${color}`}>
    {label}
  </span>
);

const RecentOrders = () => {
  const rows = [
    {
      id: "#ORD-1245",
      table: "T-02",
      items: "Butter Chicken, Naan x2",
      amount: "₹580",
      status: { label: "KOT", color: "bg-yellow-100 text-yellow-700" },
      time: "2:35 PM",
      action: "Print",
    },
    {
      id: "#ORD-1244",
      table: "T-05",
      items: "Biryani, Raita, Salad",
      amount: "₹750",
      status: { label: "Paid", color: "bg-green-100 text-green-700" },
      time: "2:20 PM",
      action: "Reopen",
    },
  ];

  return (
    <div className="bg-white rounded-xl flex flex-col h-full border-1 px-5 py-7 border-gray-300 w-[151%]">
      <div className="w-full flex flex-row justify-between items-center mb-5">
        <h2 className="text-[18px] font-semibold">Recent Orders</h2>
        <button className="text-[14px] text-[#2563EB]">See All</button>
      </div>
      <div className="w-full rounded-lg border border-gray-200 flex-1 flex flex-col min-h-0">
        <div className="grid grid-cols-12 bg-gray-50 text-[13px] text-gray-600 px-4 py-3 ">
          <div className="col-span-2">Order #</div>
          <div className="col-span-2">Table/Type</div>
          <div className="col-span-4">Items</div>
          <div className="col-span-1">Amount</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Time</div>
          <div className="col-span-1 text-right">Actions</div>
        </div>
        <div className="overflow-auto flex-1">
          {rows.map((r, idx) => (
            <div
              key={r.id}
              className={`grid grid-cols-12 items-center px-4 py-4 text-[14px] ${
                idx !== rows.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="col-span-2 font-medium text-gray-800">{r.id}</div>
              <div className="col-span-2 text-gray-700">{r.table}</div>
              <div className="col-span-4 text-gray-700">{r.items}</div>
              <div className="col-span-1 text-gray-800">{r.amount}</div>
              <div className="col-span-1">
                {statusBadge(r.status.label, r.status.color)}
              </div>
              <div className="col-span-1 text-gray-700">{r.time}</div>
              <div className="col-span-1 text-right">
                <button className="text-[#2563EB] text-[14px]">
                  {r.action}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
