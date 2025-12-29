/**
 * Bill API Helper Functions
 * 
 * Functions to handle bill creation and payment processing
 */

import api from './api.js';

/**
 * Create a bill for an order
 * @param {string} orderId - Order ID
 * @returns {Promise} Response from backend
 */
export const createBill = async (orderId) => {
  // Generate unique idempotency key for each bill creation attempt
  // Using timestamp + random UUID to ensure absolute uniqueness
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  // Include timestamp and random component to ensure uniqueness even for rapid clicks
  const timestamp = Date.now();
  const performanceTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const uuid = generateUUID();
  const idempotencyKey = `bill-${orderId}-${timestamp}-${performanceTime}-${random}-${uuid}`;
  const response = await api.post(`bills/post/order/${orderId}`, {
    idempotencyKey
  });
  return response;
};

/**
 * Process payment for a bill
 * @param {string} billId - Bill ID
 * @param {object} paymentData - Payment data (paymentMethod, transactionId, gatewayResponse)
 * @returns {Promise} Response from backend
 */
export const processPayment = async (billId, paymentData) => {
  // Generate idempotency key to prevent duplicate payments
  // Generate UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  const idempotencyKey = generateUUID();
  const response = await api.post(`bills/post/${billId}/payment`, {
    ...paymentData,
    idempotencyKey
  });
  return response;
};

/**
 * Get all bills
 * @param {object} filters - Optional filters (paid, paymentMethod, cashierId, startDate, endDate)
 * @returns {Promise} Response from backend
 */
export const getBills = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `bills/get/bill?${queryParams}` : 'bills/get/bill';
  const response = await api.get(endpoint);
  return response;
};

/**
 * Get bill by ID
 * @param {string} billId - Bill ID
 * @returns {Promise} Response from backend
 */
export const getBillById = async (billId) => {
  const response = await api.get(`bills/get/bill/by/${billId}`);
  return response;
};

/**
 * Process refund for a bill
 * @param {string} billId - Bill ID
 * @param {number} refundAmount - Refund amount
 * @param {string} reason - Refund reason
 * @returns {Promise} Response from backend
 */
export const processRefund = async (billId, refundAmount, reason) => {
  const response = await api.post(`bills/post/${billId}/refund`, {
    refundAmount,
    reason
  });
  return response;
};

/**
 * Print a bill
 * @param {string} billId - Bill ID
 * @returns {Promise} Response from backend
 */
export const printBill = async (billId) => {
  const response = await api.get(`bills/get/${billId}/print`);
  return response;
};
