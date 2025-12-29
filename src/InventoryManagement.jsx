import React, { useState, useEffect, useMemo } from "react";
import { Header, NavigationTabs, FilterDropdowns, StockOverviewTable, ItemDetailsPanel, VendorsTable, POTable, WastageTable } from "./components/inventory-management-components";
import AddStock from "./AddStock";
import EditInventoryItem from "./EditInventoryItem";
import {
  useGetInventoryItemsQuery,
  useCreateInventoryItemMutation,
  useUpdateInventoryItemMutation,
  useDeleteInventoryItemMutation,
  useGetVendorsQuery,
  useGetPurchaseOrdersQuery,
  useGetWastageQuery
} from "./features/inventory/inventoryApiSlice";

const InventoryManagement = () => {
  // State for managing the inventory data and UI interactions
  const [activeTab, setActiveTab] = useState("Stock Overview");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    status: "All Status",
  });
  const [error, setError] = useState("");

  // RTK Query Hooks
  const { data: inventoryQueryData, isLoading: inventoryLoading } = useGetInventoryItemsQuery(undefined, {
    skip: activeTab !== "Stock Overview"
  });
  const { data: vendorsQueryData, isLoading: vendorsLoading } = useGetVendorsQuery(undefined, {
    skip: activeTab !== "Vendors"
  });
  const { data: poQueryData, isLoading: poLoading } = useGetPurchaseOrdersQuery(undefined, {
    skip: activeTab !== "Purchase Orders"
  });
  const { data: wastageQueryData, isLoading: wastageLoading } = useGetWastageQuery(undefined, {
    skip: activeTab !== "Wastage & Adjustments"
  });

  const [createItemApi] = useCreateInventoryItemMutation();
  const [updateItemApi] = useUpdateInventoryItemMutation();
  const [deleteItemApi] = useDeleteInventoryItemMutation();

  // Get user role from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('userData');
      if (userData) {
        const parsed = JSON.parse(userData);
        setUserRole(parsed.role || '');
      }
    } catch (err) {
      console.error("Error getting user role:", err);
    }
  }, []);

  // Handle data transformation
  const inventoryData = useMemo(() => {
    let data = [];
    if (activeTab === "Stock Overview" && inventoryQueryData?.success) {
      data = inventoryQueryData.data.map((item) => ({
        id: item._id,
        name: item.name,
        category: item.category || 'other',
        displayCategory: item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : 'Other',
        currentStock: `${item.currentStock} ${item.unit}`,
        threshold: item.minStockLevel ? `${item.minStockLevel} ${item.unit}` : 'Not set',
        avgCost: item.pricePerUnit ? `₹${item.pricePerUnit}/${item.unit}` : '',
        status: item.currentStock <= 0 ? "Out of Stock" : (item.currentStock <= item.minStockLevel ? "Low Stock" : "In Stock"),
        unitPrice: item.pricePerUnit ? `₹${item.pricePerUnit}/${item.unit}` : '',
        recentTransactions: [],
        _id: item._id,
        unit: item.unit,
        currentStockNum: item.currentStock,
        minStockLevel: item.minStockLevel,
        maxStockLevel: item.maxStockLevel,
        pricePerUnit: item.pricePerUnit,
        vendor: item.vendor,
        expiryDate: item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A',
        batchNumber: item.batchNumber,
        location: item.location,
        notes: item.notes,
        restaurantId: item.restaurantId
      }));
    } else if (activeTab === "Vendors" && vendorsQueryData?.success) {
      data = vendorsQueryData.data;
    } else if (activeTab === "Purchase Orders" && poQueryData?.success) {
      data = poQueryData.data;
    } else if (activeTab === "Wastage & Adjustments" && wastageQueryData?.success) {
      data = wastageQueryData.data;
    }
    return data;
  }, [activeTab, inventoryQueryData, vendorsQueryData, poQueryData, wastageQueryData]);

  // Loading state mapping
  const loading = inventoryLoading || vendorsLoading || poLoading || wastageLoading;

  // Handle tab changes
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
    setSelectedItem(null);
  };

  // Handle item selection for details panel
  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  // Handle filter changes
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // Handle Add Stock button click
  const handleAddStockClick = () => {
    setIsAddStockOpen(true);
  };

  // Handle Add Stock popup close
  const handleAddStockClose = () => {
    setIsAddStockOpen(false);
  };

  // Handle Add Stock form submission
  const handleAddStockSubmit = async (stockData) => {
    try {
      // Transform frontend data to match backend API format
      const inventoryItemData = {
        name: stockData.inventoryItem,
        category: stockData.category && stockData.category !== 'category' ? stockData.category : 'other',
        unit: stockData.unit,
        currentStock: parseFloat(stockData.quantity) || 0,
        minStockLevel: 0,
        pricePerUnit: parseFloat(stockData.purchasePrice) || 0,
        vendor: stockData.vendor || undefined,
        batchNumber: stockData.batchNumber || undefined,
        expiryDate: stockData.expiryDate ? new Date(stockData.expiryDate) : undefined,
        notes: stockData.notes || undefined
      };

      await createItemApi(inventoryItemData).unwrap();
      setIsAddStockOpen(false);
    } catch (err) {
      console.error("Error adding inventory item:", err);
      setError(err.data?.message || err.message || "Failed to add inventory item");
      setIsAddStockOpen(false);
    }
  };

  // Handle Edit Item
  const handleEditItem = (item) => {
    setItemToEdit(item);
    setIsEditItemOpen(true);
  };

  // Handle Edit Item form submission
  const handleEditItemSubmit = async (itemId, updateData) => {
    try {
      await updateItemApi({ itemId, ...updateData }).unwrap();
    } catch (err) {
      console.error("Error updating inventory item:", err);
      setError(err.data?.message || err.message || "Failed to update inventory item");
    }
  };

  // Handle Delete Item
  const handleDeleteItem = async (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.name}?`)) {
      try {
        await deleteItemApi(item.id).unwrap();
      } catch (err) {
        console.error("Error deleting inventory item:", err);
        setError(err.data?.message || err.message || "Failed to delete inventory item");
      }
    }
  };

  // Filter data based on current filters
  const filteredData = activeTab === "Stock Overview" ? inventoryData.filter((item) => {
    // Match logic: filters.category is like "Vegetable", item.category is like "Vegetable"
    const categoryMatch =
      filters.category === "All Categories" ||
      item.category === filters.category;
    const statusMatch =
      filters.status === "All Status" || item.status === filters.status;

    return categoryMatch && statusMatch;
  }) : inventoryData;

  // Render content based on active tab
  const renderTabContent = () => {
    if (loading) return <div className="p-10 text-center">Loading {activeTab}...</div>;
    if (error) return <div className="p-10 text-center text-red-500">{error}</div>;

    switch (activeTab) {
      case "Stock Overview":
        return (
          <StockOverviewTable
            data={filteredData}
            onItemSelect={handleItemSelect}
            selectedItem={selectedItem}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
            userRole={userRole}
          />
        );
      case "Vendors":
        return <VendorsTable data={inventoryData} />;
      case "Purchase Orders":
        return <POTable data={inventoryData} />;
      case "Wastage & Adjustments":
        return <WastageTable data={inventoryData} />;
      default:
        return <div>Content for {activeTab} coming soon...</div>;
    }
  };

  return (
    <div className="min-h-screen w-[95%] mx-auto bg-gray-50 flex justify-center">
      <div className="w-[100%] overflow-y-auto pb-5 pt-10 scrollbar-hide">
        {/* Header Section with title, subtitle, and action buttons */}
        <Header onAddStockClick={handleAddStockClick} />

        {/* Main Content Area */}
        <div className="flex w-[100%] mx-auto gap-6 p-6 min-h-[calc(100vh-200px)] justify-center">
          <div className="flex-1 flex flex-col gap-6">
            {/* Navigation Tabs */}
            <NavigationTabs
              activeTab={activeTab}
              onTabChange={handleTabChange}
            />

            {/* Filter Dropdowns - Only show for Stock Overview */}
            {activeTab === "Stock Overview" && (
              <FilterDropdowns
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}

            {/* Dynamic Content based on active tab */}
            {renderTabContent()}
          </div>

          {/* Right Sidebar - Item Details Panel */}
          <div className="w-[380px] flex-shrink-0">
            <ItemDetailsPanel
              selectedItem={selectedItem}
              onClose={() => setSelectedItem(null)}
            />
          </div>
        </div>

        {/* Bottom Summary Cards
        <SummaryCards stats={summaryStats} /> */}
      </div>

      {/* Add Stock Popup */}
      <AddStock
        isOpen={isAddStockOpen}
        onClose={handleAddStockClose}
        onSubmit={handleAddStockSubmit}
      />

      {/* Edit Inventory Item Popup */}
      <EditInventoryItem
        isOpen={isEditItemOpen}
        onClose={() => {
          setIsEditItemOpen(false);
          setItemToEdit(null);
        }}
        onSubmit={handleEditItemSubmit}
        item={itemToEdit}
      />
    </div>
  );
};

export default InventoryManagement;
