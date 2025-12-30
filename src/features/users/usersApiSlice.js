import { apiSlice } from '../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateProfile: builder.mutation({
            query: (data) => ({
                url: 'users/user/profile',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: 'users/user/change-password',
                method: 'PATCH',
                body: data,
            }),
        }),
    }),
});

export const {
    useUpdateProfileMutation,
    useChangePasswordMutation,
} = usersApiSlice;
