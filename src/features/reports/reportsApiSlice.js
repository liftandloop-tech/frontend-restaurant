import { apiSlice } from '../api/apiSlice';

export const reportsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        exportPDF: builder.query({
            query: (params) => ({
                url: 'report/export/pdf',
                params,
                responseHandler: (response) => response.blob(),
            }),
        }),
        getDashboardStats: builder.query({
            query: (params) => ({
                url: 'report/dashboard-stats',
                params,
            }),
            providesTags: ['Report'],
        }),
        getScheduledReports: builder.query({
            query: () => 'report/schedule',
            providesTags: ['Report'],
        }),
        createScheduledReport: builder.mutation({
            query: (data) => ({
                url: 'report/schedule',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Report'],
        }),
        updateScheduledReport: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `report/schedule/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Report'],
        }),
        deleteScheduledReport: builder.mutation({
            query: (id) => ({
                url: `report/schedule/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Report'],
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
} = reportsApiSlice;
