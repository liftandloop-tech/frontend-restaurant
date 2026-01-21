import React, { useState, useEffect } from "react";
import { getStaffStats } from "../../utils/staff";

/**
 * KeyMetricsCards component displays 4 KPI cards with payroll statistics
 * Shows total staff paid, total payroll expense, pending payments, and average salary
 */
const KeyMetricsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStaffStats();
        // Check both direct response and {success, data} pattern
        if (response.success) {
          setStats(response.data);
        } else if (response.totalStaff !== undefined) {
          setStats(response);
        }
      } catch (error) {
        console.error("Error fetching staff stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalStaff = stats?.totalStaff || 0;
  const activeStaff = stats?.activeStaff || 0;
  const totalPayroll = stats?.totalPayroll || 0;
  const avgSalary = activeStaff > 0 ? Math.round(totalPayroll / activeStaff) : 0;

  const metrics = [
    {
      id: 1,
      title: "Active Staff",
      value: loading ? "..." : `${activeStaff} / ${totalStaff}`,
      badge: totalStaff > 0 ? `${Math.round((activeStaff / totalStaff) * 100)}%` : "0%",
      badgeColor: "bg-green-100 text-green-800",
      icon: (
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      bgColor: "bg-blue-50",
    },
    {
      id: 2,
      title: "Total Payroll Expense",
      value: loading ? "..." : `₹${totalPayroll.toLocaleString()}`,
      badge: "Monthly",
      badgeColor: "bg-green-100 text-green-800",
      icon: (
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
          />
        </svg>
      ),
      bgColor: "bg-green-50",
    },
    {
      id: 3,
      title: "Pending Payments",
      value: "₹0",
      badge: "0 pending",
      badgeColor: "bg-gray-100 text-gray-800",
      icon: (
        <svg
          className="w-8 h-8 text-orange-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-orange-50",
    },
    {
      id: 4,
      title: "Average Salary",
      value: loading ? "..." : `₹${avgSalary.toLocaleString()}`,
      badge: "Avg",
      badgeColor: "bg-blue-100 text-blue-800",
      icon: (
        <svg
          className="w-8 h-8 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            {/* Icon */}
            <div className={`p-3 rounded-lg ${metric.bgColor}`}>
              {metric.icon}
            </div>

            {/* Badge */}
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${metric.badgeColor}`}
            >
              {metric.badge}
            </span>
          </div>

          {/* Value */}
          <div className="mt-4">
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyMetricsCards;
