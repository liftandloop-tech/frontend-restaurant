import { apiSlice } from '../api/apiSlice';

export const customersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query({
            query: (params) => ({
                url: '/customers/get/customer',
                params,
            }),
            providesTags: ['Customer'],
        }),
        getCustomerById: builder.query({
            query: (customerId) => `/customers/get/customer/by/id/${customerId}`,
            providesTags: (result, error, arg) => [{ type: 'Customer', id: arg }],
        }),
        createCustomer: builder.mutation({
            query: (customerData) => ({
                url: '/customers/create/customer',
                method: 'POST',
                body: customerData,
            }),
            invalidatesTags: ['Customer'],
        }),
        updateCustomer: builder.mutation({
            query: ({ customerId, ...updateData }) => ({
                url: `/customers/update/customer/by/id/${customerId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (result, error, arg) => ['Customer', { type: 'Customer', id: arg.customerId }],
        }),
        deleteCustomer: builder.mutation({
            query: (customerId) => ({
                url: `/customers/delete/customer/by/id/${customerId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Customer'],
        }),
        getFeedbacks: builder.query({
            query: () => '/feedback/all',
            providesTags: ['Feedback'],
        }),
        submitFeedback: builder.mutation({
            query: (feedbackData) => ({
                url: '/feedback/submit',
                method: 'POST',
                body: feedbackData,
            }),
            invalidatesTags: ['Feedback'],
        }),
        activateRevenueCard: builder.mutation({
            query: ({ customerId, cardData }) => ({
                url: `/customers/activate-card/${customerId}`,
                method: 'POST',
                body: cardData,
            }),
            invalidatesTags: (result, error, arg) => ['Customer', { type: 'Customer', id: arg.customerId }],
        })
    }),
});

export const {
    useGetCustomersQuery,
    useGetCustomerByIdQuery,
    useCreateCustomerMutation,
    useUpdateCustomerMutation,
    useDeleteCustomerMutation,
    useGetFeedbacksQuery,
    useSubmitFeedbackMutation,
    useActivateRevenueCardMutation,
} = customersApiSlice;
