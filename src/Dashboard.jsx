import React from "react";
import NetSales from "./components/dashboard-components/top-cards/NetSales";
import AvgOrderValue from "./components/dashboard-components/top-cards/AvgOrderValue";
import TableTurn from "./components/dashboard-components/top-cards/TableTurn";
import KOTPrepTime from "./components/dashboard-components/top-cards/KOTPrepTime";
import TableStatus from "./components/dashboard-components/table-status/TableStatus";
import RecentOrders from "./components/dashboard-components/recent-orders/RecentOrders";
import PopularAlerts from "./components/dashboard-components/popular-alerts/PopularAlerts";
import Header from "./Header";





const Dashboard = ({ onTakeOrder }) => {
  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-4 gap-6">
          <NetSales />
          <AvgOrderValue />
          <TableTurn />
          <KOTPrepTime />

        </div>{" "}
        {/* Top Cards */}
        <div className="flex items-center flex-col h-fit mt-[40px]">
          <TableStatus onTakeOrder={onTakeOrder} />
        </div>{" "}
        {/* Table Status */}


        {/* Recent order */}
        <div className="grid grid-cols-3 gap-6 h-[420px] mt-[40px]">
          <div className="col-span-2 h-full">
            <RecentOrders />
          </div>
          <div className="col-span-1 h-full">

          </div>
        </div>{" "}
        {/* Recent Orders &  */}
        <div className="flex items-center flex-col h-fit mt-[40px]">
          <PopularAlerts />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
