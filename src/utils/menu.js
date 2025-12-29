/**
 * Menu API Helper Functions
 *
 * Functions to handle menu item and category CRUD operations
 */

import api from './api.js';

/**
 * Get all categories
 * @param {object} filters - Optional filters
 * @returns {Promise} Response from backend
 */
export const getCategories = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `menu/categories?${queryParams}` : 'menu/categories';
    const response = await api.get(endpoint);
    return response;
};

/**
 * Create a new category
 * @param {object} categoryData - Category data
 * @returns {Promise} Response from backend
 */
export const createCategory = async (categoryData) => {
    const response = await api.post('menu/categories', categoryData);
    return response;
};

/**
 * Update category
 * @param {string} categoryId - Category ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateCategory = async (categoryId, updateData) => {
    const response = await api.put(`menu/categories/${categoryId}`, updateData);
    return response;
};

/**
 * Delete category
 * @param {string} categoryId - Category ID
 * @returns {Promise} Response from backend
 */
export const deleteCategory = async (categoryId) => {
    const response = await api.delete(`menu/categories/${categoryId}`);
    return response;
};

/**
 * Get all menu items
 * @param {object} filters - Optional filters
 * @returns {Promise} Response from backend
 */
export const getMenuItems = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `menu/items?${queryParams}` : 'menu/items';
    const response = await api.get(endpoint);
    return response;
};

/**
 * Create a new menu item
 * @param {object} itemData - Item data
 * @returns {Promise} Response from backend
 */
export const createMenuItem = async (itemData) => {
    const response = await api.post('menu/items', itemData);
    return response;
};

/**
 * Update menu item
 * @param {string} itemId - Item ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateMenuItem = async (itemId, updateData) => {
    const response = await api.put(`menu/items/${itemId}`, updateData);
    return response;
};

/**
 * Delete menu item
 * @param {string} itemId - Item ID
 * @returns {Promise} Response from backend
 */
export const deleteMenuItem = async (itemId) => {
    const response = await api.delete(`menu/items/${itemId}`);
    return response;
};
