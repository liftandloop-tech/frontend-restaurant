/**
 * Reservation API Helper Functions
 * 
 * Functions to handle reservation operations
 */

import api from './api.js';

/**
 * Create a new reservation
 * @param {object} reservationData - Reservation data (customerName, customerPhone, customerEmail, tableNumber, reservationDate, reservationTime, numberOfGuests, specialRequests)
 * @returns {Promise} Response from backend
 */
export const createReservation = async (reservationData) => {
  const response = await api.post('reservations/create/reservation', {
    customerName: reservationData.name,
    customerPhone: reservationData.phone,
    customerEmail: reservationData.email || undefined,
    tableNumber: parseInt(reservationData.table),
    reservationDate: reservationData.date,
    reservationTime: reservationData.time,
    numberOfGuests: parseInt(reservationData.partySize),
    specialRequests: reservationData.notes || undefined
  });
  return response;
};

/**
 * Get all reservations
 * @param {object} filters - Optional filters (status, reservationDate)
 * @returns {Promise} Response from backend
 */
export const getReservations = async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const endpoint = queryParams ? `reservations/get/reservation?${queryParams}` : 'reservations';
  const response = await api.get(endpoint);
  return response;
};

/**
 * Get reservation by ID
 * @param {string} reservationId - Reservation ID
 * @returns {Promise} Response from backend
 */
export const getReservationById = async (reservationId) => {
  const response = await api.get(`reservations/get/reservation/by/:id/${reservationId}`);
  return response;
};

/**
 * Update reservation
 * @param {string} reservationId - Reservation ID
 * @param {object} updateData - Data to update
 * @returns {Promise} Response from backend
 */
export const updateReservation = async (reservationId, updateData) => {
  const response = await api.put(`reservations/update/reservation/by/:id/${reservationId}`, updateData);
  return response;
};

/**
 * Update reservation status
 * @param {string} reservationId - Reservation ID
 * @param {string} status - New status ('pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no-show')
 * @returns {Promise} Response from backend
 */
export const updateReservationStatus = async (reservationId, status) => {
  const response = await api.patch(`reservations/update/reservation/by/:id/status/${reservationId}/status`, { status });
  return response;
};

/**
 * Delete reservation
 * @param {string} reservationId - Reservation ID
 * @returns {Promise} Response from backend
 */
export const deleteReservation = async (reservationId) => {
  const response = await api.delete(`reservations/delete/reservation/by/:id/${reservationId}`);
  return response;
};
