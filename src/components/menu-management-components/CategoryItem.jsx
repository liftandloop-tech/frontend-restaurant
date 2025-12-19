import React from "react";
// import '../MenuManagement.css'; // Removed manual CSS import

const CategoryItem = ({
  category,
  isSelected,
  isActive,
  setActiveCategory,
  onToggleStatus,
  onDelete,
  onEdit,
}) => {
  return (
    <div
      className={`flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg cursor-pointer transition-all duration-200 hover:border-gray-300 ${isSelected ? "ring-1 ring-blue-200 bg-blue-50 border-blue-200" : ""
        }`}
      onClick={() => setActiveCategory(category)}
    >
      <div className="flex flex-col">
        <span className="font-bold text-base text-gray-800">
          {category.name}
        </span>
        <span className="text-xs text-gray-600">{category.items} items</span>
      </div>
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <label className="relative inline-block w-10 h-5" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={!!isActive}
            onChange={(e) => {
              e.stopPropagation();
              onToggleStatus(category._id || category.id, !!isActive);
            }}
          />
          <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-300 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-4 before:w-4 before:left-0.5 before:bottom-0.5 before:bg-white before:rounded-full before:shadow before:transition-all before:duration-300 checked:bg-blue-500 checked:before:translate-x-5"></span>
        </label>
        <button
          className="bg-transparent border border-gray-200 rounded-md cursor-pointer p-1.5 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-200"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(category);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
          </svg>
        </button>
        <button
          className="bg-transparent border border-gray-200 rounded-md cursor-pointer p-1.5 flex items-center justify-center text-gray-600 hover:text-red-600 hover:border-red-200"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category._id || category.id);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryItem;
