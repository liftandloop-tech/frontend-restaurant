import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import MenuItem from "./MenuItem";
import { menuItemsData } from "./menuData";

const Menu = ({ onAddToOrder }) => {
  const [activeTab, setActiveTab] = useState("starters");

  const tabs = ["Starters", "Mains", "Desserts", "Drinks"];

  return (
    <div>
      <div className="relative mb-6">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search menu items..."
          className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={`${
                activeTab === tab.toLowerCase()
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {menuItemsData[activeTab].map((item) => (
          <MenuItem key={item.name} item={item} onAddToOrder={onAddToOrder} />
        ))}
      </div>
    </div>
  );
};

Menu.propTypes = {
  onAddToOrder: PropTypes.func.isRequired,
};

export default Menu;
