// import api from './api.js';

// /**
//  * Generate license key for current user
//  */
// export const generateLicense = async () => {
//   try {
//     const response = await api.post('licenses/generate');
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Get current user's license
//  */
// export const getMyLicense = async () => {
//   try {
//     const response = await api.get('licenses/my-license');
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Validate license key
//  */
// export const validateLicense = async (licenseKey) => {
//   try {
//     const response = await api.post('licenses/validate', { licenseKey });
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };

// /**
//  * Get all licenses (Admin only)
//  */
// export const getAllLicenses = async () => {
//   try {
//     const response = await api.get('licenses/all');
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };