/**
 * Report API Helper Functions
 * 
 * Functions to handle report operations (export PDF, schedule reports)
 */

import api from './api.js';

/**
 * Export PDF report
 * @param {object} filters - Report filters (reportType, dateRange, branch, fromDate, toDate)
 * @returns {Promise} Response from backend
 */
export const exportPDF = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `reports/export/pdf?${queryParams}` : 'reports/export/pdf';
  const response = await api.get(endpoint);
  return response;
};

/**
 * Create a scheduled report
 * @param {object} scheduleData - Schedule data (reportType, frequency, time, email, format, includeCharts)
 * @returns {Promise} Response from backend
 */
export const createScheduledReport = async (scheduleData) => {
  const response = await api.post('reports/schedule', scheduleData);
  return response;
};

/**
 * Get all scheduled reports for the current user
 * @returns {Promise} Response from backend
 */
export const getScheduledReports = async () => {
  const response = await api.get('reports/schedule');
  return response;
};

/**
 * Update a scheduled report
 * @param {string} reportId - Scheduled report ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateScheduledReport = async (reportId, updateData) => {
  const response = await api.put(`reports/schedule/${reportId}`, updateData);
  return response;
};

/**
 * Delete a scheduled report
 * @param {string} reportId - Scheduled report ID
 * @returns {Promise} Response from backend
 */
export const deleteScheduledReport = async (reportId) => {
  const response = await api.delete(`reports/schedule/${reportId}`);
  return response;
};
/**
 * Generate and save a report snapshot
 * @param {object} filters - Report filters
 * @returns {Promise} Response from backend
 */
export const generateReport = async (filters) => {
  const response = await api.post('reports/generate', filters);
  return response;
};

/**
 * Get report history (archived reports)
 * @param {object} filters - Optional filters
 * @returns {Promise} Response from backend
 */
export const getReportHistory = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `reports/history?${queryParams}` : 'reports/history';
  const response = await api.get(endpoint);
  return response;
};

// Specific Report Helpers

export const getOrderReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/order?${queryParams}`);
};

export const getBillingReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/billing?${queryParams}`);
};

export const getStaffReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/staff?${queryParams}`);
};

export const getInventoryReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/inventory?${queryParams}`);
};

export const getMenuReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/menu?${queryParams}`);
};

export const getVendorReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/vendor?${queryParams}`);
};

export const getOfferReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/offer?${queryParams}`);
};

export const getPurchaseReport = async (filters) => {
  const queryParams = new URLSearchParams(filters).toString();
  return await api.get(`reports/purchase?${queryParams}`);
};
