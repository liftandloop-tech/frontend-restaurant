import React from "react";
import PropTypes from "prop-types";
import { Plus } from "lucide-react";
import { VegIcon, NonVegIcon } from "./FoodTypeIcons";

const MenuItem = ({ item, onAddToOrder }) => {
  const { name, description, price, type } = item;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          {type === "veg" ? <VegIcon /> : <NonVegIcon />}
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-lg text-gray-900">
          ${price.toFixed(2)}
        </span>
        <button
          onClick={() => onAddToOrder(item)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus size={16} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    type: PropTypes.oneOf(["veg", "non-veg"]).isRequired,
  }).isRequired,
  onAddToOrder: PropTypes.func.isRequired,
};

export default MenuItem;
