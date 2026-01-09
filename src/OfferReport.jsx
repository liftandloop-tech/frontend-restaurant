import React, { useState } from "react";
import { useGetDashboardStatsQuery } from "./features/reports/reportsApiSlice";
import { Header, Footer } from "./components/reports-dashboard-components";

const OfferReport = () => {
    const [dateRange, setDateRange] = useState('This Month');
    const [branch, setBranch] = useState('All Branches');

    const { data: reportResponse, isLoading } = useGetDashboardStatsQuery({
        reportType: 'offer',
        dateRange,
        branch
    });

    const reportData = reportResponse?.success ? reportResponse.data : null;
    const metrics = reportData?.metrics || {};
    const offers = reportData?.data || [];

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

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Offers & Campaigns Report</h1>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <MetricCard title="Active Campaigns" value={metrics.activeOffers || 0} color="bg-orange-50 text-orange-700" icon={<SpeakerphoneIcon />} />
                    <MetricCard title="Total Redemptions" value={metrics.totalRedemptions || 0} color="bg-green-50 text-green-700" icon={<TrendingUpIcon />} />
                </div>

                {/* Offers Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-900">Campaign Details</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 font-medium text-sm">
                                <tr>
                                    <th className="px-6 py-3">Offer Name</th>
                                    <th className="px-6 py-3">Discount</th>
                                    <th className="px-6 py-3">Valid From</th>
                                    <th className="px-6 py-3">Valid Until</th>
                                    <th className="px-6 py-3">Usage Limit</th>
                                    <th className="px-6 py-3">Applicable On</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {offers.length > 0 ? offers.map((offer, index) => (
                                    <tr key={offer._id || index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-3 font-medium text-gray-900">{offer.name}</td>
                                        <td className="px-6 py-3 text-green-600 font-medium">{offer.discountValue}{offer.discountType === 'percentage' ? '%' : ' Flat'} Off</td>
                                        <td className="px-6 py-3 text-gray-600">{new Date(offer.validFrom).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 text-gray-600">{new Date(offer.validUntil).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 text-gray-600">{offer.maxUsage || 'Unlimited'}</td>
                                        <td className="px-6 py-3 text-gray-600">{offer.applicableOn}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">No active offers found for this period.</td>
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
const SpeakerphoneIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" /></svg>
);
const TrendingUpIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
);

export default OfferReport;
