import React, { useState } from "react";
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { Header, Footer } from "./components/reports-dashboard-components";

const MenuReport = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [branch, setBranch] = useState('All Branches');

    const { data: reportResponse, isLoading } = useGetDashboardStatsQuery({
        reportType: 'menu',
        dateRange,
        branch
    });

    const reportData = reportResponse?.success ? reportResponse.data : null;
    const metrics = reportData?.metrics || {};
    const items = reportData?.data || [];

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Header
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    branch={branch}
                    setBranch={setBranch}
                />

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Menu Performance Report</h1>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <MetricCard title="Total Menu Items" value={metrics.totalItems || 0} color="bg-blue-50 text-blue-700" icon={<MenuIcon />} />
                    <MetricCard title="Active Items" value={metrics.activeItems || 0} color="bg-green-50 text-green-700" icon={<CheckIcon />} />
                    <MetricCard title="Total Categories" value={metrics.categories || 0} color="bg-purple-50 text-purple-700" icon={<TagIcon />} />
                </div>

                {/* Items Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Menu Items Details</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                                <tr>
                                    <th className="px-6 py-3">Item Name</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Type</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {items.length > 0 ? items.map((item, index) => (
                                    <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-3 text-gray-600">{item.categoryId?.name || 'Uncategorized'}</td>
                                        <td className="px-6 py-3 text-gray-900 font-medium">₹{item.price}</td>
                                        <td className="px-6 py-3 text-gray-600">
                                            <span className={`px-2 py-1 text-xs rounded-full ${item.foodType === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {item.foodType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${item.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {item.isAvailable ? 'Available' : 'Unavailable'}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No menu items found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, color, icon }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
            {icon}
        </div>
    </div>
);

// Icons
const MenuIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const CheckIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
);
const TagIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 012.75 7.75L3.3 2.7l.6-.6z" /></svg>
);

export default MenuReport;
