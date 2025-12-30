import React from "react";

/**
 * StockOverviewTable component for displaying inventory items in a table format
 * @param {array} data - Array of inventory items
 * @param {function} onItemSelect - Function to handle item selection
 * @param {object} selectedItem - Currently selected item
 * @param {function} onEdit - Function to handle item editing
 * @param {function} onDelete - Function to handle item deletion
 * @param {string} userRole - Current user role for access control
 */
const StockOverviewTable = ({ data, onItemSelect, selectedItem, onEdit, onDelete, userRole }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Stock Overview
        </h2>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>{data.length} items</span>
          <a href="#" className="text-blue-600 font-medium hover:underline">
            See All Items
          </a>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto relative">
        <table className="w-full min-w-[900px]">
          {/* Table Header Row */}
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Item
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Current Stock
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Threshold
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Avg Cost
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b border-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className={`border-b border-gray-100 cursor-pointer transition-colors hover:bg-gray-50 ${selectedItem?.id === item.id ? "bg-blue-50" : ""
                  }`}
                onClick={() => onItemSelect(item)}
              >
                {/* Item Column */}
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <div className="font-medium text-gray-900 text-sm">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-500">{item.displayCategory}</div>
                  </div>
                </td>

                {/* Current Stock Column */}
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900 text-sm">
                    {item.currentStock}
                  </div>
                </td>

                {/* Threshold Column */}
                <td className="px-6 py-4">
                  <div className="text-gray-600 text-sm">
                    {item.threshold}
                  </div>
                </td>

                {/* Average Cost Column */}
                <td className="px-6 py-4">
                  <div className="text-gray-900 text-sm">
                    {item.avgCost || "-"}
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${item.status === "In Stock"
                      ? "bg-green-100 text-green-800"
                      : item.status === "Low Stock"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                      }`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions Column */}
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    {(userRole === 'Owner' || userRole === 'Manager' || userRole === 'Admin') && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onEdit && onEdit(item);
                          }}
                          className="px-3 py-1.5 border border-blue-500 rounded-lg bg-blue-500 text-white text-xs hover:bg-blue-600 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Are you sure you want to delete "${item.name}"? This action cannot be undone.`)) {
                              onDelete && onDelete(item);
                            }
                          }}
                          className="px-3 py-1.5 border border-red-500 rounded-lg bg-red-500 text-white text-xs hover:bg-red-600 transition-all"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {/* <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onItemSelect(item);
                      }}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg bg-white text-gray-700 text-xs hover:bg-gray-50 hover:border-gray-400 transition-all"
                    >
                      View
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockOverviewTable;
