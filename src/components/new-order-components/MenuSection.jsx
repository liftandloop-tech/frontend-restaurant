import React, { useState, useEffect } from "react";
import { getCategories, getMenuItems } from "../../utils/menu";

const MenuSection = ({ onAddToCart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catsRes, itemsRes] = await Promise.all([
          getCategories(),
          getMenuItems()
        ]);

        if (catsRes && catsRes.success) {
          setCategories(catsRes.data);
        }

        if (itemsRes && itemsRes.success) {
          setMenuItems(itemsRes.data);
        }
      } catch (err) {
        console.error("Failed to load menu data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter menu items based on search and category
  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));

    let matchesCategory = false;
    if (activeCategory === "All") {
      matchesCategory = true;
    } else {
      // Handle case where categoryId might be populated object or string ID
      const itemCatId = item.categoryId?._id || item.categoryId;
      matchesCategory = itemCatId === activeCategory;
    }

    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading menu...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Menu</h3>
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="text"
              placeholder="Q Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-80 text-base"
            />
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveCategory("All")}
          className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${activeCategory === "All"
            ? "bg-blue-600 text-white shadow-lg"
            : "bg-white text-gray-600 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
            }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => setActiveCategory(category._id)}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 whitespace-nowrap ${activeCategory === category._id
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-white text-gray-600 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {filteredMenu.length > 0 ? (
          filteredMenu.map((item) => (
            <div
              key={item._id}
              className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 hover:shadow-md transition-all duration-200 flex flex-col h-full"
            >
              <div className="flex flex-col items-center text-center flex-1">
                <img
                  src={item.image || "https://images.unsplash.com/photo-1551218808-94e220e084d2"}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 shadow-sm bg-gray-200"
                />
                <h4 className="font-semibold text-gray-900 mb-2 text-base">
                  {item.name}
                </h4>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
                <div className="mt-auto flex items-center justify-between w-full">
                  <span className="font-bold text-blue-600 text-[20px]">
                    ₹{item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="bg-blue-600 text-white rounded-xl px-[10px] py-[10px] hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-10 text-gray-500">
            No items found in this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuSection;
