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
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `inventory/get/item?${queryParams}` : 'inventory/get/item';
  const response = await api.get(endpoint);
  return response;
};

/**
 * Get inventory item by ID
 * @param {string} itemId - Inventory item ID
 * @returns {Promise} Response from backend
 */
export const getInventoryItemById = async (itemId) => {
  const response = await api.get(`inventory/get/item/by/${itemId}`);
  return response;
};

/**
 * Create a new inventory item
 * @param {object} itemData - Inventory item data (name, category, unit, currentStock, minStockLevel, pricePerUnit)
 * @returns {Promise} Response from backend
 */
export const createInventoryItem = async (itemData) => {
  const response = await api.post('inventory/create/item', itemData);
  return response;
};

/**
 * Update inventory item
 * @param {string} itemId - Inventory item ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateInventoryItem = async (itemId, updateData) => {
  const response = await api.put(`inventory/update/item/by/${itemId}`, updateData);
  return response;
};

/**
 * Delete inventory item
 * @param {string} itemId - Inventory item ID
 * @returns {Promise} Response from backend
 */
export const deleteInventoryItem = async (itemId) => {
  const response = await api.delete(`inventory/delete/item/by/${itemId}`);
  return response;
};

/**
 * Get low stock items
 * @returns {Promise} Response from backend
 */
export const getLowStockItems = async () => {
  const response = await api.get('inventory/get/low-stock/items');
  return response;
};
// new for w
// Vendors
export const getVendors = async () => {
  const response = await api.get('inventory/vendors/get');
  return response;
};

export const createVendor = async (vendorData) => {
  const response = await api.post('inventory/vendors/create', vendorData);
  return response;
};

// Purchase Orders
export const getPurchaseOrders = async () => {
  const response = await api.get('inventory/purchase-orders/get');
  return response;
};

export const createPurchaseOrder = async (poData) => {
  const response = await api.post('inventory/purchase-orders/create', poData);
  return response;
};

export const updatePurchaseOrderStatus = async (poId, status) => {
  const response = await api.put(`inventory/purchase-orders/update-status/${poId}`, { status });
  return response;
};

// Wastage
export const getWastage = async () => {
  const response = await api.get('inventory/wastage/get');
  return response;
};

export const createWastage = async (wastageData) => {
  const response = await api.post('inventory/wastage/create', wastageData);
  return response;
};
//end