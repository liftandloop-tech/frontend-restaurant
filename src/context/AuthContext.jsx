import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';
import { isAuthenticated as checkAuth, clearAuthData } from '../utils/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => checkAuth());
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLicenseVerified, setIsLicenseVerified] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            const authStatus = checkAuth();
            setIsAuthenticated(authStatus);

            if (authStatus) {
                try {
                    const userDataStr = localStorage.getItem('userData');
                    if (userDataStr) {
                        const userData = JSON.parse(userDataStr);
                        setUser(userData);
                        // Check license status from user data or fetch profile
                        // Assuming user data has license status or we fetch it
                        // fetch profile to be sure
                        try {
                            const res = await api.get('users/user/profile');
                            if (res.success && res.data) {
                                setUser(res.data);
                                // Check if restaurant has license
                                // The backend user profile might include restaurant details or we need to look closer
                                // Based on Profile.jsx, restaurant details are in res.data.restaurantId populated? 
                                // Or we fetch my-restaurant.

                                const restRes = await api.get('restaurants/my-restaurant');
                                if (restRes.success && restRes.data && restRes.data.licenseActivated) {
                                    setIsLicenseVerified(true);
                                } else {
                                    setIsLicenseVerified(false);
                                }
                            }
                        } catch (e) {
                            console.error("Failed to fetch profile/license status", e);
                        }
                    }
                } catch (error) {
                    console.error("Auth init error:", error);
                    clearAuthData();
                    setIsAuthenticated(false);
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('isAuthenticated', 'true');
        // Check license immediately after login
        // We assume the user data or a subsequent call determines this.
        // For now, let's assume false until verified or fetched.
        setIsLicenseVerified(false); // Will trigger check or redirection
        // Re-trigger the effect or manually check? 
        // Simplified:
        if (userData && userData.restaurantId) {
            // We'd typically fetch restaurant details here too
        }
        window.location.reload(); // Simple reload to refresh all states properly
    };

    const logout = () => {
        clearAuthData();
        setIsAuthenticated(false);
        setUser(null);
        setIsLicenseVerified(false);
        window.location.href = '/login';
    };

    const activateLicense = async (payload) => {
        try {
            const response = await api.post('license/verify', payload);
            if (response.success) {
                setIsLicenseVerified(true);
                return response;
            }
            throw new Error(response.message);
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isLoading,
            user,
            login,
            logout,
            activateLicense,
            isLicenseVerified
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
