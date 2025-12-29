import React, { useState } from 'react';
import ItemPhotoUpload from './components/add-menu-components/ItemPhotoUpload';
import FormInput from './components/add-menu-components/FormInput';
import CategorySelect from './components/add-menu-components/CategorySelect';
import FoodTypeSelector from './components/add-menu-components/FoodTypeSelector';
import AvailabilityToggle from './components/add-menu-components/AvailabilityToggle';

/**
 * AddMenu Component
 * 
 * Modal popup for adding new menu items with the following features:
 * - Item photo upload with drag and drop
 * - Form fields for item details (name, description, price)
 * - Category selection dropdown
 * - Food type selection (Veg/Non-Veg)
 * - Availability toggle
 * - Special notes/instructions field
 */
const AddMenu = ({ isOpen, onClose, onSubmit, categories = [] }) => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: categories.length > 0 ? categories[0]._id : '',
    foodType: 'veg', // Default to veg
    isAvailable: true, // Default to in stock
    specialNotes: '',
    photo: null
  });

  // Update default category when categories load
  React.useEffect(() => {
    if (categories.length > 0 && !formData.category) {
      setFormData(prev => ({ ...prev, category: categories[0]._id }));
    }
  }, [categories, formData.category]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle specific field changes
  const handleFoodTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      foodType: type
    }));
  };

  const handleAvailabilityChange = (isAvailable) => {
    setFormData(prev => ({
      ...prev,
      isAvailable
    }));
  };

  const handleCategoryChange = (e) => {
    setFormData(prev => ({
      ...prev,
      category: e.target.value
    }));
  };

  const handleImageUpload = (file) => {
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation
    if (!formData.name || !formData.price || !formData.category) {
      alert('Please fill in all required fields including category');
      return;
    }

    // Pass data to parent component if onSubmit prop exists
    if (onSubmit) {
      onSubmit(formData);
    } else {
      // Fallback if no onSubmit prop
      console.log('Submitting menu item:', formData);
      onClose();
    }

    // Reset form data
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories.length > 0 ? categories[0]._id : '',
      foodType: 'veg',
      isAvailable: true,
      specialNotes: '',
      photo: null
    });
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/20 bg-opacity-50 backdrop-blur-lg z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[60%] h-[90vh] scrollbar-hide overflow-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Add New Item to Menu</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onClose}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <ItemPhotoUpload onImageUpload={handleImageUpload} />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <FormInput
                label="Item Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />

              <FormInput
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the item (optional)"
                isTextarea
              />

              <FormInput
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                required
              />

              <CategorySelect
                value={formData.category}
                onChange={handleCategoryChange}
                categories={categories}
              />
            </div>

            {/* Full Width Fields */}
            <div className="col-span-1 md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              <FoodTypeSelector
                selectedType={formData.foodType}
                onChange={handleFoodTypeChange}
              />

              <AvailabilityToggle
                isAvailable={formData.isAvailable}
                onChange={handleAvailabilityChange}
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <FormInput
                label="Special Notes"
                name="specialNotes"
                value={formData.specialNotes}
                onChange={handleChange}
                placeholder="Any special instructions or notes (optional)"
                isTextarea
              />
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
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add to Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;