/**
 * Table API Helper Functions
 * 
 * Functions to handle table CRUD operations
 */

import api from './api.js';

/**
 * Get all tables
 * @param {object} filters - Optional filters (status, location, etc.)
 * @returns {Promise} Response from backend
 */
export const getTables = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `tables/get/table?${queryParams}` : 'tables/get/table';
  const response = await api.get(endpoint);
  return response;
};

/**
 * Get table by ID
 * @param {string} tableId - Table ID
 * @returns {Promise} Response from backend
 */
export const getTableById = async (tableId) => {
  const response = await api.get(`tables/get/table/by/${tableId}`);
  return response;
};

/**
 * Create a new table
 * @param {object} tableData - Table data (tableNumber, capacity, location, status, notes)
 * @returns {Promise} Response from backend
 */
export const createTable = async (tableData) => {
  const response = await api.post('tables/create/tables', tableData);
  return response;
};

/**
 * Update table
 * @param {string} tableId - Table ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateTable = async (tableId, updateData) => {
  const response = await api.put(`tables/update/table/by/${tableId}`, updateData);
  return response;
};

/**
 * Update table status
 * @param {string} tableId - Table ID
 * @param {string} status - New status
 * @returns {Promise} Response from backend
 */
export const updateTableStatus = async (tableId, status) => {
  const response = await api.patch(`tables/update/table/status/by/${tableId}/status`, { status });
  return response;
};

/**
 * Transfer table back to available status
 * @param {number} tableNumber - Table number
 * @returns {Promise} Response from backend
 */
export const transferTable = async (tableNumber) => {
  const response = await api.patch(`tables/transfer/table/${tableNumber}`);
  return response;
};

/**
 * Complete table cleaning and make available
 * @param {number} tableNumber - Table number
 * @returns {Promise} Response from backend
 */
export const completeCleaning = async (tableNumber) => {
  const response = await api.patch(`tables/complete/cleaning/${tableNumber}`);
  return response;
};

/**
 * Delete table
 * @param {string} tableId - Table ID
 * @returns {Promise} Response from backend
 */
export const deleteTable = async (tableId) => {
  const response = await api.delete(`tables/delete/table/by/${tableId}`);
  return response;
};
/**
 *set table to transfer status 
 * @param {string} tableNumber - Table Number
 * @returns {Promise} Response from backend
 */
export const setTableTransfer = async (tableNumber) => {
  const Response = await api.patch(`tables/transfer/table${tableNumber}`, { status: 'transfer' })
  return Response
}
