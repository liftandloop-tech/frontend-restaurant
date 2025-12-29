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
