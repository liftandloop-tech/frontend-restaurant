import React, { useState } from "react";
import {
  InventoryItemSelect,
  QuantityUnitInputs,
  PriceInput,
  VendorSelect,
  BatchExpiryInputs,
  NotesTextarea,
  AddAnotherButton,
} from "./components/add-stock-components";

/**
 * AddStock Component
 *
 * Modal popup for adding new stock items with the following features:
 * - Inventory item selection dropdown
 * - Quantity and unit input fields
 * - Purchase price per unit input
 * - Vendor selection dropdown
 * - Batch number and expiry date fields
 * - Notes textarea for additional information
 * - Add another item functionality
 * - Form validation and submission
 *
 * Props:
 * - isOpen: boolean to control modal visibility
 * - onClose: function to close the modal
 * - onSubmit: function to receive the stock data
 */
const AddStock = ({ isOpen, onClose, onSubmit }) => {
  // Form state for stock item data
  const [formData, setFormData] = useState({
    inventoryItem: "",
    category: "other",
    quantity: "",
    unit: "",
    purchasePrice: "",
    vendor: "",
    batchNumber: "",
    expiryDate: "",
    notes: "",
  });

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle inventory item selection
  const handleInventoryItemChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      inventoryItem: e.target.value,
    }));
  };

  // Handle quantity change
  const handleQuantityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      quantity: e.target.value,
    }));
  };

  // Handle unit change
  const handleUnitChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      unit: e.target.value,
    }));
  };

  // Handle purchase price change
  const handlePurchasePriceChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      purchasePrice: e.target.value,
    }));
  };

  // Handle vendor selection
  const handleVendorChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      vendor: e.target.value,
    }));
  };

  // Handle batch number change
  const handleBatchNumberChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      batchNumber: e.target.value,
    }));
  };

  // Handle expiry date change
  const handleExpiryDateChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      expiryDate: e.target.value,
    }));
  };

  // Handle notes change
  const handleNotesChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      notes: e.target.value,
    }));
  };

  // Handle add another item button click
  const handleAddAnotherItem = () => {
    // For now, just reset the form to add another item
    // In a real app, you might want to add the current item to a list
    // and keep the form open for the next item
    setFormData({
      inventoryItem: "",
      quantity: "",
      unit: "",
      purchasePrice: "",
      vendor: "",
      batchNumber: "",
      expiryDate: "",
      notes: "",
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation - check required fields
    if (!formData.inventoryItem || !formData.quantity) {
      alert("Please fill in all required fields (Inventory Item and Quantity)");
      return;
    }

    // Validate quantity is a positive number
    if (parseFloat(formData.quantity) <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    // Validate purchase price if provided
    if (formData.purchasePrice && parseFloat(formData.purchasePrice) < 0) {
      alert("Purchase price cannot be negative");
      return;
    }

    // Pass data to parent component if onSubmit prop exists
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Fallback if no onSubmit prop
      console.log("Submitting stock item:", formData);
      onClose();
    }

    // Reset form data after successful submission
    setFormData({
      inventoryItem: "",
      quantity: "",
      unit: "",
      purchasePrice: "",
      vendor: "",
      batchNumber: "",
      expiryDate: "",
      notes: "",
    });
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  // Category options for dropdown  //new
  const categoryOptions = [
    { value: "vegetable", label: "Vegetable" },
    { value: "fruit", label: "Fruit" },
    { value: "meat", label: "Meat" },
    { value: "dairy", label: "Dairy" },
    { value: "beverage", label: "Beverage" },
    { value: "spice", label: "Spice" },
    { value: "grain", label: "Grain" },
    { value: "dryfood", label: "Dryfood" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/20 bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[60%] h-[90vh] scrollbar-hide overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Add Stock</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
            {/* Inventory Item Selection */}
            <InventoryItemSelect
              value={formData.inventoryItem}
              onChange={handleInventoryItemChange}
              required={true}
            />

            {/* Category Selection */} {/*new */}

            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Category
                <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity and Unit Fields */}
            <QuantityUnitInputs
              quantityValue={formData.quantity}
              unitValue={formData.unit}
              onQuantityChange={handleQuantityChange}
              onUnitChange={handleUnitChange}
              quantityRequired={true}
            />

            {/* Purchase Price Field */}
            <PriceInput
              value={formData.purchasePrice}
              onChange={handlePurchasePriceChange}
              required={false}
            />

            {/* Vendor Selection */}
            <VendorSelect
              value={formData.vendor}
              onChange={handleVendorChange}
              required={false}
            />

            {/* Batch Number and Expiry Date Fields */}
            <BatchExpiryInputs
              batchValue={formData.batchNumber}
              expiryValue={formData.expiryDate}
              onBatchChange={handleBatchNumberChange}
              onExpiryChange={handleExpiryDateChange}
            />

            {/* Notes Field */}
            <NotesTextarea
              value={formData.notes}
              onChange={handleNotesChange}
              required={false}
            />

            {/* Add Another Item Button */}
            <div className="pt-2">
              <AddAnotherButton onClick={handleAddAnotherItem} />
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-lg">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
            >
              Save & Update Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
