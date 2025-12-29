import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

/**
 * EditInventoryItem Component
 *
 * Modal popup for editing existing inventory items with the following features:
 * - Pre-populated form fields with current item data
 * - All fields editable except ID
 * - Form validation and submission
 * - Update inventory item via API
 *
 * Props:
 * - isOpen: boolean to control modal visibility
 * - onClose: function to close the modal
 * - onSubmit: function to receive the updated item data
 * - item: object containing current item data
 */
const EditInventoryItem = ({ isOpen, onClose, onSubmit, item }) => {
  // Form state for inventory item data
  const [formData, setFormData] = useState({
    name: "",
    category: "other",
    unit: "",
    currentStock: "",
    minStockLevel: "",
    maxStockLevel: "",
    pricePerUnit: "",
    vendor: "",
    expiryDate: "",
    batchNumber: "",
    location: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  // Populate form when item changes
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        category: item.category || "other",
        unit: item.unit || "",
        currentStock: item.currentStock || "",
        minStockLevel: item.minStockLevel || "",
        maxStockLevel: item.maxStockLevel || "",
        pricePerUnit: item.pricePerUnit || "",
        vendor: item.vendor || "",
        expiryDate: item.expiryDate && !isNaN(new Date(item.expiryDate).getTime())
          ? new Date(item.expiryDate).toISOString().split('T')[0]
          : "",
        batchNumber: item.batchNumber || "",
        location: item.location || "",
        notes: item.notes || "",
      });
    }
  }, [item]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Item name is required");
      return;
    }

    if (!formData.unit) {
      alert("Unit is required");
      return;
    }

    setLoading(true);

    try {
      // Transform form data to match backend API format
      const updateData = {
        name: formData.name.trim(),
        category: formData.category,
        unit: formData.unit,
        currentStock: parseFloat(formData.currentStock) || 0,
        minStockLevel: parseFloat(formData.minStockLevel) || 0,
        maxStockLevel: parseFloat(formData.maxStockLevel) || undefined,
        pricePerUnit: parseFloat(formData.pricePerUnit) || 0,
        vendor: formData.vendor.trim() || undefined,
        expiryDate: formData.expiryDate ? new Date(formData.expiryDate) : undefined,
        batchNumber: formData.batchNumber.trim() || undefined,
        location: formData.location.trim() || undefined,
        notes: formData.notes.trim() || undefined,
      };

      await onSubmit(item._id, updateData);
      onClose();
    } catch (error) {
      console.error("Error updating item:", error);
      alert("Failed to update item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[100vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-blue-600 text-white rounded-t-lg">
          <div>
            <h2 className="text-2xl font-bold">Edit Inventory Item</h2>
            <p className="text-blue-100 mt-1">Update item details</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded-full transition-colors"
            disabled={loading}
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Item Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              >
                <option value="vegetable">Vegetable</option>
                <option value="fruit">Fruit</option>
                <option value="meat">Meat</option>
                <option value="dairy">Dairy</option>
                <option value="beverage">Beverage</option>
                <option value="spice">Spice</option>
                <option value="grain">Grain</option>
                <option value="dryfood">Dryfood</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={loading}
              >
                <option value="">Select Unit</option>
                <option value="kg">Kilogram (kg)</option>
                <option value="g">Gram (g)</option>
                <option value="l">Liter (l)</option>
                <option value="ml">Milliliter (ml)</option>
                <option value="piece">Piece</option>
                <option value="pack">Pack</option>
                <option value="box">Box</option>
              </select>
            </div>

            {/* Current Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Stock
              </label>
              <input
                type="number"
                name="currentStock"
                value={formData.currentStock}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Minimum Stock Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Stock Level
              </label>
              <input
                type="number"
                name="minStockLevel"
                value={formData.minStockLevel}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Maximum Stock Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Stock Level
              </label>
              <input
                type="number"
                name="maxStockLevel"
                value={formData.maxStockLevel}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Price Per Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Per Unit (₹)
              </label>
              <input
                type="number"
                name="pricePerUnit"
                value={formData.pricePerUnit}
                onChange={handleChange}
                step="0.01"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Vendor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendor
              </label>
              <input
                type="text"
                name="vendor"
                value={formData.vendor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Batch Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Number
              </label>
              <input
                type="text"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
              />
            </div>
          </div>

          {/* Notes */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              disabled={loading}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Update Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditInventoryItem;
