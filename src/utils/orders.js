/**
 * Order API Helper Functions
 * 
 * Functions to handle order creation and management
 */

import api from './api.js';

/**
 * Create a new order
 * @param {object} orderData - Order data (tableNumber, items, notes)
 * @returns {Promise} Response from backend
 */
export const createOrder = async (orderData) => {
    // Send create order request to backend
    // Note: Backend validation schema only accepts name, qty, price for items
    const payload = {
      tableNumber: orderData.tableNumber,
      items: orderData.items.map(item => ({
        name: item.name,
        qty: item.qty,
        price: item.price
      })),
      notes: orderData.notes || ""
    };

    if (orderData.discount) {
      payload.discount = orderData.discount;
    }

    if (orderData.source) {
      payload.source = orderData.source;
    }

    // Customer information                // new for w
    if (orderData.customerId) {
      payload.customerId = orderData.customerId;
    }
    if (orderData.customerName) {
      payload.customerName = orderData.customerName;
    }
    if (orderData.customerPhone) {
      payload.customerPhone = orderData.customerPhone;
    }
    if (orderData.customerEmail) {
      payload.customerEmail = orderData.customerEmail;
    }
    if (orderData.deliveryAddress) {
      payload.deliveryAddress = orderData.deliveryAddress;
    }
    if (orderData.deliveryPhone) {
      payload.deliveryPhone = orderData.deliveryPhone;
    }
    if (orderData.deliveryTime) {
      payload.deliveryTime = orderData.deliveryTime;
    }
    if (orderData.waiterId) {
      payload.waiterId = orderData.waiterId;
    }
    if (orderData.status) {
      payload.status = orderData.status;
    }        // end
    const response = await api.post('orders/post/order', payload);

    return response;
};

/**
 * Get all orders
 * @param {object} filters - Optional filters (status, tableNumber, etc.)
 * @returns {Promise} Response from backend
 */
export const getOrders = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `orders/get/order?${queryParams}` : 'orders/get/order';
    const response = await api.get(endpoint);
    return response;
};

/**
 * Get order by ID
 * @param {string} orderId - Order ID
 * @returns {Promise} Response from backend
 */
export const getOrderById = async (orderId) => {
    const response = await api.get(`orders/get/order/by/${orderId}`);
    return response;
};

/**
 * Update order
 * @param {string} orderId - Order ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateOrder = async (orderId, updateData) => {
    const response = await api.put(`orders/update/order/by/${orderId}`, updateData);
    return response;
};

/**
 * Update order status
 * @param {string} orderId - Order ID
 * @param {string} status - New status
 * @returns {Promise} Response from backend
 */
export const updateOrderStatus = async (orderId, status) => {
    const response = await api.patch(`orders/patch/order/by/${orderId}/status`, { status });
    return response;
};

/**
 * Cancel order
 * @param {string} orderId - Order ID
 * @param {string} reason - Cancellation reason
 * @returns {Promise} Response from backend
 */
export const cancelOrder = async (orderId, reason) => {
    const response = await api.post(`orders/post/order/by/${orderId}/cancel`, { reason });
    return response;
};
