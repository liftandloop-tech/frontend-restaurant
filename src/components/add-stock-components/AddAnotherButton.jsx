import React from "react";

/**
 * AddAnotherButton Component
 *
 * Button component for adding another item to the stock form
 * Matches the styling shown in the Add Stock modal image with blue plus icon
 */
const AddAnotherButton = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      Add Another Item
    </button>
  );
};

export default AddAnotherButton;
