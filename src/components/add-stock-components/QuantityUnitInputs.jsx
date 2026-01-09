import React from "react";

/**
 * QuantityUnitInputs Component
 *
 * Component for quantity and unit input fields displayed side by side
 * Matches the layout shown in the Add Stock modal image
 */
const QuantityUnitInputs = ({
  quantityValue,
  unitValue,
  onQuantityChange,
  onUnitChange,
  quantityRequired = true,
}) => {
  // Common units for inventory items
  // Common units for inventory items
  const units = [
    "kg",
    "g",
    "l",
    "ml",
    "piece",
    "pack",
    "box"
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Quantity Field */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">
          Quantity
          {quantityRequired && <span className="text-red-500">*</span>}
        </label>
        <input
          type="number"
          value={quantityValue}
          onChange={onQuantityChange}
          placeholder="0"
          min="0"
          step="0.01"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required={quantityRequired}
        />
      </div>

      {/* Unit Field */}
      <div className="flex flex-col space-y-1">
        <label className="text-sm font-medium text-gray-700">Unit</label>
        <div className="relative">
          <select
            value={unitValue}
            onChange={onUnitChange}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select unit</option>
            {units.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuantityUnitInputs;
