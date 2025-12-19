import React from "react";

/**
 * InventoryItemSelect Component
 *
 * text inpute component for entiring inventory itme  name
 * Alowes user to add new itme or refference existing once
 */
const InventoryItemSelect = ({ value, onChange, required = true }) => {
  
  
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">
        Inventory Item name
        {required && <span className="text-red-500">*</span>}
      </label>
  
  < input
type="text"
 value ={value}
 onChange ={onChange}
 placeholder="Enter item name(e.g organice tomatoes)"
 className="w-full px-3 py-2 boreder border-gray-300 rounded-md
  text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
 required={required}
 />

<p className="text-xs text-gray-500">
 Enter the name of the inventory item you want to add or update stock for.
</p>
</div>
 
  );
};

export default InventoryItemSelect;
