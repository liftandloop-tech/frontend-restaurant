import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  TitleBar,
  Filters,
  AreaSection,
  Shortcuts,
  TableOrderModal,
  ServingSummaryModal,
} from "./components/restaurant-table-components";
import AddTable from "./AddTable";
import { createTable, getTables, deleteTable, updateTableStatus, transferTable, completeCleaning } from "./utils/tables";//new

/**
 * RestaurantTables page aggregates all sections:
 * - TitleBar (page title + actions)
 * - Filters (filter by status, capacity, zone)
 * - AreaSection (shows a labeled group of TableCard's)
 * - RightPanel (details about a selected/active table)
 * - Shortcuts (keyboard shortcuts)
 *
 * Tables are now fetched from the backend API and grouped by location.
 */
const RestaurantTables = () => {
  const navigate = useNavigate();
  // State for AddTable modal
  const [isAddTableModalOpen, setIsAddTableModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for delete functionality
  const [selectedTableForDeletion, setSelectedTableForDeletion] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [capacityFilter, setCapacityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  // Table order modal states
  const [isTableOrderModalOpen, setIsTableOrderModalOpen] = useState(false);
  const [selectedTableOrder, setSelectedTableOrder] = useState(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState(null);

  // Serving summary modal states (for patio area serving tables)
  const [isServingSummaryModalOpen, setIsServingSummaryModalOpen] = useState(false);
  const [selectedServingOrder, setSelectedServingOrder] = useState(null);
  const [selectedServingTableNumber, setSelectedServingTableNumber] = useState(null);
  const [selectedServingLocation, setSelectedServingLocation] = useState('indoor');
  const [showServingInfo, setShowServingInfo] = useState(false);

  // Fetch tables from API when filters change
  useEffect(() => {
    const fetchTables = async () => {
      try {
        setLoading(true);
        setError("");

        // Build filter object for API
        const filters = {};

        // Map frontend status to backend status
        if (statusFilter !== "all") {
          filters.status = statusFilter;
        }

        if (locationFilter) {
          filters.location = locationFilter;
        }

        const response = await getTables(filters);
        if (response.success && response.data) {
          let filteredTables = response.data;

          // Apply capacity filter on frontend (since backend might not support it)
          if (capacityFilter) {
            const capacity = parseInt(capacityFilter);
            if (capacity === 8) {
              filteredTables = filteredTables.filter(t => t.capacity >= 8);
            } else {
              filteredTables = filteredTables.filter(t => t.capacity === capacity);
            }
          }

          setTables(filteredTables);
        }
      } catch (error) {
        console.error("Error fetching tables:", error);
        setError("Failed to load tables. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTables();
  }, [statusFilter, capacityFilter, locationFilter]);

  // Transform API table data to format expected by TableCard
  const transformTable = (table) => ({
    code: `T${String(table.tableNumber).padStart(2, '0')}`,
    seats: table.capacity,
    status: table.status || "available",
    _id: table._id,
    tableNumber: table.tableNumber,
    location: table.location || 'indoor',
    currentOrder: table.currentOrderId, // Include order data for change order functionality
  });

  // Group tables by location
  const tablesByLocation = useMemo(() => {
    const transformed = tables.map(transformTable);
    const grouped = {
      indoor: [],
      outdoor: [],
      vip: [],
      bar: [],
    };
    transformed.forEach(table => {
      const location = table.location || 'indoor';
      if (grouped[location]) {
        grouped[location].push(table);
      } else {
        grouped.indoor.push(table); // Default to indoor if location not recognized
      }
    });
    // Sort tables by table number within each location
    Object.keys(grouped).forEach(location => {
      grouped[location].sort((a, b) => a.tableNumber - b.tableNumber);
    });
    return grouped;
  }, [tables]);

  // Get location display name
  const getLocationName = (location) => {
    const names = {
      indoor: "Main Dining Area",
      outdoor: "Patio Area",
      vip: "VIP Area",
      bar: "Bar Area",
    };
    return names[location] || location;
  };

  // Handler to open Add Table modal
  const handleAddTable = () => {
    setIsAddTableModalOpen(true);
    setError("");
    setSuccess("");
  };

  // Handler to close Add Table modal
  const handleCloseAddTableModal = () => {
    setIsAddTableModalOpen(false);
    setError("");
    setSuccess("");
  };

  // Handle table submission from AddTable modal
  const handleTableSubmit = async (tableData) => {
    try {
      setError("");
      setSuccess("");

      const response = await createTable(tableData);

      if (response.success) {
        setSuccess(`Table ${response.data.tableNumber || "N/A"} added successfully!`);

        // Fetch updated tables list with current filters
        const filters = {};
        if (statusFilter !== "all") {
          filters.status = statusFilter;
        }
        if (locationFilter) {
          filters.location = locationFilter;
        }

        const updatedResponse = await getTables(filters);
        if (updatedResponse.success && updatedResponse.data) {
          let filteredTables = updatedResponse.data;
          if (capacityFilter) {
            const capacity = parseInt(capacityFilter);
            if (capacity === 8) {
              filteredTables = filteredTables.filter(t => t.capacity >= 8);
            } else {
              filteredTables = filteredTables.filter(t => t.capacity === capacity);
            }
          }
          setTables(filteredTables);
        }

        // Close modal after 1.5 seconds
        setTimeout(() => {
          setIsAddTableModalOpen(false);
          setSuccess("");
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding table:", error);

      // Handle network errors
      if (error.message === "Failed to fetch" || error.message.includes("ERR_CONNECTION_REFUSED")) {
        setError("Cannot connect to server. Please make sure the backend server is running on port 3000.");
        return;
      }

      // Handle permission errors (403 Forbidden)
      if (error.status === 403 || error.message.includes('Access denied') || error.message.includes('Insufficient permissions') || error.message.includes('permission')) {
        // Get user role from localStorage if available
        let userRole = 'Unknown';
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const parsed = JSON.parse(userData);
            userRole = parsed.role || 'Unknown';
          }
        } catch (e) {
          // Ignore parsing errors
        }

        setError(`Access Denied: You don't have permission to create tables.\n\nRequired roles: Owner, Admin, or Manager\nYour role: ${userRole}\n\nPlease contact your administrator to get the required permissions.`);
      }
      // Handle authentication errors
      else if (error.status === 401 || error.message.includes('Token') || error.message.includes('Unauthorized') || error.message.includes('expired') || error.isRefreshFailure) {
        // If refresh already failed and redirected, don't show error
        if (error.isRefreshFailure) {
          // Redirect is already happening from api.js, just clear local state
          return;
        }

        setError("Your session has expired. Please login again.");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('isAuthenticated');
          navigate('/login');
        }, 2000);
      } else if (error.status === 400 && error.validationErrors && error.validationErrors.length > 0) {
        // Handle validation errors - show detailed messages
        const validationMessages = error.validationErrors.map(err => {
          const field = err.field || 'unknown';
          const message = err.message || 'Invalid value';
          const formattedField = field.replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase());
          return `${formattedField}: ${message}`;
        });
        setError(`Validation failed:\n${validationMessages.join('\n')}`);
      } else {
        // Show error message (may include validation details)
        setError(error.message || "Failed to add table. Please try again.");
      }
    }
  };

  // Handler for table selection for deletion
  const handleTableSelectForDeletion = (tableId) => {
    setSelectedTableForDeletion(tableId);
    setShowDeleteConfirmation(true);
  };

  // Handler for delete table
  const handleDeleteTable = () => {
    setShowDeleteConfirmation(true);
  };

  // Handler for confirming table deletion
  const handleConfirmDeleteTable = async () => {
    if (!selectedTableForDeletion) return;

    try {
      setError("");
      setSuccess("");

      const response = await deleteTable(selectedTableForDeletion);

      if (response.success) {
        setSuccess(`Table deleted successfully!`);

        // Refresh tables list
        const filters = {};
        if (statusFilter !== "all") {
          filters.status = statusFilter;
        }
        if (locationFilter) {
          filters.location = locationFilter;
        }

        const updatedResponse = await getTables(filters);
        if (updatedResponse.success && updatedResponse.data) {
          let filteredTables = updatedResponse.data;
          if (capacityFilter) {
            const capacity = parseInt(capacityFilter);
            if (capacity === 8) {
              filteredTables = filteredTables.filter(t => t.capacity >= 8);
            } else {
              filteredTables = filteredTables.filter(t => t.capacity === capacity);
            }
          }
          setTables(filteredTables);
        }

        // Reset selection and hide confirmation
        setSelectedTableForDeletion(null);
        setShowDeleteConfirmation(false);

        // Clear success message after 2 seconds
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error deleting table:", error);

      // Handle network errors
      if (error.message === "Failed to fetch" || error.message.includes("ERR_CONNECTION_REFUSED")) {
        setError("Cannot connect to server. Please make sure the backend server is running on port 3000.");
        return;
      }

      // Handle permission errors (403 Forbidden)
      if (error.status === 403 || error.message.includes('Access denied') || error.message.includes('Insufficient permissions') || error.message.includes('permission')) {
        let userRole = 'Unknown';
        try {
          const userData = localStorage.getItem('userData');
          if (userData) {
            const parsed = JSON.parse(userData);
            userRole = parsed.role || 'Unknown';
          }
        } catch (e) {
          // Ignore parsing errors
        }

        setError(`Access Denied: You don't have permission to delete tables.\n\nRequired roles: Owner, Admin, or Manager\nYour role: ${userRole}\n\nPlease contact your administrator to get the required permissions.`);
      }
      // Handle authentication errors
      else if (error.status === 401 || error.message.includes('Token') || error.message.includes('Unauthorized') || error.message.includes('expired') || error.isRefreshFailure) {
        if (error.isRefreshFailure) {
          return;
        }

        setError("Your session has expired. Please login again.");
        setTimeout(() => {
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('userData');
          localStorage.removeItem('isAuthenticated');
          navigate('/login');
        }, 2000);
      } else {
        setError(error.message || "Failed to delete table. Please try again.");
      }

      setShowDeleteConfirmation(false);
    }
  };

  // Handler for canceling table deletion
  const handleCancelDeleteTable = () => {
    setSelectedTableForDeletion(null);
    setShowDeleteConfirmation(false);
    setError("");
  };

  // Handler for transferring table
  const handleTransferTable = async (tableNumber) => {
    try {
      setError("");
      const response = await transferTable(tableNumber);
      if (response.success) {
        // Refresh tables to show updated status
        const tablesResponse = await getTables();
        if (tablesResponse.success && tablesResponse.data) {
          setTables(tablesResponse.data);
        }
        setSuccess(`Table ${tableNumber} transferred successfully`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error transferring table:", error);
      setError(error.message || "Failed to transfer table");
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handler for completing cleaning
  const handleCompleteCleaning = async (tableNumber) => {
    try {
      setError("");
      const response = await completeCleaning(tableNumber);
      if (response.success) {
        // Refresh tables to show updated status
        const tablesResponse = await getTables();
        if (tablesResponse.success && tablesResponse.data) {
          setTables(tablesResponse.data);
        }
        setSuccess(`Table ${tableNumber} cleaning completed successfully`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error completing cleaning:", error);
      setError(error.message || "Failed to complete cleaning");
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handler for setting table to transfer status
  const handleSetTableTransfer = async (tableId) => {
    try {
      setError("");
      const response = await updateTableStatus(tableId, 'transfer');
      if (response.success) {
        // Refresh tables to show updated status
        const tablesResponse = await getTables();
        if (tablesResponse.success && tablesResponse.data) {
          setTables(tablesResponse.data);
        }
        setSuccess(`Table set to transfer status successfully`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error setting table to transfer:", error);
      setError(error.message || "Failed to set table to transfer");
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handler for table click to show order details
  const handleTableClick = async (tableNumber, currentOrder, tableLocation) => {
    if (currentOrder && currentOrder._id) {
      try {
        setLoading(true);
        setError("");

        // Fetch full order details
        const { getOrderById } = await import("./utils/orders");
        const response = await getOrderById(currentOrder._id);

        if (response.success && response.data) {
          // Show serving summary modal for both serving and reserved tables
          // This provides the "popup box page" the user requested
          setSelectedServingOrder(response.data);
          setSelectedServingTableNumber(tableNumber);
          setSelectedServingLocation(tableLocation);
          setIsServingSummaryModalOpen(true);
        } else {
          setError("Failed to load order details");
        }
      } catch (err) {
        console.error("Error loading order details:", err);
        setError(err.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <TitleBar onAddTable={handleAddTable} onDeleteTable={handleDeleteTable} />

        {/* Filters with handlers */}
        <div className="mt-8">
          <Filters
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            capacityFilter={capacityFilter}
            onCapacityFilterChange={setCapacityFilter}
            locationFilter={locationFilter}
            onLocationFilterChange={setLocationFilter}
            showServingInfo={showServingInfo}
            onToggleServingInfo={() => setShowServingInfo(!showServingInfo)}
          />
        </div>

        {/* Main content: left (area sections) */}
        <div className="mt-8">
          <div className="w-full">
            <div className="space-y-8">
              {loading ? (
                <div className="text-center py-8 text-gray-500">Loading tables...</div>
              ) : (
                <>
                  {/* Render tables grouped by location */}
                  {Object.keys(tablesByLocation).map((location) => {
                    const locationTables = tablesByLocation[location];
                    if (locationTables.length === 0) return null;

                    return (
                      <React.Fragment key={location}>
                        <AreaSection
                          title={getLocationName(location)}
                          tables={locationTables}
                          location={location}
                          onTransferTable={handleTransferTable}
                          onCompleteCleaning={handleCompleteCleaning}
                          onSetTableTransfer={handleSetTableTransfer}
                          onTableClick={handleTableClick}
                          showServingInfo={showServingInfo}
                        />
                        <div className="h-6" />
                      </React.Fragment>
                    );
                  })}

                  {/* Show message if no tables exist */}
                  {tables.length === 0 && !loading && (
                    <div className="text-center py-8 text-gray-500">
                      No tables found matching your filters. Try adjusting your filters or click "Add Table" to create a new table.
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Shortcuts bottom block */}
        <div className="mt-6">
          <Shortcuts />
        </div>
      </div>

      {/* AddTable Modal */}
      <AddTable
        isOpen={isAddTableModalOpen}
        onClose={handleCloseAddTableModal}
        onSubmit={handleTableSubmit}
        error={error}
        success={success}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6 text-red-600"
                >
                  <path d="M3 6h18M6 6l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12" />
                  <path d="M10 11v6M14 11v6" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Table</h3>
                <p className="text-sm text-gray-600">This action cannot be undone</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 mb-3">
                Select a table to delete. All associated data including orders, reservations, and history will be permanently removed.
              </p>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Table
                </label>
                <select
                  value={selectedTableForDeletion || ""}
                  onChange={(e) => setSelectedTableForDeletion(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">Choose a table...</option>
                  {tables.map((table) => (
                    <option key={table._id} value={table._id}>
                      Table {table.tableNumber} - {table.capacity} seats ({table.location})
                    </option>
                  ))}
                </select>
              </div>

              {selectedTableForDeletion && (
                <div className="bg-red-50 border border-red-200 p-3 rounded-md">
                  <p className="text-sm text-red-800">
                    <strong>Warning:</strong> Deleting Table {tables.find(t => t._id === selectedTableForDeletion)?.tableNumber || 'Unknown'} cannot be undone.
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCancelDeleteTable}
                className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeleteTable}
                disabled={!selectedTableForDeletion}
                className={`flex-1 px-4 py-2 rounded-md transition-colors ${selectedTableForDeletion
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
              >
                Delete Table
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table Order Modal */}
      <TableOrderModal
        isOpen={isTableOrderModalOpen}
        onClose={() => {
          setIsTableOrderModalOpen(false);
          setSelectedTableOrder(null);
          setSelectedTableNumber(null);
        }}
        tableNumber={selectedTableNumber}
        order={selectedTableOrder}
      />

      {/* Serving Summary Modal for Patio Area Serving Tables */}
      <ServingSummaryModal
        isOpen={isServingSummaryModalOpen}
        onClose={() => {
          setIsServingSummaryModalOpen(false);
          setSelectedServingOrder(null);
          setSelectedServingTableNumber(null);
          setSelectedServingLocation('indoor');
        }}
        tableNumber={selectedServingTableNumber}
        order={selectedServingOrder}
        location={selectedServingLocation}
      />
    </div>
  );
};

export default RestaurantTables;
