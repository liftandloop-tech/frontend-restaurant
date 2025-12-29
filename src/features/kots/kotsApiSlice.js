import { apiSlice } from '../api/apiSlice';

export const kotsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createKOT: builder.mutation({
            query: ({ orderId, station }) => ({
                url: 'kots/post/KOT/waiter',
                method: 'POST',
                body: { orderId, station },
            }),
            invalidatesTags: ['Order'],
        }),
        getKOTs: builder.query({
            query: (params) => ({
                url: 'kots/get/KOTs',
                params,
            }),
            providesTags: ['Order'],
        }),
        getKOTById: builder.query({
            query: (kotId) => `kots/get/KOT/by/${kotId}`,
        }),
        updateKOTStatus: builder.mutation({
            query: ({ kotId, status }) => ({
                url: `kots/update/KOT/${kotId}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: ['Order'],
        }),
        markKOTPrinted: builder.mutation({
            query: (kotId) => ({
                url: `kots/post/KOT/${kotId}/print`,
                method: 'POST',
            }),
        }),
    }),
});

export const {
    useCreateKOTMutation,
    useGetKOTsQuery,
    useGetKOTByIdQuery,
    useUpdateKOTStatusMutation,
    useMarkKOTPrintedMutation,
} = kotsApiSlice;
