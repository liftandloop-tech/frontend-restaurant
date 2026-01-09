import React, { useState } from "react";
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { Header, Footer } from "./components/reports-dashboard-components";

const PurchaseReport = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [branch, setBranch] = useState('All Branches');

    // Use dedicated 'purchase' report type for detailed metrics
    const { data: reportResponse, isLoading } = useGetDashboardStatsQuery({
        reportType: 'purchase',
        dateRange,
        branch
    });

    const reportData = reportResponse?.success ? reportResponse.data : null;
    const metrics = reportData?.metrics || {};
    // For 'purchase' type, data is directly the array of orders
    const purchaseOrders = Array.isArray(reportData?.data) ? reportData.data : (reportData?.data?.purchaseOrders || []);

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

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Purchase Orders Report</h1>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <MetricCard title="Total Orders" value={metrics.totalOrders || 0} color="bg-blue-50 text-blue-700" icon={<ClipboardListIcon />} />
                    <MetricCard title="Total Amount" value={`₹${(metrics.totalAmount || 0).toLocaleString()}`} color="bg-green-50 text-green-700" icon={<MoneyIcon />} />
                    <MetricCard title="Pending Orders" value={metrics.pendingOrders || 0} color="bg-orange-50 text-orange-700" icon={<ClockIcon />} />
                </div>

                {/* Purchase Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Purchase Order History</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                                <tr>
                                    <th className="px-6 py-3">PO Number</th>
                                    <th className="px-6 py-3">Vendor</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Total Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {purchaseOrders.length > 0 ? purchaseOrders.map((po, index) => (
                                    <tr key={po._id || index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-900">PO-{po.orderNumber}</td>
                                        <td className="px-6 py-3 text-gray-600">{po.vendorName}</td>
                                        <td className="px-6 py-3 text-gray-600">{new Date(po.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 text-gray-900">₹{po.totalAmount}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${po.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                                po.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-gray-100 text-gray-600'
                                                }`}>
                                                {po.status}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No purchase orders found for this period.</td>
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
const ClipboardListIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
);
const MoneyIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ClockIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

export default PurchaseReport;
