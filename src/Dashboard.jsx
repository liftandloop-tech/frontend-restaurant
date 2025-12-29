import React from "react";
import NetSales from "./components/dashboard-components/top-cards/NetSales";
import AvgOrderValue from "./components/dashboard-components/top-cards/AvgOrderValue";
import TableTurn from "./components/dashboard-components/top-cards/TableTurn";
import KOTPrepTime from "./components/dashboard-components/top-cards/KOTPrepTime";
import TableStatus from "./components/dashboard-components/table-status/TableStatus";
import RecentOrders from "./components/dashboard-components/recent-orders/RecentOrders";
import PopularAlerts from "./components/dashboard-components/popular-alerts/PopularAlerts";
import { useGetTodaySummaryQuery, useGetRecentActivityQuery } from "./features/dashboard/dashboardApiSlice";

const Dashboard = ({ onTakeOrder }) => {
  const { data: summaryResponse, isLoading: summaryLoading } = useGetTodaySummaryQuery();
  const { data: recentResponse, isLoading: recentLoading } = useGetRecentActivityQuery();

  const summary = summaryResponse?.success ? summaryResponse.data : null;
  const recentOrders = recentResponse?.success ? recentResponse.data.orders : [];
  const loading = summaryLoading || recentLoading;

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-4 gap-6">
          <NetSales value={summary?.revenue || 0} trend={summary?.trends?.revenue || 0} />
          <AvgOrderValue value={summary?.averageOrderValue || 0} trend={summary?.trends?.averageOrderValue || 0} />
          <TableTurn value={summary?.avgDiningTime || 0} trend={summary?.trends?.avgDiningTime || 0} />
          <KOTPrepTime value={summary?.avgKotPrepTime || 0} trend={summary?.trends?.avgKotPrepTime || 0} />
        </div>

        <div className="flex items-center flex-col h-fit mt-[40px]">
          <TableStatus onTakeOrder={onTakeOrder} />
        </div>


        {/* Recent order */}
        <div className="grid grid-cols-3 gap-6 min-h-[420px] mt-[40px]">
          <div className="col-span-2 h-full">
            <RecentOrders orders={recentOrders} loading={loading} />
          </div>
          <div className="col-span-1 h-full">
            {/* Optional side panel */}
          </div>
        </div>{" "}
        <div className="flex items-center flex-col h-fit mt-[40px]">
          <PopularAlerts summary={summary} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
