import { apiSlice } from '../api/apiSlice';

export const tablesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTables: builder.query({
            query: (filters = {}) => {
                // Remove undefined or null values to avoid sending "undefined" string in URL
                const cleanFilters = Object.fromEntries(
                    Object.entries(filters).filter(([_, v]) =>
                        v !== undefined &&
                        v !== null &&
                        v !== 'undefined' &&
                        v !== 'null' &&
                        v !== 'all' &&
                        v !== ''
                    )
                );
                const params = new URLSearchParams(cleanFilters).toString();
                return {
                    url: params ? `tables/get/table?${params}` : 'tables/get/table',
                };
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ _id }) => ({ type: 'Table', id: _id })),
                        { type: 'Table', id: 'LIST' },
                    ]
                    : [{ type: 'Table', id: 'LIST' }],
        }),
        getTableById: builder.query({
            query: (tableId) => `tables/get/table/by/${tableId}`,
            providesTags: (result, error, id) => [{ type: 'Table', id }],
        }),
        createTable: builder.mutation({
            query: (tableData) => ({
                url: 'tables/create/tables',
                method: 'POST',
                body: tableData,
            }),
            invalidatesTags: [{ type: 'Table', id: 'LIST' }],
        }),
        updateTable: builder.mutation({
            query: ({ tableId, ...updateData }) => ({
                url: `tables/update/table/by/${tableId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (result, error, { tableId }) => [{ type: 'Table', id: tableId }, { type: 'Table', id: 'LIST' }],
        }),
        updateTableStatus: builder.mutation({
            query: ({ tableId, status }) => ({
                url: `tables/update/table/status/by/${tableId}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { tableId }) => [{ type: 'Table', id: tableId }, { type: 'Table', id: 'LIST' }],
        }),
        transferTable: builder.mutation({
            query: (tableNumber) => ({
                url: `tables/transfer/table/${tableNumber}`,
                method: 'PATCH',
            }),
            invalidatesTags: [{ type: 'Table', id: 'LIST' }],
        }),
        completeCleaning: builder.mutation({
            query: (tableNumber) => ({
                url: `tables/complete/cleaning/${tableNumber}`,
                method: 'PATCH',
            }),
            invalidatesTags: [{ type: 'Table', id: 'LIST' }],
        }),
        deleteTable: builder.mutation({
            query: (tableId) => ({
                url: `tables/delete/table/by/${tableId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, id) => [{ type: 'Table', id }, { type: 'Table', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetTablesQuery,
    useGetTableByIdQuery,
    useCreateTableMutation,
    useUpdateTableMutation,
    useUpdateTableStatusMutation,
    useTransferTableMutation,
    useCompleteCleaningMutation,
    useDeleteTableMutation,
} = tablesApiSlice;
