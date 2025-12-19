/**
 * Staff API Helper Functions
 *
 * This file provides functions to interact with the staff management API endpoints.
 * All functions use the centralized apiCall function for consistent error handling and token management.
 */

import { api } from './api.js';

/**
 * Staff Authentication
 */

// Login staff member
export const loginStaff = async (identifier, password) => {
    return await api.post('staff/login', { identifier, password });
};

// Logout staff member (client-side only - removes tokens)
export const logoutStaff = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/login';
};

/**
 * Staff Profile Management
 */

// Get current staff profile
export const getStaffProfile = async () => {
    return await api.get('staff/profile');
};

// Update current staff profile
export const updateStaffProfile = async (profileData) => {
    return await api.put('staff/profile', profileData);
};

// Change staff password
export const changeStaffPassword = async (currentPassword, newPassword) => {
    return await api.patch('staff/change-password', { currentPassword, newPassword });
};

/**
 * Staff Management (Admin/Manager only)
 */

// Register new staff member
export const registerStaff = async (staffData) => {
    return await api.post('staff/register', staffData);
};

// Get all staff members with pagination and filters
export const getAllStaff = async (params = {}) => {
    // Filter out undefined, null, or "All Roles" values
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== "" && v !== "All Roles")
    );
    const queryString = new URLSearchParams(filteredParams).toString();
    const endpoint = queryString ? `staff?${queryString}` : 'staff';
    return await api.get(endpoint);
};

// Get staff member by ID
export const getStaffById = async (staffId) => {
    return await api.get(`staff/${staffId}`);
};

// Update staff member
export const updateStaff = async (staffId, updateData) => {
    return await api.put(`staff/${staffId}`, updateData);
};

// Delete staff member (soft delete - deactivate)
export const deleteStaff = async (staffId) => {
    return await api.delete(`staff/${staffId}`);
};

// Permanently delete staff member (admin only)
export const permanentlyDeleteStaff = async (staffId) => {
    return await api.delete(`staff/${staffId}/permanent`);
};

// Reset staff password (admin only)
export const resetStaffPassword = async (staffId, newPassword) => {
    return await api.patch(`staff/${staffId}/reset-password`, { newPassword });
};

// Get staff statistics
export const getStaffStats = async () => {
    return await api.get('staff/stats');
};

/**
 * Helper Functions
 */

// Format staff data for display
export const formatStaffData = (staff) => {
    return {
        ...staff,
        formattedJoinDate: staff.dateOfJoining ? new Date(staff.dateOfJoining).toLocaleDateString() : null,
        formattedLastLogin: staff.lastLogin ? new Date(staff.lastLogin).toLocaleString() : null,
        fullName: staff.fullName || '',
        displayName: staff.fullName || staff.username || 'Unknown Staff'
    };
};

// Format staff list for display
export const formatStaffList = (staffArray) => {
    return staffArray.map(formatStaffData);
};

// Get role display name
// export const getRoleDisplayName = (role) => {
//     const roleNames = {
//         'Admin': 'Administrator',
//         'Manager': 'Manager',
//         'Cashier': 'Cashier',
//         'Waiter': 'Waiter',
//         'Kitchen': 'Kitchen Staff'
//     };
//     return roleNames[role] || role;
// };

//get role display name
export const getRoleDisplayName = (role) => {
    const roleNames = {
        'Admin': 'Administration',
        'Manager': 'Manager',
        'Cashier': 'Cashier',
        'Waiter': 'waiter',
        'Kitchen': 'Kitchen Staff',
        'Owner': 'Owner',
        'Delivery': 'Delivery Staff'
    }
    return roleNames[role] || role;
}

// // Get status display info
// export const getStatusDisplayInfo = (isActive) => {
//     return isActive ? {
//         text: 'Active',
//         color: 'green',
//         bgColor: 'bg-green-100',
//         textColor: 'text-green-800'
//     } : {
//         text: 'Inactive',
//         color: 'red',
//         bgColor: 'bg-red-100',
//         textColor: 'text-red-800'
//     };
// };
export const getStatusDisplayInfo = (isActive) => {
    return isActive ? {
        text: 'Active',
        color: 'green',
        bgColor: 'bg-green-100',
        textColor: 'text-green-800'

    } : {
        text: 'Inactive',
        color: 'red',
        bgColor: 'bg-red-100',
        textColor: 'text-red-800'

    }
}

// Validate staff form data
// export const validateStaffForm = (formData) => {
//     const errors = [];

//     if (!formData.fullName || formData.fullName.trim().length < 2) {
//         errors.push('Full name is required and must be at least 2 characters');
//     }

//     if (!formData.phoneNumber) {
//         errors.push('Phone number is required');
//     } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
//         errors.push('Please enter a valid phone number');
//     }

//     if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//         errors.push('Please enter a valid email address');
//     }

//     if (!formData.role) {
//         errors.push('Role is required');
//     }

//     if (!formData.username || formData.username.trim().length < 3) {
//         errors.push('Username is required and must be at least 3 characters');
//     }

//     if (!formData.password || formData.password.length < 6) {
//         errors.push('Password is required and must be at least 6 characters');
//     }

//     if (formData.shiftStart && formData.shiftEnd && formData.shiftStart >= formData.shiftEnd) {
//         errors.push('Shift end time must be after shift start time');
//     }

//     return {
//         isValid: errors.length === 0,
//         errors
//     };
// };
//validate staff from data
export const validateStaffFormData = (formData) => {
    const errors = [];
    if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.push('full name is required and must be at least 2 characters');
    }
    if (!formData.phoneNumber) {
        errors.push('phone number is required');
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
        errors.push('Please enter a valid phone number');
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    if (!formData.role) {
        errors.push('Role is required');
    }

    if (!formData.username || formData.fullName.trim().length < 3) {
        errors.push('username is required and must be at least 3 characters');
    }
    if (!formData.password || formData.password.length < 6) {
        errors.push('password is required and must be at least 6 characters');
    }
    if (!formData.shiftStart && formData.shiftEnd && formData.shiftStart >= formData.shiftEnd) {
        errors.push('shift and time must be after shift start time');
    }
    return {
        isValid: errors.length === 0,
        errors
    }

}


// Generate default password for new staff
export const generateDefaultPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};

// Check if current user has permission for staff management
export const canManageStaff = (userRole) => {
    return ['Admin', 'Manager'].includes(userRole);
};

// Check if current user is admin
export const isAdmin = (userRole) => {
    return userRole === 'Admin';
};
// new
// Get active staff by role
export const getActiveStaffByRole = async (role) => {
    return await api.get(`staff/active/${role}`);
};

// Get all active waiters
export const getActiveWaiters = async () => {
    return await getActiveStaffByRole('Waiter');
};