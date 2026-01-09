import React from "react";

/**
 * NavigationTabs component for switching between different inventory views
 * @param {string} activeTab - Currently active tab
 * @param {function} onTabChange - Function to handle tab changes
 */
const NavigationTabs = ({ activeTab, onTabChange }) => {
  // Define the navigation tabs
  const tabs = [
    "Stock Overview",
   // "Vendors",
   // "Purchase Orders",
   // "Wastage & Adjustments",
  ];

  return (
    <div className="flex border-b border-gray-200 mb-0">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-6 py-3 text-base font-medium border-b-2 transition-all ${
            activeTab === tab
              ? "text-blue-600 border-blue-600 font-semibold"
              : "text-gray-500 border-transparent hover:text-gray-700"
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
