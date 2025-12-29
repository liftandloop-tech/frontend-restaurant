import { apiSlice } from '../api/apiSlice';

export const inventoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getInventoryItems: builder.query({
            query: (params) => ({
                url: 'inventory/get/item',
                params,
            }),
            providesTags: ['Inventory'],
        }),
        getInventoryItemById: builder.query({
            query: (itemId) => `inventory/get/item/by/${itemId}`,
            providesTags: (result, error, arg) => [{ type: 'Inventory', id: arg }],
        }),
        createInventoryItem: builder.mutation({
            query: (itemData) => ({
                url: 'inventory/create/item',
                method: 'POST',
                body: itemData,
            }),
            invalidatesTags: ['Inventory'],
        }),
        updateInventoryItem: builder.mutation({
            query: ({ itemId, ...updateData }) => ({
                url: `inventory/update/item/by/${itemId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (result, error, arg) => ['Inventory', { type: 'Inventory', id: arg.itemId }],
        }),
        deleteInventoryItem: builder.mutation({
            query: (itemId) => ({
                url: `inventory/delete/item/by/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Inventory'],
        }),
        getLowStockItems: builder.query({
            query: () => 'inventory/get/low-stock/items',
            providesTags: ['Inventory'],
        }),
        getVendors: builder.query({
            query: () => 'inventory/vendors/get',
            providesTags: ['Inventory'],
        }),
        createVendor: builder.mutation({
            query: (vendorData) => ({
                url: 'inventory/vendors/create',
                method: 'POST',
                body: vendorData,
            }),
            invalidatesTags: ['Inventory'],
        }),
        getPurchaseOrders: builder.query({
            query: () => 'inventory/purchase-orders/get',
            providesTags: ['Inventory'],
        }),
        createPurchaseOrder: builder.mutation({
            query: (poData) => ({
                url: 'inventory/purchase-orders/create',
                method: 'POST',
                body: poData,
            }),
            invalidatesTags: ['Inventory'],
        }),
        updatePurchaseOrderStatus: builder.mutation({
            query: ({ poId, status }) => ({
                url: `inventory/purchase-orders/update-status/${poId}`,
                method: 'PUT',
                body: { status },
            }),
            invalidatesTags: ['Inventory'],
        }),
        getWastage: builder.query({
            query: () => 'inventory/wastage/get',
            providesTags: ['Inventory'],
        }),
        createWastage: builder.mutation({
            query: (wastageData) => ({
                url: 'inventory/wastage/create',
                method: 'POST',
                body: wastageData,
            }),
            invalidatesTags: ['Inventory'],
        }),
    }),
});

export const {
    useGetInventoryItemsQuery,
    useGetInventoryItemByIdQuery,
    useCreateInventoryItemMutation,
    useUpdateInventoryItemMutation,
    useDeleteInventoryItemMutation,
    useGetLowStockItemsQuery,
    useGetVendorsQuery,
    useCreateVendorMutation,
    useGetPurchaseOrdersQuery,
    useCreatePurchaseOrderMutation,
    useUpdatePurchaseOrderStatusMutation,
    useGetWastageQuery,
    useCreateWastageMutation,
} = inventoryApiSlice;
