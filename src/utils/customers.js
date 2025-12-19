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
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `customers/get/customer?${queryParams}` : 'customers/get/customer';
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get customer by ID
 * @param {string} customerId - Customer ID
 * @returns {Promise} Response from backend
 */
export const getCustomerById = async (customerId) => {
  try {
    const response = await api.get(`customers/get/customer/by/id/${customerId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new customer
 * @param {object} customerData - Customer data (name, phone, email, address, etc.)
 * @returns {Promise} Response from backend
 */
export const createCustomer = async (customerData) => {
  try {
    const response = await api.post('customers/create/customer', customerData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update customer
 * @param {string} customerId - Customer ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateCustomer = async (customerId, updateData) => {
  try {
    const response = await api.put(`customers/update/customer/by/id/${customerId}`, updateData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete customer
 * @param {string} customerId - Customer ID
 * @returns {Promise} Response from backend
 */
export const deleteCustomer = async (customerId) => {
  try {
    const response = await api.delete(`customers/delete/customer/by/id/${customerId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

