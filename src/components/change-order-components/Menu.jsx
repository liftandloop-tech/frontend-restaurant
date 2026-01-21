import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Search } from "lucide-react";
import MenuItem from "./MenuItem";
import { useGetCategoriesQuery, useGetMenuItemsQuery } from "../../features/menu/menuApiSlice";

const Menu = ({ onAddToOrder }) => {
  // RTK Query hooks
  const { data: categoriesResponse, isLoading: isCategoriesLoading } = useGetCategoriesQuery();
  const { data: menuItemsResponse, isLoading: isMenuItemsLoading } = useGetMenuItemsQuery();

  const categories = categoriesResponse?.success ? categoriesResponse.data : [];
  const menuItems = menuItemsResponse?.success ? menuItemsResponse.data : [];

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showVeg, setShowVeg] = useState(false);
  const [showSpicy, setShowSpicy] = useState(false);
  const [stockFilter, setStockFilter] = useState("all");

  // Filter logic similar to MenuManagement
  const filteredMenu = useMemo(() => {
    return menuItems.filter((item) => {
      // 1. Category Filter
      if (activeCategory !== "All") {
        const itemCatId = item.categoryId?._id || item.categoryId;
        if (itemCatId !== activeCategory) return false;
      }

      // 2. Search Filter
      const matchesSearch =
        !searchTerm ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      if (!matchesSearch) return false;

      // 3. Veg Filter
      if (showVeg && !item.isVeg) return false;

      // 4. Spicy Filter
      if (showSpicy && !item.isSpicy) return false;

      // 5. Stock Filter
      if (stockFilter === "in" && !item.isAvailable) return false;
      if (stockFilter === "out" && item.isAvailable) return false;

      return true;
    });
  }, [menuItems, activeCategory, searchTerm, showVeg, showSpicy, stockFilter]);

  if (isCategoriesLoading || isMenuItemsLoading) {
    return <div className="p-8 text-center text-gray-500">Loading menu...</div>;
  }

  return (
    <div>
      {/* Search and Filters */}
      <div className="relative mb-4 space-y-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Type Filters */}
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={showVeg}
              onChange={(e) => setShowVeg(e.target.checked)}
              className="rounded text-green-600 focus:ring-green-500 w-4 h-4"
            />
            <span className={showVeg ? "font-medium text-green-700" : ""}>Veg</span>
          </label>

          <label className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 cursor-pointer hover:bg-gray-100">
            <input
              type="checkbox"
              checked={showSpicy}
              onChange={(e) => setShowSpicy(e.target.checked)}
              className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
            />
            <span className={showSpicy ? "font-medium text-red-700" : ""}>Spicy</span>
          </label>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="text-sm border border-gray-300 rounded px-2 py-1 bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-100 mb-6 overflow-x-auto">
        <nav className="-mb-px flex space-x-6 pb-1" aria-label="Tabs">
          <button
            onClick={() => setActiveCategory("All")}
            className={`${activeCategory === "All"
              ? "border-blue-500 text-blue-600"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
          >
            All Items
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => setActiveCategory(cat._id)}
              className={`${activeCategory === cat._id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm`}
            >
              {cat.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <MenuItem key={item._id} item={item} onAddToOrder={onAddToOrder} />
          ))
        ) : (
          <div className="col-span-full py-10 text-center text-gray-400">
            No items found matching filters.
          </div>
        )}
      </div>
    </div>
  );
};

Menu.propTypes = {
  onAddToOrder: PropTypes.func.isRequired,
};

export default Menu;
