import { apiSlice } from '../api/apiSlice';

export const reservationsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReservations: builder.query({
            query: (filters = {}) => {
                const params = new URLSearchParams(filters).toString();
                return {
                    url: params ? `reservations/get/reservation?${params}` : 'reservations/get/reservation',
                };
            },
            providesTags: ['Reservation'],
        }),
        getReservationById: builder.query({
            query: (id) => `reservations/get/reservation/by/${id}`,
            providesTags: (result, error, id) => [{ type: 'Reservation', id }],
        }),
        createReservation: builder.mutation({
            query: (reservationData) => ({
                url: 'reservations/create/reservation',
                method: 'POST',
                body: reservationData,
            }),
            invalidatesTags: ['Reservation'],
        }),
        updateReservation: builder.mutation({
            query: ({ id, ...updateData }) => ({
                url: `reservations/update/reservation/by/${id}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Reservation', id }, 'Reservation'],
        }),
        updateReservationStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `reservations/update/reservation/by/${id}/status`,
                method: 'PATCH',
                body: { status },
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Reservation', id }, 'Reservation'],
        }),
        deleteReservation: builder.mutation({
            query: (id) => ({
                url: `reservations/delete/reservation/by/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Reservation'],
        }),
    }),
});

export const {
    useGetReservationsQuery,
    useGetReservationByIdQuery,
    useCreateReservationMutation,
    useUpdateReservationMutation,
    useUpdateReservationStatusMutation,
    useDeleteReservationMutation,
} = reservationsApiSlice;
