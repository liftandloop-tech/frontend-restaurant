import React from 'react';

/**
 * Toggle switch component for item availability status
 */
const AvailabilityToggle = ({ isAvailable, onChange }) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">Availability</label>
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => onChange(!isAvailable)}
          className={`
            relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
            transition-colors ease-in-out duration-200 focus:outline-none
            ${isAvailable ? 'bg-green-500' : 'bg-gray-200'}
          `}
          role="switch"
          aria-checked={isAvailable}
        >
          <span className="sr-only">Toggle availability</span>
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 
              transition ease-in-out duration-200
              ${isAvailable ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
        <span className="ml-3 text-sm text-gray-700">
          {isAvailable ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  );
};

export default AvailabilityToggle;