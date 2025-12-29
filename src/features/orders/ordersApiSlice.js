import { apiSlice } from '../api/apiSlice';

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: 'orders/post/order',
                method: 'POST',
                body: orderData, // RTK Query will JSON stringify this automatically
            }),
            invalidatesTags: ['Order', 'Table'],
        }),
        getOrders: builder.query({
            query: (params) => ({
                url: 'orders/get/order',
                params,
            }),
            providesTags: ['Order'],
        }),
        getOrderById: builder.query({
            query: (orderId) => `orders/get/order/by/${orderId}`,
            providesTags: (result, error, arg) => [{ type: 'Order', id: arg }],
        }),
        updateOrder: builder.mutation({
            query: ({ orderId, ...updateData }) => ({
                url: `orders/update/order/by/${orderId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (result, error, arg) => ['Order', { type: 'Order', id: arg.orderId }],
        }),
        updateOrderStatus: builder.mutation({
            query: ({ orderId, status }) => ({
                url: `orders/patch/order/by/${orderId}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, arg) => ['Order', { type: 'Order', id: arg.orderId }],
        }),
        cancelOrder: builder.mutation({
            query: ({ orderId, reason }) => ({
                url: `orders/post/order/by/${orderId}/cancel`,
                method: 'POST',
                body: { reason },
            }),
            invalidatesTags: (result, error, arg) => ['Order', { type: 'Order', id: arg.orderId }],
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useLazyGetOrderByIdQuery,
    useUpdateOrderMutation,
    useUpdateOrderStatusMutation,
    useCancelOrderMutation,
} = ordersApiSlice;
