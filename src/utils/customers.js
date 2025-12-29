/**
 * Customer API Helper Functions
 * 
 * Functions to handle customer CRUD operations
 */

import api from './api.js';

/**
 * Get all customers
 * @param {object} filters - Optional filters (isActive, search, etc.)
 * @returns {Promise} Response from backend
 */
export const getCustomers = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `customers/get/customer?${queryParams}` : 'customers/get/customer';
  const response = await api.get(endpoint);
  return response;
};

export const getCustomerById = async (customerId) => {
  const response = await api.get(`customers/get/customer/by/id/${customerId}`);
  return response;
};

export const createCustomer = async (customerData) => {
  const response = await api.post('customers/create/customer', customerData);
  return response;
};

export const updateCustomer = async (customerId, updateData) => {
  const response = await api.put(`customers/update/customer/by/id/${customerId}`, updateData);
  return response;
};

export const deleteCustomer = async (customerId) => {
  const response = await api.delete(`customers/delete/customer/by/id/${customerId}`);
  return response;
};

export const getFeedbacks = async () => {
  const response = await api.get('feedback/all');
  return response;
};

export const submitFeedback = async (feedbackData) => {
  const response = await api.post('feedback/submit', feedbackData);
  return response;
};

export const activateRevenueCard = async (customerId, cardData) => {
  const response = await api.post(`customers/activate-card/${customerId}`, cardData);
  return response;
};

//end