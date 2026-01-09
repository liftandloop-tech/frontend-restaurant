import React, { useState } from "react";
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { Header, Footer } from "./components/reports-dashboard-components";

const InventoryReport = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [branch, setBranch] = useState('All Branches');

    const { data: reportResponse, isLoading } = useGetDashboardStatsQuery({
        reportType: 'inventory',
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

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Inventory Report</h1>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <MetricCard title="Total Items" value={metrics.totalItems || 0} color="bg-blue-50 text-blue-700" icon={<PackageIcon />} />
                    <MetricCard title="Low Stock" value={metrics.lowStock || 0} color="bg-red-50 text-red-700" icon={<AlertIcon />} />
                    <MetricCard title="Total Value" value={`₹${(metrics.totalValue || 0).toLocaleString()}`} color="bg-green-50 text-green-700" icon={<MoneyIcon />} />
                    <MetricCard title="Out of Stock" value={metrics.outOfStock || 0} color="bg-orange-50 text-orange-700" icon={<BanIcon />} />
                </div>

                {/* Items Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Inventory Items</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                                <tr>
                                    <th className="px-6 py-3">Item Name</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Quantity</th>
                                    <th className="px-6 py-3">Unit</th>
                                    <th className="px-6 py-3">Price</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {items.length > 0 ? items.map((item, index) => (
                                    <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-900">{item.name}</td>
                                        <td className="px-6 py-3 text-gray-600">{item.category}</td>
                                        <td className={`px-6 py-3 font-medium ${item.quantity <= (item.minQuantity || 10) ? 'text-red-600' : 'text-gray-900'}`}>
                                            {item.quantity}
                                        </td>
                                        <td className="px-6 py-3 text-gray-600">{item.unit}</td>
                                        <td className="px-6 py-3 text-gray-900">₹{item.unitPrice}</td>
                                        <td className="px-6 py-3">
                                            <StatusBadge quantity={item.quantity} minQuantity={item.minQuantity || 10} />
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No inventory items found.</td>
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

const StatusBadge = ({ quantity, minQuantity }) => {
    if (quantity === 0) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-700">Out of Stock</span>;
    if (quantity <= minQuantity) return <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">Low Stock</span>;
    return <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">In Stock</span>;
};

// Icons
const PackageIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
);
const AlertIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
);
const MoneyIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const BanIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>
);

export default InventoryReport;
