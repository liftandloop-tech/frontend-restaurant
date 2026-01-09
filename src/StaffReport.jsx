import React, { useState } from "react";
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { Header, Footer } from "./components/reports-dashboard-components";

const StaffReport = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [branch, setBranch] = useState('All Branches');

    const { data: reportResponse, isLoading } = useGetDashboardStatsQuery({
        reportType: 'staff',
        dateRange,
        branch
    });

    const reportData = reportResponse?.success ? reportResponse.data : null;
    const metrics = reportData?.metrics || {};
    const staff = reportData?.data || [];

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

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Staff Performance Report</h1>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <MetricCard title="Total Staff" value={metrics.totalStaff || 0} color="bg-blue-50 text-blue-700" icon={<UserGroupIcon />} />
                    <MetricCard title="Active Staff" value={metrics.activeStaff || 0} color="bg-green-50 text-green-700" icon={<UserCheckIcon />} />
                    <MetricCard title="Departments" value={metrics.departments || 0} color="bg-purple-50 text-purple-700" icon={<BriefcaseIcon />} />
                </div>

                {/* Staff Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Staff Details</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                                <tr>
                                    <th className="px-6 py-3">Name</th>
                                    <th className="px-6 py-3">Role</th>
                                    <th className="px-6 py-3">Contact</th>
                                    <th className="px-6 py-3">Email</th>
                                    <th className="px-6 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {staff.length > 0 ? staff.map((s, index) => (
                                    <tr key={s._id || index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-900">{s.fullName}</td>
                                        <td className="px-6 py-3 text-gray-600">{s.role}</td>
                                        <td className="px-6 py-3 text-gray-600">{s.phoneNumber}</td>
                                        <td className="px-6 py-3 text-gray-600">{s.email}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${s.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {s.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">No staff members found.</td>
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
const UserGroupIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);
const UserCheckIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);
const BriefcaseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
);

export default StaffReport;
