import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        // Attempt to attach restaurantId from local storage for context recovery
        try {
            const userDataStr = localStorage.getItem('userData');
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                if (userData && userData.restaurantId) {
                    headers.set('x-restaurant-id', userData.restaurantId);
                }
            }
        } catch (error) {
            console.warn("Failed to parse user data for restaurant context", error);
        }

        return headers;
    },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/users/refresh-token',
                        method: 'POST',
                        body: { refreshToken },
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data && refreshResult.data.success) {
                    const newToken = refreshResult.data.data?.accessToken;
                    if (newToken) {
                        localStorage.setItem('authToken', newToken);
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        handleLogout();
                    }
                } else {
                    handleLogout();
                }
            } catch (error) {
                console.error("Token refresh failed:", error);
                handleLogout();
            }
        } else {
            handleLogout();
        }
    }
    return result;
};

const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    if (typeof window !== 'undefined') {
        window.location.href = '/login';
    }
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Menu', 'Order', 'Customer', 'Staff', 'Table', 'Reservation', 'Inventory', 'Report', 'License', 'Bill'],
    endpoints: () => ({}),
});
