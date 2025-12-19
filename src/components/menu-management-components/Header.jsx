import React from "react";
// import '../MenuManagement.css'; // Removed manual CSS import

const Header = ({ onAddCategory, onAddItem }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-3">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Menu Management
        </h1>
        <p className="text-gray-600 mt-1">
          Organize your menu categories and items
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onAddCategory}
          className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-md text-[13px] cursor-pointer font-medium inline-flex items-center gap-2 shadow-sm hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99]"
        >
          <span className="text-gray-600">+</span> Add Category
        </button>
        <button
          onClick={onAddItem}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-[13px] cursor-pointer font-medium inline-flex items-center gap-2 shadow-sm hover:bg-blue-700 active:scale-[0.99]"
        >
          <span className="text-white">+</span> Add Item
        </button>
      </div>
    </div>
  );
};

export default Header;
