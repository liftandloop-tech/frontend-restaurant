import React, { useMemo, useState, useEffect } from "react";
// import "./MenuManagement.css"; // Removed manual CSS import
import Header from "./components/menu-management-components/Header";
import CategoriesList from "./components/menu-management-components/CategoriesList";
import MenuItemsList from "./components/menu-management-components/MenuItemsList";
import Pagination from "./components/menu-management-components/Pagination";
import AddMenu from "./AddMenu";
import AddCategory from "./AddCategory";
import {
  useGetCategoriesQuery,
  useGetMenuItemsQuery,
  useCreateCategoryMutation,
  useCreateMenuItemMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} from "./features/menu/menuApiSlice";

const MenuManagement = () => {
  const { data: categoriesResponse } = useGetCategoriesQuery();
  const { data: menuItemsResponse, isLoading: isMenuItemsLoading } = useGetMenuItemsQuery();

  const categories = categoriesResponse?.success ? categoriesResponse.data : [];
  const menuItems = menuItemsResponse?.success ? menuItemsResponse.data : [];
  const [createCategory] = useCreateCategoryMutation();
  const [createMenuItem] = useCreateMenuItemMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [activeCategory, setActiveCategory] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // UI state: grid/list, search, filters
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [showVeg, setShowVeg] = useState(false);
  const [showSpicy, setShowSpicy] = useState(false);
  const [stockFilter, setStockFilter] = useState("all");

  // Add Menu modal state
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  // Add Category modal state
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);

  // Set active category when data loads
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  const handleCategorySelect = (category) => {
    setActiveCategory(category);
  };

  const handleToggleCategoryStatus = async (id, currentStatus) => {
    try {
      await updateCategory({ categoryId: id, isActive: !currentStatus }).unwrap();
    } catch (err) {
      console.error("Error toggling category status:", err);
      alert("Failed to update category status");
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        if (activeCategory && activeCategory._id === id) {
          // Let the effect handle setting a new active category if needed, 
          // but we might want to manually switch to avoid flicker or null state if possible.
          // simpler to just null it and let effect pick first one
          setActiveCategory(null);
        }
      } catch (err) {
        console.error("Error deleting category:", err);
        alert("Failed to delete category");
      }
    }
  };

  const handleEditCategory = (category) => {
    // For now, prompt for rename as a simple edit implementation
    const newName = prompt("Enter new category name:", category.name);
    if (newName && newName !== category.name) {
      updateCategory({ categoryId: category._id, name: newName })
        .unwrap()
        .then(() => {
          if (activeCategory && activeCategory._id === category._id) {
            setActiveCategory({ ...activeCategory, name: newName });
          }
        })
        .catch(() => alert("Failed to update category"));
    }
  };

  // Add Category opens the category modal
  const handleAddCategory = () => {
    setIsAddCategoryOpen(true);
  };

  const handleAddItem = () => {
    setIsAddMenuOpen(true);
  };

  // Handle form submission from AddMenu component
  const handleMenuItemSubmit = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        categoryId: formData.category,
        isVeg: formData.foodType === "veg",
        isSpicy: false, // You might want to add this to the form
        isAvailable: formData.isAvailable,
        specialNotes: formData.specialNotes,
        // For photo, you'd typically upload to a CDN or handle multipart/form-data
        // For now we'll assume the URL or handle file upload separately
        image: "https://images.unsplash.com/photo-1551218808-94e220e084d2"
      };

      await createMenuItem(payload).unwrap();
      setIsAddMenuOpen(false);
    } catch (err) {
      console.error("Error creating menu item:", err);
      alert("Failed to create menu item");
    }
  };

  // Handle submission from AddCategory component
  const handleCategorySubmit = async (payload) => {
    try {
      await createCategory({
        name: payload.name,
        displayName: payload.displayName,
        description: payload.shortDescription,
        displayOrder: payload.displayOrder
      }).unwrap();

      setIsAddCategoryOpen(false);
    } catch (err) {
      console.error("Error creating category:", err);
      alert("Failed to create category");
    }
  };

  // Derived filtered list
  const filtered = useMemo(() => {
    if (!activeCategory) return [];

    return menuItems.filter((m) => {
      // Filter by active category
      const itemCatId = m.categoryId?._id || m.categoryId;
      if (itemCatId !== activeCategory._id) {
        return false;
      }

      const matchesSearch =
        !search ||
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        (m.description && m.description.toLowerCase().includes(search.toLowerCase()));
      const matchesVeg = !showVeg || m.isVeg;
      const matchesSpicy = !showSpicy || m.isSpicy;
      // status logic depends on your backend model 'isAvailable' boolean or 'status' string
      // Assuming backend uses boolean isAvailable:
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in" && m.isAvailable) ||
        (stockFilter === "out" && !m.isAvailable);

      return matchesSearch && matchesVeg && matchesSpicy && matchesStock;
    });
  }, [menuItems, search, showVeg, showSpicy, stockFilter, activeCategory]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const currentMenuItems = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isMenuItemsLoading && menuItems.length === 0) return <div className="flex justify-center pt-20">Loading menu...</div>;

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <Header onAddCategory={handleAddCategory} onAddItem={handleAddItem} />

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row gap-5 mt-8">
          {/* Categories Section */}
          <div className="lg:basis-1/4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">
              Categories
            </h2>
            <p className="text-gray-600 mb-5">Organize your menu structure</p>
            <CategoriesList
              categories={categories.map(c => ({
                id: c._id,
                _id: c._id,
                name: c.name,
                items: menuItems.filter(m => {
                  const mCatId = m.categoryId?._id || m.categoryId;
                  return mCatId === c._id;
                }).length,
                isActive: c.isActive,
                isSelected: activeCategory && activeCategory._id === c._id
              }))}
              activeCategory={activeCategory}
              setActiveCategory={handleCategorySelect}
              onToggleStatus={handleToggleCategoryStatus}
              onDelete={handleDeleteCategory}
              onEdit={handleEditCategory}
            />

          </div>

          {/* Menu Items Section */}
          <div className="lg:basis-3/4 bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            {activeCategory ? (
              <>
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {activeCategory.name}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {filtered.length} items found
                    </p>
                  </div>

                  {/* Controls: search + filters + view toggle */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <div className="flex items-center gap-2 h-10 pl-3 pr-2 rounded-md border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-blue-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-4 h-4 text-gray-500"
                      >
                        <circle cx="11" cy="11" r="7"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                      <input
                        value={search}
                        onChange={(e) => {
                          setCurrentPage(1);
                          setSearch(e.target.value);
                        }}
                        className="w-[220px] bg-transparent text-[13px] placeholder:text-gray-400 focus:outline-none"
                        placeholder="Search items..."
                        type="text"
                      />
                    </div>

                    <label className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={showVeg}
                        onChange={(e) => {
                          setCurrentPage(1);
                          setShowVeg(e.target.checked);
                        }}
                      />
                      Veg
                    </label>

                    <label className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                      <input
                        type="checkbox"
                        checked={showSpicy}
                        onChange={(e) => {
                          setCurrentPage(1);
                          setShowSpicy(e.target.checked);
                        }}
                      />
                      Spicy
                    </label>

                    <select
                      value={stockFilter}
                      onChange={(e) => {
                        setCurrentPage(1);
                        setStockFilter(e.target.value);
                      }}
                      className="h-10 text-sm border border-gray-300 rounded-md px-2 bg-white hover:border-gray-400"
                    >
                      <option value="all">All Stock</option>
                      <option value="in">In Stock</option>
                      <option value="out">Out of Stock</option>
                    </select>

                    <div className="ml-2 inline-flex rounded-md border border-gray-300 overflow-hidden">
                      <button
                        onClick={() => setView("grid")}
                        className={`px-3 py-2 text-sm ${view === "grid"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-white text-gray-700"
                          }`}
                      >
                        Grid
                      </button>
                      <button
                        onClick={() => setView("list")}
                        className={`px-3 py-2 text-sm ${view === "list"
                          ? "bg-blue-50 text-blue-600"
                          : "bg-white text-gray-700"
                          }`}
                      >
                        List
                      </button>
                    </div>
                  </div>
                </div>

                {/* Items */}
                {view === "grid" ? (
                  <MenuItemsList menuItems={currentMenuItems} />
                ) : (
                  <div className="flex flex-col gap-3 mt-5">
                    {currentMenuItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex gap-4 items-start p-3 border border-gray-100 rounded-lg shadow-sm"
                      >
                        <img
                          src={item.image || "https://images.unsplash.com/photo-1551218808-94e220e084d2"}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="text-[15px] font-semibold text-gray-900">
                              {item.name}
                            </h3>
                            <span className="inline-flex items-center justify-center px-2 py-1 rounded-md text-[13px] font-semibold text-blue-700 bg-blue-50">
                              ₹{item.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-[13px] text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Select a category or add a new one to get started.</p>
                {categories.length === 0 && (
                  <button
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={handleAddCategory}
                  >
                    Create First Category
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Menu Modal */}
      <AddMenu
        isOpen={isAddMenuOpen}
        onClose={() => setIsAddMenuOpen(false)}
        onSubmit={handleMenuItemSubmit}
        categories={categories} // Pass categories to dropdown
      />

      {/* Add Category Modal */}
      <AddCategory
        isOpen={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
        onSubmit={handleCategorySubmit}
        existingCategories={categories}
      />
    </div>
  );
};

export default MenuManagement;
