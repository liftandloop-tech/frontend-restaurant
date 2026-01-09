import { apiSlice } from '../api/apiSlice';

export const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        exportPDF: builder.query({
            query: (params) => ({
                url: 'reports/export/pdf',
                params,
                responseHandler: (response) => response.blob(),
            }),
        }),
        getDashboardStats: builder.query({
            query: (params) => ({
                url: 'reports/dashboard-stats',
                params,
            }),
            providesTags: ['Report', 'DashboardStats'],
            keepUnusedDataFor: 0, // refetch immediately to ensure fresh data
        }),
        getScheduledReports: builder.query({
            query: () => 'reports/schedule',
            providesTags: ['Report'],
        }),
        createScheduledReport: builder.mutation({
            query: (data) => ({
                url: 'reports/schedule',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Report'],
        }),
        updateScheduledReport: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `reports/schedule/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Report'],
        }),
        deleteScheduledReport: builder.mutation({
            query: (id) => ({
                url: `reports/schedule/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Report'],
        }),
        getOrderReport: builder.query({
            query: (params) => ({
                url: 'reports/order',
                params,
            }),
            providesTags: ['Report'],
        }),
        getBillingReport: builder.query({
            query: (params) => ({
                url: 'reports/billing',
                params,
            }),
            providesTags: ['Report'],
        }),
        getStaffReport: builder.query({
            query: (params) => ({
                url: 'reports/staff',
                params,
            }),
            providesTags: ['Report'],
        }),
        getInventoryReport: builder.query({
            query: (params) => ({
                url: 'reports/inventory',
                params,
            }),
            providesTags: ['Report'],
        }),
        getMenuReport: builder.query({
            query: (params) => ({
                url: 'reports/menu',
                params,
            }),
            providesTags: ['Report'],
        }),
        getVendorReport: builder.query({
            query: (params) => ({
                url: 'reports/vendor',
                params,
            }),
            providesTags: ['Report'],
        }),
        getOfferReport: builder.query({
            query: (params) => ({
                url: 'reports/offer',
                params,
            }),
            providesTags: ['Report'],
        }),
        getPurchaseReport: builder.query({
            query: (params) => ({
                url: 'reports/purchase',
                params,
            }),
            providesTags: ['Report'],
        }),
        generateReport: builder.mutation({
            query: (params) => ({
                url: 'reports/generate',
                method: 'POST',
                body: params,
            }),
            invalidatesTags: ['ReportHistory'],
        }),
        getReportHistory: builder.query({
            query: (params) => ({
                url: 'reports/history',
                params,
            }),
            providesTags: ['ReportHistory'],
        }),
    }),
});

export const {
    useExportPDFQuery,
    useLazyExportPDFQuery,
    useGetDashboardStatsQuery,
    useGetScheduledReportsQuery,
    useCreateScheduledReportMutation,
    useUpdateScheduledReportMutation,
    useDeleteScheduledReportMutation,
    useGetOrderReportQuery,
    useGetBillingReportQuery,
    useGetStaffReportQuery,
    useGetInventoryReportQuery,
    useGetMenuReportQuery,
    useGetVendorReportQuery,
    useGetOfferReportQuery,
    useGetPurchaseReportQuery,
    useGenerateReportMutation,
    useGetReportHistoryQuery,
} = reportsApiSlice;
