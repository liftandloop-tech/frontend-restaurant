import React from "react";
import PropTypes from "prop-types";

const Footer = ({ orderItems, selectedStations = [], onStationToggle }) => {
  // Calculate the total number of items by summing their quantities.
  const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

  const stations = [
    { id: "kitchen", label: "Kitchen" },
    { id: "bar", label: "Bar" },
    { id: "beverage", label: "Beverage" },
  ];

  return (
    <footer className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
      <div>
        <span className="text-sm text-gray-600">
          {totalItems} {totalItems === 1 ? "Item" : "Items"}
        </span>
        <span className="mx-2 text-gray-300">•</span>
        <span className="text-sm text-gray-600">Est. prep time 15m</span>
      </div>
      <div className="flex items-center gap-4">
        {stations.map((station) => {
          const isSelected = selectedStations.includes(station.id);
          return (
            <button
              key={station.id}
              type="button"
              onClick={() => onStationToggle && onStationToggle(station.id)}
              className={`text-sm font-semibold px-3 py-1 rounded-full transition-colors ${
                isSelected
                  ? "text-blue-600 bg-blue-100 border-2 border-blue-300"
                  : "text-gray-600 bg-gray-200 border-2 border-transparent"
              }`}
            >
              {station.label}
            </button>
          );
        })}
      </div>
    </footer>
  );
};

Footer.propTypes = {
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedStations: PropTypes.arrayOf(PropTypes.string),
  onStationToggle: PropTypes.func,
};

export default Footer;
