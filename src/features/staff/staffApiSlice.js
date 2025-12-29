import { apiSlice } from '../api/apiSlice';

export const staffApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        loginStaff: builder.mutation({
            query: (credentials) => ({
                url: 'staff/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        getStaffProfile: builder.query({
            query: () => 'staff/profile',
            providesTags: ['StaffProfile'],
        }),
        updateStaffProfile: builder.mutation({
            query: (profileData) => ({
                url: 'staff/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['StaffProfile'],
        }),
        changeStaffPassword: builder.mutation({
            query: (passwords) => ({
                url: 'staff/change-password',
                method: 'PATCH',
                body: passwords,
            }),
        }),
        registerStaff: builder.mutation({
            query: (staffData) => ({
                url: 'staff/register',
                method: 'POST',
                body: staffData,
            }),
            invalidatesTags: ['Staff'],
        }),
        getAllStaff: builder.query({
            query: (params) => ({
                url: 'staff',
                params, // Automatically serialized by RTK Query
            }),
            providesTags: ['Staff'],
        }),
        getStaffById: builder.query({
            query: (staffId) => `staff/${staffId}`,
            providesTags: (result, error, id) => [{ type: 'Staff', id }],
        }),
        updateStaff: builder.mutation({
            query: ({ staffId, ...updateData }) => ({
                url: `staff/${staffId}`,
                method: 'PUT',
                body: updateData,
            }),
            invalidatesTags: (result, error, { staffId }) => ['Staff', { type: 'Staff', id: staffId }],
        }),
        deleteStaff: builder.mutation({
            query: (staffId) => ({
                url: `staff/${staffId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Staff'],
        }),
        permanentlyDeleteStaff: builder.mutation({
            query: (staffId) => ({
                url: `staff/${staffId}/permanent`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Staff'],
        }),
        resetStaffPassword: builder.mutation({
            query: ({ staffId, newPassword }) => ({
                url: `staff/${staffId}/reset-password`,
                method: 'PATCH',
                body: { newPassword },
            }),
        }),
        getStaffStats: builder.query({
            query: () => 'staff/stats',
            providesTags: ['Staff'],
        }),
        getActiveStaffByRole: builder.query({
            query: (role) => `staff/active/${role}`,
            providesTags: ['Staff'],
        }),
        getActiveWaiters: builder.query({
            query: () => `staff/active/Waiter`,
            providesTags: ['Staff'],
        }),
    }),
});

export const {
    useLoginStaffMutation,
    useGetStaffProfileQuery,
    useUpdateStaffProfileMutation,
    useChangeStaffPasswordMutation,
    useRegisterStaffMutation,
    useGetAllStaffQuery,
    useGetStaffByIdQuery,
    useUpdateStaffMutation,
    useDeleteStaffMutation,
    usePermanentlyDeleteStaffMutation,
    useResetStaffPasswordMutation,
    useGetStaffStatsQuery,
    useGetActiveStaffByRoleQuery,
    useGetActiveWaitersQuery,
} = staffApiSlice;
