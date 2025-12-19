import React, { useState, useEffect } from "react";
import { Header,NavigationTabs,FilterDropdowns,StockOverviewTable,ItemDetailsPanel,} from "./components/inventory-management-components";
import AddStock from "./AddStock";
import EditInventoryItem from "./EditInventoryItem";
import { getInventoryItems, createInventoryItem, updateInventoryItem, deleteInventoryItem } from "./utils/inventory";

const InventoryManagement = () => {
  // State for managing the inventory data and UI interactions
  const [activeTab, setActiveTab] = useState("Stock Overview");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddStockOpen, setIsAddStockOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const [filters, setFilters] = useState({
    category: "All Categories",
    status: "All Status",
  });

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

  // Fetch inventory data from backend
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getInventoryItems();
        if (response.success && response.data) {
          // Transform backend data to match frontend format
          const transformedData = response.data.map((item) => ({
            id: item._id,
            name: item.name,
            category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
            currentStock: `${item.currentStock} ${item.unit}`,
            threshold: item.minStockLevel ? `${item.minStockLevel} ${item.unit}` : 'Not set',
            avgCost: item.pricePerUnit ? `$${item.pricePerUnit}/${item.unit}` : '',
            status: item.currentStock <= item.minStockLevel ? "Low Stock" : "In Stock",
            unitPrice: item.pricePerUnit ? `$${item.pricePerUnit}/${item.unit}` : '',
            recentTransactions: [], // Could be populated from a separate transactions API
            // Keep original backend data for editing
            _id: item._id,
            category: item.category,
            unit: item.unit,
            currentStock: item.currentStock,
            minStockLevel: item.minStockLevel,
            maxStockLevel: item.maxStockLevel,
            pricePerUnit: item.pricePerUnit,
            vendor: item.vendor,
            expiryDate: item.expiryDate,
            batchNumber: item.batchNumber,
            location: item.location,
            notes: item.notes,
            restaurantId: item.restaurantId
          }));
          setInventoryData(transformedData);
        } else {
          setError("Failed to load inventory data");
        }
      } catch (err) {
        console.error("Error fetching inventory:", err);
        setError(err.message || "Failed to load inventory data");
        // Use sample data as fallback
        setInventoryData(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  // Sample data as fallback
  const sampleData = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      currentStock: "45 kg",
      threshold: "20 kg",
      avgCost: "",
      status: "In Stock",
      unitPrice: "$3.50/kg",
      recentTransactions: [
        { type: "Stock Added", amount: "+25 kg", icon: "green" },
        { type: "Usage", amount: "-15 kg", icon: "red" },
      ],
    },
    {
      id: 2,
      name: "Premium Beef",
      category: "Meat",
      currentStock: "8 kg",
      threshold: "15 kg",
      avgCost: "$12.80/kg",
      status: "Low Stock",
      unitPrice: "$15.20/kg",
      recentTransactions: [
        { type: "Stock Added", amount: "+10 kg", icon: "green" },
        { type: "Usage", amount: "-5 kg", icon: "red" },
      ],
    },
    {
      id: 3,
      name: "Fresh Milk",
      category: "Dairy",
      currentStock: "0 L",
      threshold: "50 L",
      avgCost: "$1.20/L",
      status: "Out of Stock",
      unitPrice: "$1.50/L",
      recentTransactions: [{ type: "Usage", amount: "-20 L", icon: "red" }],
    },
    {
      id: 4,
      name: "Olive Oil",
      category: "Condiments",
      currentStock: "12 bottles",
      threshold: "5 bottles",
      avgCost: "$8.50/bottle",
      status: "In Stock",
      unitPrice: "$9.00/bottle",
      recentTransactions: [
        { type: "Stock Added", amount: "+8 bottles", icon: "green" },
        { type: "Usage", amount: "-3 bottles", icon: "red" },
      ],
    },
    {
      id: 5,
      name: "Basmati Rice",
      category: "Grains",
      currentStock: "25 kg",
      threshold: "30 kg",
      avgCost: "$2.20/kg",
      status: "Low Stock",
      unitPrice: "$2.50/kg",
      recentTransactions: [
        { type: "Stock Added", amount: "+15 kg", icon: "green" },
        { type: "Usage", amount: "-10 kg", icon: "red" },
      ],
    },
  ];

  // Summary statistics
  const summaryStats = {
    totalItems: 247,
    lowStock: 12,
    outOfStock: 3,
  };

  // Handle tab changes
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
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
      console.log("Adding new inventory item:", stockData);
      console.log("Category value:", stockData.category);
      console.log("All form data keys:", Object.keys(stockData));

      // Transform frontend data to match backend API format
      const inventoryItemData = {
        name: stockData.inventoryItem,
        category: stockData.category && stockData.category !== 'category' ? stockData.category : 'other',
        unit: stockData.unit,
        currentStock: parseFloat(stockData.quantity) || 0,
        minStockLevel: 0, // Default minimum stock level
        pricePerUnit: parseFloat(stockData.purchasePrice) || 0,
        vendor: stockData.vendor || undefined,
        batchNumber: stockData.batchNumber || undefined,
        expiryDate: stockData.expiryDate ? new Date(stockData.expiryDate) : undefined,
        location: undefined, // Could be added to form later
        notes: stockData.notes || undefined
      };

      const response = await createInventoryItem(inventoryItemData);

      if (response.success) {
        console.log("Inventory item created successfully:", response.data);
        // Refresh inventory data
        await refreshInventoryData();
      } else {
        console.error("Failed to create inventory item:", response.message);
        setError(response.message || "Failed to add inventory item");
      }

      setIsAddStockOpen(false);
    } catch (error) {
      console.error("Error adding inventory item:", error);
      setError(error.message || "Failed to add inventory item");
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
      setError("");
      const response = await updateInventoryItem(itemId, updateData);

      if (response.success) {
        console.log("Inventory item updated successfully:", response.data);
        // Refresh inventory data
        await refreshInventoryData();
      } else {
        console.error("Failed to update inventory item:", response.message);
        setError(response.message || "Failed to update inventory item");
      }
    } catch (error) {
      console.error("Error updating inventory item:", error);
      setError(error.message || "Failed to update inventory item");
    }
  };

  // Handle Delete Item
  const handleDeleteItem = async (item) => {
    try {
      setError("");
      const response = await deleteInventoryItem(item.id);

      if (response.success) {
        console.log("Inventory item deleted successfully");
        // Refresh inventory data
        await refreshInventoryData();
      } else {
        console.error("Failed to delete inventory item:", response.message);
        setError(response.message || "Failed to delete inventory item");
      }
    } catch (error) {
      console.error("Error deleting inventory item:", error);
      setError(error.message || "Failed to delete inventory item");
    }
  };

  // Helper function to refresh inventory data
  const refreshInventoryData = async () => {
    try {
      const response = await getInventoryItems();
      if (response.success && response.data) {
        const transformedData = response.data.map((item) => ({
          id: item._id,
          name: item.name,
          category: item.category.charAt(0).toUpperCase() + item.category.slice(1),
          currentStock: `${item.currentStock} ${item.unit}`,
          threshold: item.minStockLevel ? `${item.minStockLevel} ${item.unit}` : 'Not set',
          avgCost: item.pricePerUnit ? `$${item.pricePerUnit}/${item.unit}` : '',
          status: item.currentStock <= item.minStockLevel ? "Low Stock" : "In Stock",
          unitPrice: item.pricePerUnit ? `$${item.pricePerUnit}/${item.unit}` : '',
          recentTransactions: [],
          // Keep original backend data for editing
          _id: item._id,
          category: item.category,
          unit: item.unit,
          currentStock: item.currentStock,
          minStockLevel: item.minStockLevel,
          maxStockLevel: item.maxStockLevel,
          pricePerUnit: item.pricePerUnit,
          vendor: item.vendor,
          expiryDate: item.expiryDate,
          batchNumber: item.batchNumber,
          location: item.location,
          notes: item.notes
        }));
        setInventoryData(transformedData);
      }
    } catch (error) {
      console.error("Error refreshing inventory data:", error);
    }
  };

  // Filter data based on current filters
  const filteredData = inventoryData.filter((item) => {
    const categoryMatch =
      filters.category === "All Categories" ||
      item.category === filters.category;
    const statusMatch =
      filters.status === "All Status" || item.status === filters.status;

    return categoryMatch && statusMatch;
  });

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

            {/* Filter Dropdowns */}
            <FilterDropdowns
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            {/* Stock Overview Table */}
            <StockOverviewTable
              data={filteredData}
              onItemSelect={handleItemSelect}
              selectedItem={selectedItem}
              onEdit={handleEditItem}
              onDelete={handleDeleteItem}
              userRole={userRole}
            />
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
