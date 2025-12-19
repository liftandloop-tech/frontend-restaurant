import React, { useState, useEffect } from "react";
import { getStaffStats } from "../../utils/staff";

/**
 * Key Metrics Cards component
 * Displays four main metrics: Total Staff, On Duty Now, Absent/On Leave, Monthly Payroll
 */
const KeyMetricsCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStaffStats();
        if (response.success) {
          setStats(response.data);
        }
      } catch (error) {
        console.error("Error fetching staff stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const metrics = [
    {
      id: "total-staff",
      icon: (
        <div className="flex -space-x-1">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
        </div>
      ),
      value: loading ? "..." : (stats?.totalStaff || "0"),
      label: "Total Staff",
      secondaryText: loading ? "" : `${stats?.activeStaff || 0} active today`,
      change: stats?.staffGrowth ? `${stats.staffGrowth > 0 ? '+' : ''}${stats.staffGrowth}%` : null,
      changeColor: stats?.staffGrowth >= 0 ? "text-green-600" : "text-red-600",
    },
    {
      id: "on-duty",
      icon: (
        <div className="relative">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
      ),
      value: loading ? "..." : (stats?.onDuty || "0"),
      label: "On Duty Now",
      secondaryText: "Live status",
      change: null,
      changeColor: "text-green-600",
    },
    {
      id: "absent-leave",
      icon: (
        <div className="flex -space-x-1">
          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-orange-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-orange-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
        </div>
      ),
      value: loading ? "..." : (stats?.absent || "0"),
      label: "Absent / On Leave",
      secondaryText: "vs yesterday",
      change: stats?.absentChange ? `${stats.absentChange > 0 ? '+' : ''}${stats.absentChange}` : null,
      changeColor: "text-orange-600",
    },
    {
      id: "payroll",
      icon: (
        <svg
          className="w-6 h-6 text-blue-600"
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
      value: loading ? "..." : `₹${(stats?.totalPayroll || 0).toLocaleString()}`,
      label: "Monthly Payroll",
      secondaryText: "vs last month",
      change: stats?.payrollChange ? `${stats.payrollChange}%` : null,
      changeColor: stats?.payrollChange <= 0 ? "text-green-600" : "text-red-600", // Less payroll is usually green/good? or bad? Assuming growth is normal color.
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-10">
      {metrics.map((metric) => (
        <div
          key={metric.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-gray-50 rounded-lg">{metric.icon}</div>
            {metric.change && (
              <span className={`text-sm font-medium ${metric.changeColor}`}>
                {metric.change}
              </span>
            )}
          </div>

          <div className="space-y-1">
            <div className="text-2xl font-bold text-gray-900">
              {metric.value}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {metric.label}
            </div>
            <div className="text-xs text-gray-500">{metric.secondaryText}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyMetricsCards;
