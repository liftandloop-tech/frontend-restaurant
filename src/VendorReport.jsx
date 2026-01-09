import React, { useState } from "react";
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { Header, Footer } from "./components/reports-dashboard-components";

const VendorReport = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [branch, setBranch] = useState('All Branches');

    const { data: reportResponse, isLoading } = useGetDashboardStatsQuery({
        reportType: 'vendor',
        dateRange,
        branch
    });

    const reportData = reportResponse?.success ? reportResponse.data : null;
    const metrics = reportData?.metrics || {};
    const vendors = reportData?.data?.vendors || [];

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

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Vendor Performance Report</h1>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <MetricCard title="Total Vendors" value={metrics.totalVendors || 0} color="bg-orange-50 text-orange-700" icon={<TruckIcon />} />
                    <MetricCard title="Active Vendors" value={metrics.activeVendors || 0} color="bg-green-50 text-green-700" icon={<CheckCircleIcon />} />
                    <MetricCard title="Total Purchase Orders" value={metrics.totalPurchaseOrders || 0} color="bg-blue-50 text-blue-700" icon={<ClipboardListIcon />} />
                </div>

                {/* Vendors Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Vendor Directory</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                                <tr>
                                    <th className="px-6 py-3">Vendor Name</th>
                                    <th className="px-6 py-3">Contact Person</th>
                                    <th className="px-6 py-3">Phone</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {vendors.length > 0 ? vendors.map((v, index) => (
                                    <tr key={v._id || index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-900">{v.name}</td>
                                        <td className="px-6 py-3 text-gray-600">{v.contactPerson}</td>
                                        <td className="px-6 py-3 text-gray-600">{v.phone}</td>
                                        <td className="px-6 py-3 text-gray-600">{v.email}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${v.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                                                {v.status || 'Unknown'}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No vendors found.</td>
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
const TruckIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
);
const CheckCircleIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const ClipboardListIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
);

export default VendorReport;
