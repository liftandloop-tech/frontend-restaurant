import React from "react";
// import '../MenuManagement.css'; // Removed manual CSS import

const MenuItemCard = ({ item }) => {
  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="w-full h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-[15px] font-semibold text-gray-900 m-0">
            {item.name}
          </h3>
          <span className="inline-flex items-center justify-center px-2 py-1 rounded-md text-[13px] font-semibold text-blue-700 bg-blue-50">
            ₹{item.price.toFixed(2)}
          </span>
        </div>
        <p className="text-[13px] text-gray-600 m-0 line-clamp-2">
          {item.description}
        </p>
        <div className="flex gap-1.5">
          {item.isVeg && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-green-50 text-green-700 border border-green-100">
              Veg
            </span>
          )}
          {!item.isVeg && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-red-50 text-red-600 border border-red-100">
              Non-Veg
            </span>
          )}
          {item.isSpicy && (
            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-yellow-50 text-yellow-700 border border-yellow-100">
              Spicy
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-[13px] mt-1">
          <span className="text-gray-600">Status:</span>
          <span
            className={`font-semibold ${
              item.status === "In Stock" ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.status}
          </span>
          <label className="relative inline-block w-[34px] h-[18px] ml-auto">
            <input
              type="checkbox"
              className="opacity-0 w-0 h-0"
              checked={item.status === "In Stock"}
              onChange={() => {}} // Read-only display of status
              readOnly
            />
            <span className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 before:absolute before:content-[''] before:h-[14px] before:w-[14px] before:left-[2px] before:bottom-[2px] before:bg-white before:rounded-full before:shadow before:transition-all before:duration-300 ${
              item.status === "In Stock" 
                ? "bg-blue-500 before:translate-x-[16px]" 
                : "bg-gray-300"
            }`}></span>
          </label>
        </div>
        <div className="flex justify-end gap-2 mt-2">
          <button className="bg-transparent border border-gray-200 hover:border-blue-300 text-gray-600 hover:text-blue-600 px-2.5 py-1.5 rounded-md inline-flex items-center justify-center">
            <svg
              width="16"
              height="16"
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
          <button className="bg-transparent border border-gray-200 hover:border-red-300 text-gray-600 hover:text-red-600 px-2.5 py-1.5 rounded-md inline-flex items-center justify-center">
            <svg
              width="16"
              height="16"
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
    </div>
  );
};

export default MenuItemCard;
