/**
 * Restaurant API Helper Functions
 *
 * Functions to handle restaurant CRUD operations and account management
 */
// all new for w
import api from './api.js';

/**
 * Create a new restaurant
 * @param {object} restaurantData - Restaurant data
 * @returns {Promise} Response from backend
 */
export const createRestaurant = async (restaurantData) => {
  const response = await api.post('restaurants/create', restaurantData);
  return response;
};

/**
 * Get restaurant by ID
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise} Response from backend
 */
export const getRestaurantById = async (restaurantId) => {
  const response = await api.get(`restaurants/get/${restaurantId}`);
  return response;
};

/**
 * Get current user's restaurant
 * @returns {Promise} Response from backend
 */
export const getMyRestaurant = async () => {
  const response = await api.get('restaurants/get/my');
  return response;
};

/**
 * Update restaurant
 * @param {string} restaurantId - Restaurant ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateRestaurant = async (restaurantId, updateData) => {
  const response = await api.put(`restaurants/update/${restaurantId}`, updateData);
  return response;
};

/**
 * Delete restaurant (soft delete)
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise} Response from backend
 */
export const deleteRestaurant = async (restaurantId) => {
  const response = await api.delete(`restaurants/delete/${restaurantId}`);
  return response;
};

/**
 * Get all restaurants (admin only)
 * @param {object} filters - Optional filters
 * @returns {Promise} Response from backend
 */
export const getAllRestaurants = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `restaurants/get/all?${queryParams}` : 'restaurants/get/all';
  const response = await api.get(endpoint);
  return response;
};

/**
 * Get restaurant statistics
 * @param {string} restaurantId - Restaurant ID
 * @returns {Promise} Response from backend
 */
export const getRestaurantStats = async (restaurantId) => {
  const response = await api.get(`restaurants/stats/${restaurantId}`);
  return response;
};

/**
 * Get current user's restaurant statistics
 * @returns {Promise} Response from backend
 */
export const getMyRestaurantStats = async () => {
  const response = await api.get('restaurants/stats/my');
  return response;
};

/**
 * Update restaurant license
 * @param {string} restaurantId - Restaurant ID
 * @param {string} licenseKey - New license key
 * @returns {Promise} Response from backend
 */
export const updateRestaurantLicense = async (restaurantId, licenseKey) => {
  const response = await api.put(`restaurants/license/${restaurantId}`, { licenseKey });
  return response;
};

/**
 * Add bill amount to restaurant account
 * @param {number} billAmount - Amount to add
 * @param {string} billId - Bill ID (for reference)
 * @returns {Promise} Response from backend
 */
export const addBillToRestaurantAccount = async (billAmount, billId) => {
  const response = await api.post('restaurants/add-bill-amount', { billAmount, billId });
  return response;
};
// new for w
/**
 * Create a default restaurant for the current user
 * @param {object} restaurantData - Optional restaurant data to override defaults
 * @returns {Promise} Response from backend
 */
export const createDefaultRestaurant = async (restaurantData = {}) => {
  // Get current user data from localStorage
  const userData = localStorage.getItem('userData');
  if (!userData) {
    throw new Error('User not authenticated');
  }

  const user = JSON.parse(userData);

  // Create default restaurant data
  const defaultData = {
    name: `${user.name || 'User'}'s Restaurant`,
    email: user.email,
    phone: user.mobile || '',
    description: 'Auto-created restaurant for business management',
    address: {
      street: 'Default Address',
      city: 'Default City',
      state: 'Default State',
      country: 'India'
    },
    currency: 'INR',
    taxRate: 18,
    ...restaurantData // Allow overriding defaults
  };

  const response = await api.post('restaurants/create', defaultData);
  return response;
};

/**
 * Ensure user has a restaurant (create one if needed)
 * @returns {Promise} Restaurant data
 */
export const ensureUserHasRestaurant = async () => {
  try {
    // First try to get existing restaurant
    const existingRestaurant = await getMyRestaurant();
    if (existingRestaurant.success) {
      return existingRestaurant.data;
    }

    // If no restaurant exists, create a default one
    console.log('No restaurant found, creating default restaurant...');
    const newRestaurant = await createDefaultRestaurant();
    if (newRestaurant.success) {
      console.log('Default restaurant created successfully');
      return newRestaurant.data;
    }

    throw new Error('Failed to create or retrieve restaurant');
  } catch (error) {
    console.error('Error ensuring user has restaurant:', error);
    throw error;
  }
}; // end 
