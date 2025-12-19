/**
 * Inventory API Helper Functions
 *
 * Functions to handle inventory item CRUD operations and stock management
 */

import api from './api.js';

/**
 * Get all inventory items
 * @param {object} filters - Optional filters (category, search)
 * @returns {Promise} Response from backend
 */
export const getInventoryItems = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `inventory/get/item?${queryParams}` : 'inventory/get/item';
    const response = await api.get(endpoint);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get inventory item by ID
 * @param {string} itemId - Inventory item ID
 * @returns {Promise} Response from backend
 */
export const getInventoryItemById = async (itemId) => {
  try {
    const response = await api.get(`inventory/get/item/by/${itemId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Create a new inventory item
 * @param {object} itemData - Inventory item data (name, category, unit, currentStock, minStockLevel, pricePerUnit)
 * @returns {Promise} Response from backend
 */
export const createInventoryItem = async (itemData) => {
  try {
    const response = await api.post('inventory/create/item', itemData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Update inventory item
 * @param {string} itemId - Inventory item ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateInventoryItem = async (itemId, updateData) => {
  try {
    const response = await api.put(`inventory/update/item/by/${itemId}`, updateData);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete inventory item
 * @param {string} itemId - Inventory item ID
 * @returns {Promise} Response from backend
 */
export const deleteInventoryItem = async (itemId) => {
  try {
    const response = await api.delete(`inventory/delete/item/by/${itemId}`);
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Get low stock items
 * @returns {Promise} Response from backend
 */
export const getLowStockItems = async () => {
  try {
    const response = await api.get('inventory/get/low-stock/items');
    return response;
  } catch (error) {
    throw error;
  }
};