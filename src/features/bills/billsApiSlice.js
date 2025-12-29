import { apiSlice } from '../api/apiSlice';

export const billsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBill: builder.mutation({
            query: ({ orderId }) => {
                // Generate unique idempotency key for each bill creation attempt
                const timestamp = Date.now();
                const random = Math.random().toString(36).substring(2, 15);
                const generateUUID = () => {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        const r = Math.random() * 16 | 0;
                        const v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                };
                const idempotencyKey = `bill-${orderId}-${timestamp}-${random}-${generateUUID()}`;

                return {
                    url: `bills/post/order/${orderId}`,
                    method: 'POST',
                    body: { idempotencyKey },
                };
            },
            invalidatesTags: ['Order', 'Bill'],
        }),
        processPayment: builder.mutation({
            query: ({ billId, ...paymentData }) => {
                const generateUUID = () => {
                    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                        const r = Math.random() * 16 | 0;
                        const v = c === 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                };
                const idempotencyKey = generateUUID();

                return {
                    url: `bills/post/${billId}/payment`,
                    method: 'POST',
                    body: { ...paymentData, idempotencyKey },
                };
            },
            invalidatesTags: ['Order', 'Bill'],
        }),
        getBills: builder.query({
            query: (params) => ({
                url: 'bills/get/bill',
                params,
            }),
            providesTags: ['Bill'],
        }),
        getBillById: builder.query({
            query: (billId) => `bills/get/bill/by/${billId}`,
            providesTags: (result, error, arg) => [{ type: 'Bill', id: arg }],
        }),
        processRefund: builder.mutation({
            query: ({ billId, refundAmount, reason }) => ({
                url: `bills/post/${billId}/refund`,
                method: 'POST',
                body: { refundAmount, reason },
            }),
            invalidatesTags: ['Bill'],
        }),
        printBill: builder.query({
            query: (billId) => `bills/get/${billId}/print`,
        }),
    }),
});

export const {
    useCreateBillMutation,
    useProcessPaymentMutation,
    useGetBillsQuery,
    useGetBillByIdQuery,
    useProcessRefundMutation,
    usePrintBillQuery,
    useLazyPrintBillQuery,
} = billsApiSlice;
