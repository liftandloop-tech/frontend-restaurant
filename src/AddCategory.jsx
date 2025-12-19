import React, { useMemo, useState } from "react";

/**
 * AddCategory Component
 *
 * Modal popup for adding a new menu category. Mirrors the visual style
 * and layout of `AddMenu.jsx` so the experience stays consistent.
 *
 * Props:
 * - isOpen: boolean to control modal visibility
 * - onClose: function to close the modal
 * - onSubmit: function to receive the created category payload
 * - existingCategories: optional array of existing categories for the
 *   "Parent Category" dropdown. Each item can be a string or an object
 *   with `{ id, name }` fields.
 */
const AddCategory = ({
  isOpen,
  onClose,
  onSubmit,
  existingCategories = [],
}) => {
  // Form state for all fields displayed in the UI
  const [formData, setFormData] = useState({
    categoryName: "",
    categoryType: "",
    displayName: "",
    displayOrder: 1,
    parentCategory: "none",
    shortDescription: "",
  });

  // Derived, normalized list of categories for parent selection
  const normalizedCategories = useMemo(() => {
    return existingCategories
      .map((item) => {
        if (typeof item === "string") return { id: item, name: item };
        if (item && typeof item === "object")
          return {
            id: item.id ?? item.name,
            name: item.name ?? String(item.id),
          };
        return null;
      })
      .filter(Boolean);
  }, [existingCategories]);

  // Character limit for the short description textarea
  const DESCRIPTION_LIMIT = 150;

  // Generic input handler for text/number fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Protect description length
    if (name === "shortDescription" && value.length > DESCRIPTION_LIMIT) return;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "displayOrder" ? (value === "" ? "" : Number(value)) : value,
    }));
  };

  // Select change handler (categoryType, parentCategory)
  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submission with minimal validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation: Category Name is required
    if (!formData.categoryName.trim()) {
      alert("Please enter a Category Name");
      return;
    }

    // Build payload
    const payload = {
      name: formData.categoryName.trim(),
      type: formData.categoryType || null,
      displayName: formData.displayName.trim() || null,
      displayOrder: Number(formData.displayOrder) || 1,
      parentCategory:
        formData.parentCategory === "none" ? null : formData.parentCategory,
      shortDescription: formData.shortDescription.trim() || null,
    };

    if (onSubmit) {
      onSubmit(payload);
    } else {
      // Fallback: log and close if no handler is provided
      console.log("Submitting category:", payload);
      if (onClose) onClose();
    }

    // Reset form after submit
    setFormData({
      categoryName: "",
      categoryType: "",
      displayName: "",
      displayOrder: 1,
      parentCategory: "none",
      shortDescription: "",
    });
  };

  // Do not render the modal if it is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/20 bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[60%] h-[90vh] scrollbar-hide overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-medium text-gray-800">
              Add New Menu Category
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Organize your items under easy-to-navigate categories
            </p>
          </div>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
            aria-label="Close"
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
            {/* Category Information Card */}
            <div className="border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">
                  Category Information
                </h3>
              </div>

              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Category Name */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Category Name<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="categoryName"
                    value={formData.categoryName}
                    onChange={handleChange}
                    placeholder="e.g., Starters, Desserts, Main Course"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Category Type */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Category Type
                  </label>
                  <div className="relative">
                    <select
                      name="categoryType"
                      value={formData.categoryType}
                      onChange={handleSelectChange}
                      className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select category type</option>
                      <option value="regular">Regular</option>
                      <option value="featured">Featured</option>
                      <option value="seasonal">Seasonal</option>
                      <option value="hidden">Hidden</option>
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Display Name */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Display Name
                    <span className="text-gray-400 text-[10px] ml-1">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleChange}
                    placeholder="For printed menu/POS"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Display Order */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    name="displayOrder"
                    value={formData.displayOrder}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Parent Category */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Parent Category
                    <span className="text-gray-400 text-[10px] ml-1">
                      (Optional)
                    </span>
                  </label>
                  <div className="relative">
                    <select
                      name="parentCategory"
                      value={formData.parentCategory}
                      onChange={handleSelectChange}
                      className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="none">None - Top level category</option>
                      {normalizedCategories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description & Notes Card */}
            <div className="border border-gray-200 rounded-lg">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">
                  Description & Notes
                </h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-medium text-gray-700">
                    Short Description
                    <span className="text-gray-400 text-[10px] ml-1">
                      (Optional)
                    </span>
                  </label>
                  <span className="text-[10px] text-gray-400">
                    {formData.shortDescription.length}/{DESCRIPTION_LIMIT}
                  </span>
                </div>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="e.g., All-time favorites and appetizers to start your meal"
                  className="w-full min-h-[90px] px-3 py-2 border border-gray-300 rounded-md text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-[10px] text-gray-400 mt-1">
                  For internal use or printed menu display
                </p>
              </div>
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
              Save Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
