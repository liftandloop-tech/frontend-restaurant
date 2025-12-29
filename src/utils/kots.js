/**
 * KOT API Helper Functions
 * 
 * Functions to handle KOT (Kitchen Order Ticket) operations
 */

import api from './api.js';

/**
 * Create a KOT for a specific station
 * @param {string} orderId - Order ID
 * @param {string} station - Station type ('kitchen', 'bar', 'beverage')
 * @returns {Promise} Response from backend
 */
export const createKOT = async (orderId, station) => {
  const response = await api.post('kots/post/KOT/waiter', {
    orderId,
    station
  });
  return response;
};

/**
 * Get all KOTs
 * @param {object} filters - Optional filters (station, status, orderId)
 * @returns {Promise} Response from backend
 */
export const getKOTs = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `kots/get/KOTs?${queryParams}` : 'kots/get/KOTs';
  const response = await api.get(endpoint);
  return response;
};

/**
 * Get KOT by ID
 * @param {string} kotId - KOT ID
 * @returns {Promise} Response from backend
 */
export const getKOTById = async (kotId) => {
  const response = await api.get(`kots/get/KOT/by/${kotId}`);
  return response;
};

/**
 * Update KOT status
 * @param {string} kotId - KOT ID
 * @param {string} status - New status ('pending', 'preparing', 'ready', 'sent')
 * @returns {Promise} Response from backend
 */
export const updateKOTStatus = async (kotId, status) => {
  const response = await api.patch(`kots/update/KOT/${kotId}/status`, { status });
  return response;
};

/**
 * Mark KOT as printed
 * @param {string} kotId - KOT ID
 * @returns {Promise} Response from backend
 */
export const markKOTPrinted = async (kotId) => {
  const response = await api.post(`kots/post/KOT/${kotId}/print`);
  return response;
};
