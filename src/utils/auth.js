/**
 * Authentication Helper Functions
 * 
 * Simple functions to handle login, register, and logout
 */

import api from './api.js';

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response from backend
 */
export const login = async (email, password) => {
  try {
    // Send login request to backend (user login endpoint)
    const response = await api.post('users/user/login', {
      email: email,
      password: password,
    });

    // If login successful, save tokens
    if (response.success && response.data?.accessToken) {
      console.log('Login successful, storing tokens:', {
        hasAccessToken: !!response.data.accessToken,
        hasRefreshToken: !!response.data.refreshToken,
        hasUser: !!response.data.user
      });

      localStorage.setItem('authToken', response.data.accessToken);
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
      if (response.data.user) {
        localStorage.setItem('userData', JSON.stringify(response.data.user));
      }

      console.log('Tokens stored in localStorage:', {
        authToken: !!localStorage.getItem('authToken'),
        refreshToken: !!localStorage.getItem('refreshToken'),
        userData: !!localStorage.getItem('userData')
      });
    }

    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Register new user
 * @param {object} userData - User data (name, email, restaurantName, password)
 * @returns {Promise} Response from backend
 */
export const register = async (userData) => {
  try {
    // Send register request to backend
    const response = await api.post('users/user/register', {
      name: userData.name,
      email: userData.email,
      restaurantName: userData.restaurantName,
      password: userData.password,
    });

    // Don't store tokens on registration - user must login explicitly
    // Registration just creates the account, authentication happens on login

    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Refresh access token using refresh token
 * @returns {Promise} Response from backend with new access token
 */
export const refreshToken = async () => {
  try {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    
    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }

    // Use a direct fetch to avoid circular dependency with api.js
    const BASE_URL = 'http://localhost:3000/api/v1';
    const response = await fetch(`${BASE_URL}/users/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken: refreshTokenValue }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Token refresh failed');
    }

    // Update access token
    if (result.success && result.data?.accessToken) {
      localStorage.setItem('authToken', result.data.accessToken);
      return result.data.accessToken;
    }

    throw new Error('Invalid refresh token response');
  } catch (error) {
    // Clear tokens on refresh failure
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    throw error;
  }
};

/**
 * Logout user
 * @returns {Promise} Response from backend
 */
export const logout = async () => {
  try {
    // Send logout request to backend
    await api.post('users/user/logout');
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // Always clear local data
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
  }
};

/**
 * Fetch the latest profile for the logged-in user so role/permissions stay current.
 */
/**
 * Check if user is properly authenticated with valid tokens
 * @returns {boolean} True if authenticated with valid tokens
 */
export const isAuthenticated = () => {
  const hasAuthFlag = localStorage.getItem('isAuthenticated') === 'true';
  const hasTokens = localStorage.getItem('authToken') && localStorage.getItem('refreshToken');
  return hasAuthFlag && hasTokens;
};

/**
 * Clear all authentication data
 */
export const clearAuthData = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('isAuthenticated');
};

export const fetchCurrentUserProfile = async () => {
  try {
    const response = await api.get('users/user/profile');
    if (response.success && response.data) {
      localStorage.setItem('userData', JSON.stringify(response.data));
      return response.data;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

