import React from 'react';

/**
 * Component for selecting food type (Veg/Non-Veg)
 * Uses radio buttons with custom styling
 */
const FoodTypeSelector = ({ selectedType, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Food Type</label>
      <div className="flex space-x-4 mt-1">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="hidden"
            name="foodType"
            value="veg"
            checked={selectedType === 'veg'}
            onChange={() => onChange('veg')}
          />
          <span className={`flex items-center justify-center w-5 h-5 rounded-full border ${
            selectedType === 'veg' 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300'
          }`}>
            {selectedType === 'veg' && (
              <span className="w-2 h-2 rounded-full bg-white"></span>
            )}
          </span>
          <span className="ml-2 text-sm text-gray-700">Veg</span>
        </label>
        
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="hidden"
            name="foodType"
            value="non-veg"
            checked={selectedType === 'non-veg'}
            onChange={() => onChange('non-veg')}
          />
          <span className={`flex items-center justify-center w-5 h-5 rounded-full border ${
            selectedType === 'non-veg' 
              ? 'bg-red-500 border-red-500' 
              : 'border-gray-300'
          }`}>
            {selectedType === 'non-veg' && (
              <span className="w-2 h-2 rounded-full bg-white"></span>
            )}
          </span>
          <span className="ml-2 text-sm text-gray-700">Non-Veg</span>
        </label>
      </div>
    </div>
  );
};

export default FoodTypeSelector;