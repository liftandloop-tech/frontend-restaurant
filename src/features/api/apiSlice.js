import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
    prepareHeaders: (headers, { endpoint, arg }) => {
        const token = localStorage.getItem('authToken');
        
        // Don't attach authorization header if we're doing a refresh call
        // we check endpoint (for slice calls) and arg.url (for manual baseQuery calls)
        const url = typeof arg === 'string' ? arg : arg?.url;
        const isRefreshCall = endpoint === 'refreshToken' || (url && url.includes('refresh-token'));
        
        if (token && !isRefreshCall) {
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
            console.log("[Auth] Attempting token refresh via reauth...");
            try {
                const refreshResult = await baseQuery(
                    {
                        url: 'users/refresh-token',
                        method: 'POST',
                        body: { refreshToken },
                    },
                    api,
                    extraOptions
                );

                if (refreshResult.data && refreshResult.data.success) {
                    const newToken = refreshResult.data.data?.accessToken;
                    if (newToken) {
                        console.log("[Auth] Token refreshed successfully.");
                        localStorage.setItem('authToken', newToken);
                        // Retry original request
                        result = await baseQuery(args, api, extraOptions);
                    } else {
                        console.warn("[Auth] Refresh succeeded but no access token returned.");
                        handleLogout();
                    }
                } else {
                    console.error("[Auth] Refresh token expired or invalid.");
                    handleLogout();
                }
            } catch (error) {
                console.error("[Auth] Token refresh failed error:", error);
                handleLogout();
            }
        } else {
            console.warn("[Auth] No refresh token available, logging out.");
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
