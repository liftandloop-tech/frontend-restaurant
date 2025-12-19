import React, { useState } from "react";

/**
 * AddTable Component
 *
 * Modal popup for adding new tables with the following features:
 * - Table number (required)
 * - Capacity (required)
 * - Location/Zone (required)
 * - Status (optional, defaults to available)
 * - Notes (optional)
 * - Form validation and submission
 *
 * Props:
 * - isOpen: boolean to control modal visibility
 * - onClose: function to close the modal
 * - onSubmit: function to receive the table data
 */
const AddTable = ({ isOpen, onClose, onSubmit, error: externalError, success: externalSuccess }) => {
  // Form state for table data
  const [formData, setFormData] = useState({
    tableNumber: "",
    capacity: "",
    location: "indoor",
    status: "available",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tableNumber" || name === "capacity" 
        ? (value === "" ? "" : parseInt(value) || "")
        : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.tableNumber || formData.tableNumber < 1) {
      newErrors.tableNumber = "Table number is required and must be at least 1";
    }
    
    if (!formData.capacity || formData.capacity < 1) {
      newErrors.capacity = "Capacity is required and must be at least 1";
    }
    
    if (!formData.location) {
      newErrors.location = "Location is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Prepare table data
      const tableData = {
        tableNumber: parseInt(formData.tableNumber),
        capacity: parseInt(formData.capacity),
        location: formData.location,
        status: formData.status || "available",
        notes: formData.notes ? formData.notes.trim() : undefined,
      };

      // Remove undefined fields
      Object.keys(tableData).forEach(key => {
        if (tableData[key] === undefined) {
          delete tableData[key];
        }
      });

      // Pass data to parent component
      if (onSubmit) {
        await onSubmit(tableData);
      }

      // Reset form after successful submission
      setFormData({
        tableNumber: "",
        capacity: "",
        location: "indoor",
        status: "available",
        notes: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error submitting table:", error);
    } finally {
      setLoading(false);
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/20 bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white rounded-lg shadow-xl scrollbar-hide w-full max-w-[500px] max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Add New Table
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Add a new table to your restaurant floor plan.
            </p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none transition-colors duration-200"
            onClick={onClose}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-6">
            {/* Error Message */}
            {(externalError || Object.keys(errors).length > 0) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 whitespace-pre-line">
                  {externalError || "Please fix the errors below"}
                </p>
              </div>
            )}

            {/* Success Message */}
            {externalSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-sm text-green-600">{externalSuccess}</p>
              </div>
            )}

            {/* Table Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Table Information
              </h3>
              <div className="space-y-4">
                {/* Table Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Table Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="tableNumber"
                    value={formData.tableNumber}
                    onChange={handleInputChange}
                    placeholder="Enter table number"
                    min="1"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.tableNumber ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.tableNumber && (
                    <p className="mt-1 text-sm text-red-600">{errors.tableNumber}</p>
                  )}
                </div>

                {/* Capacity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity (Seats) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    placeholder="Enter number of seats"
                    min="1"
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.capacity ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.capacity && (
                    <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location/Zone <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="indoor">Indoor</option>
                    <option value="outdoor">Outdoor</option>
                    <option value="vip">VIP</option>
                    <option value="bar">Bar</option>
                  </select>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="reserved">Reserved</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Any additional notes about this table..."
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {loading ? "Adding..." : "Add Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTable;

