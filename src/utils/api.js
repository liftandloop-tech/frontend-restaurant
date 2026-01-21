/**
 * Simple API Helper - Connect Frontend to Backend
 * 
 * This file helps you send requests to the backend server
 * Includes automatic token refresh on 401 errors
 */

// Backend server URL from environment variable
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

// Flag to prevent infinite refresh loops
let isRefreshing = false;
let refreshPromise = null;

// token exoiration check - refresh 5 minute before  expiry
// const TOKEN_REFRESH_BUFFER = 5 * 60 * 1000;
/** check if token is closed to expirin
 * @param {Date} token - jwt Token 
 * @returns {boolean} True if token needs refresh
 */

/**
* Refresh access token
* @returns {Promise<string>} New access token
*/
const refreshAccessToken = async () => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const refreshTokenValue = localStorage.getItem('refreshToken');

      if (!refreshTokenValue) {
        throw new Error('No refresh token available');
      }

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

      // Redirect to login if we're in the browser
      // if (typeof window !== 'undefined') {
      //   // Use setTimeout to ensure error is thrown before redirect
      //   setTimeout(() => {
      //     window.location.href = '/login';
      //   }, 100);
      // }

      throw error;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

/**
 * Send request to backend
 * @param {string} endpoint - API endpoint (e.g., 'users/user/login')
 * @param {string} method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param {object} data - Data to send (optional)
 * @param {boolean} retry - Whether to retry on 401 (default: true)
 * @returns {Promise} Response from backend
 */
export const apiCall = async (endpoint, method = 'GET', data = null, retry = true) => {
  // function body without try catch
  // Build the full URL
  const url = `${BASE_URL}/${endpoint}`;

  // Get token from localStorage (if user is logged in)
  let token = localStorage.getItem('authToken');

  // Prepare request options
  const options = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add updated logic to retrieve restaurantId from userData
  const userDataStr = localStorage.getItem('userData');
  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      if (userData && userData.restaurantId) {
        options.headers['x-restaurant-id'] = userData.restaurantId;
      }
    } catch (e) {
      console.warn('Failed to parse userData for restaurantId', e);
    }
  }

  // Add token to header if available
  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  // Add data for POST/PUT/PATCH requests
  if (data) {
    options.body = JSON.stringify(data);
  }

  // Send request to backend
  const response = await fetch(url, options);

  // Get response data
  const result = await response.json();

  // Handle 401 Unauthorized - Token expired or invalid
  if (response.status === 401 && retry && endpoint !== 'users/refresh-token' && endpoint !== 'users/user/login') {
    const errorMessage = result.message || 'Unauthorized';
    console.log('401 Error for endpoint:', endpoint, 'Message:', errorMessage);

    // If token expired, try to refresh
    if (errorMessage.includes('expired') || errorMessage.includes('Token')) {
      try {
        // Refresh the token
        const newToken = await refreshAccessToken();

        // Retry the original request with new token
        options.headers['Authorization'] = `Bearer ${newToken}`;
        const retryResponse = await fetch(url, options);
        const retryResult = await retryResponse.json();

        if (!retryResponse.ok) {
          const error = new Error(retryResult.message || 'Request failed after token refresh');
          error.response = retryResult;
          error.status = retryResponse.status;
          throw error;
        }

        return retryResult;
      } catch (refreshError) {
        console.error('RefreshToken failed:', refreshError);
        // Refresh failed - tokens cleared and redirect initiated
        // Create a special error that indicates redirect is happening
        const error = new Error('Session expired. Please login again.');
        error.response = result;
        error.status = 401;
        error.isRefreshFailure = true; // Flag to indicate refresh failed
        throw error;
      }
    } else {
      // Other 401 errors (invalid token, no token, etc.)
      console.log('401 Error - No refresh attempted:', errorMessage);

      // If it's "No token provided", clear authentication state
      if (errorMessage.includes('No token provided')) {
        console.log('Clearing authentication state due to missing token');
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('isAuthenticated');

        // Redirect to login if we're in the browser
        // if (typeof window !== 'undefined') {
        //   // Use setTimeout to ensure error is thrown before redirect
        //   setTimeout(() => {
        //     window.location.href = '/login';
        //   }, 100);
        // }
      }

      const error = new Error(errorMessage);
      error.response = result;
      error.status = 401;
      throw error;
    }
  }

  // Check if request failed
  if (!response.ok) {
    console.log('API Request failed:', {
      endpoint,
      status: response.status,
      message: result.message,
      hasToken: !!localStorage.getItem('authToken'),
      isAuthenticated: localStorage.getItem('isAuthenticated')
    });

    // Handle 403 Forbidden (license issues) - don't clear auth
    if (response.status === 403) {
      console.log('403 Forbidden - License or permission issue, not clearing auth');
    }

    // Build detailed error message
    let errorMessage = result.message || 'Request failed';

    // If validation errors exist, include them in the message
    if (result.errors && Array.isArray(result.errors) && result.errors.length > 0) {
      const validationErrors = result.errors.map(err => {
        const field = err.field || 'unknown';
        const message = err.message || 'Invalid value';
        return `${field}: ${message}`;
      }).join('; ');
      errorMessage = `${errorMessage}. ${validationErrors}`;
    }

    const error = new Error(errorMessage);
    error.response = result;
    error.status = response.status;
    error.validationErrors = result.errors || [];
    throw error;
  }

  // Return the result
  return result;
};

// Helper functions for common HTTP methods
export const api = {
  // GET request
  get: (endpoint) => apiCall(endpoint, 'GET'),

  // POST request
  post: (endpoint, data) => apiCall(endpoint, 'POST', data),

  // PUT request
  put: (endpoint, data) => apiCall(endpoint, 'PUT', data),

  // PATCH request
  patch: (endpoint, data) => apiCall(endpoint, 'PATCH', data),

  // DELETE request
  delete: (endpoint) => apiCall(endpoint, 'DELETE'),
};

export default api;

