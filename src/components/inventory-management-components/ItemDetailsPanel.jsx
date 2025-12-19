import React, { useState } from "react";

/**
 * ItemDetailsPanel component for displaying detailed information about selected items
 * @param {object} selectedItem - The currently selected item
 * @param {function} onClose - Function to close the panel
 */
const ItemDetailsPanel = ({ selectedItem, onClose }) => {
  const [activePanelTab, setActivePanelTab] = useState("Overview");

  // If no item is selected, don't render the panel
  if (!selectedItem) {
    return null;
  }

  // Get the appropriate icon for the item category
  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case "vegetables":
        return "🌱";
      case "meat":
        return "🥩";
      case "dairy":
        return "🥛";
      case "condiments":
        return "🫒";
      case "grains":
        return "🌾";
      default:
        return "📦";
    }
  };

  // Panel tabs for different views
  const panelTabs = ["Overview", "Transactions", "Items"];

  return (
    <div className="bg-white rounded-xl shadow-sm h-fit sticky top-6">
      {/* Panel Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
        <button
          className="text-gray-500 hover:text-gray-700 p-1.5 rounded hover:bg-gray-100 transition-colors text-base"
          onClick={onClose}
        >
          ✕
        </button>
      </div>

      {/* Panel Content */}
      <div className="p-6">
        {/* Item Information */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
              selectedItem.category.toLowerCase() === "vegetables"
                ? "bg-green-100 text-green-700"
                : selectedItem.category.toLowerCase() === "meat"
                ? "bg-red-100 text-red-700"
                : selectedItem.category.toLowerCase() === "dairy"
                ? "bg-blue-100 text-blue-700"
                : selectedItem.category.toLowerCase() === "condiments"
                ? "bg-yellow-100 text-yellow-700"
                : selectedItem.category.toLowerCase() === "grains"
                ? "bg-purple-100 text-purple-700"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {getCategoryIcon(selectedItem.category)}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900">
              {selectedItem.name}
            </h4>
            <p className="text-sm text-gray-500">{selectedItem.category}</p>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium">
              Current Stock
            </span>
            <span className="text-sm text-gray-900 font-medium">
              {selectedItem.currentStock}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium">Threshold</span>
            <span className="text-sm text-gray-900 font-medium">
              {selectedItem.threshold}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium">
              Unit Price
            </span>
            <span className="text-sm text-blue-600 font-semibold">
              {selectedItem.unitPrice}
            </span>
          </div>
        </div>

        {/* Panel Navigation Tabs */}
        <div className="flex justify-between border-b border-gray-200 mb-4">
          {panelTabs.map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-all ${
                activePanelTab === tab
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:text-gray-700"
              }`}
              onClick={() => setActivePanelTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Recent Transactions Section */}
        {activePanelTab === "Overview" && (
          <div className="mb-6">
            <h4 className="text-base font-semibold text-gray-900 mb-4">
              Recent Transactions
            </h4>
            {selectedItem.recentTransactions?.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-b-0"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                    transaction.icon === "green"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {transaction.icon === "green" ? "+" : "-"}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-700">{transaction.type}</p>
                  <p
                    className={`text-xs font-medium ${
                      transaction.icon === "green"
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {transaction.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Other tab content would go here */}
        {activePanelTab === "Transactions" && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Transaction history would be displayed here.
            </p>
          </div>
        )}

        {activePanelTab === "Menu Items" && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Related menu items would be displayed here.
            </p>
          </div>
        )}

        {activePanelTab === "Vendors" && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              Vendor information would be displayed here.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
            Adjust Stock
          </button>
          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors">
            Edit Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailsPanel;
