import React from "react";

const TitleBar = ({ onAddTable, onDeleteTable }) => {
  return (
    <div className="w-full pr-[30px] flex items-start justify-between">
      <div>
        <h1 className="text-[22px] font-semibold">Restaurant Tables</h1>
        <p className="text-[12px] text-gray-500 mt-1">
          Interactive floor plan and table management
        </p>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onAddTable}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-blue-200 text-blue-600 bg-blue-50 text-[13px] hover:bg-blue-100 transition-colors"
        >
          <span className="w-4 h-4 grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </span>
          Add Table
        </button>
        <button
          type="button"
          onClick={onDeleteTable}
          className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-red-200 text-red-600 bg-red-50 text-[13px] hover:bg-red-100 transition-colors"
        >
          <span className="w-4 h-4 grid place-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M3 6h18M6 6l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
              <path d="M10 11v6M14 11v6" />
            </svg>
          </span>
          Delete Table
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
