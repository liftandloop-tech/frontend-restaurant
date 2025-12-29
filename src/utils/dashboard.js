/**
 * Dashboard API Helper Functions
 */

import api from './api.js';

/**
 * Get today's dashboard summary
 * @returns {Promise} Response from backend
 */
export const getTodaySummary = async () => {
    const response = await api.get('dashboard/get/today');
    return response;
};

/**
 * Get recent activity
 * @param {number} limit - Number of items to retrieve
 * @returns {Promise} Response from backend
 */
export const getRecentActivity = async (limit = 10) => {
    const response = await api.get(`dashboard/get/recent?limit=${limit}`);
    return response;
};

/**
 * Get comprehensive dashboard overview
 * @param {string} from - Start date (YYYY-MM-DD)
 * @param {string} to - End date (YYYY-MM-DD)
 * @returns {Promise} Response from backend
 */
export const getDashboardOverview = async (from, to) => {
    let endpoint = 'dashboard/get/overview';
    if (from && to) {
        endpoint += `?from=${from}&to=${to}`;
    }
    const response = await api.get(endpoint);
    return response;
};
