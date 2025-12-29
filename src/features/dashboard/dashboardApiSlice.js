import { apiSlice } from '../api/apiSlice';

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTodaySummary: builder.query({
            query: () => 'dashboard/get/today',
            providesTags: ['Order', 'Bill'],
        }),
        getSalesStatistics: builder.query({
            query: (params) => ({
                url: 'dashboard/get/sales',
                params,
            }),
        }),
        getTopSellingItems: builder.query({
            query: () => 'dashboard/get/top-items',
        }),
        getStaffPerformance: builder.query({
            query: () => 'dashboard/get/staff',
        }),
        getPaymentMethodBreakdown: builder.query({
            query: () => 'dashboard/get/payments',
        }),
        getRecentActivity: builder.query({
            query: () => 'dashboard/get/recent',
        }),
        getDashboardOverview: builder.query({
            query: () => 'dashboard/get/overview',
            providesTags: ['Order', 'Bill', 'Table', 'Reservation'],
        }),
    }),
});

export const {
    useGetTodaySummaryQuery,
    useGetSalesStatisticsQuery,
    useGetTopSellingItemsQuery,
    useGetStaffPerformanceQuery,
    useGetPaymentMethodBreakdownQuery,
    useGetRecentActivityQuery,
    useGetDashboardOverviewQuery,
} = dashboardApiSlice;
