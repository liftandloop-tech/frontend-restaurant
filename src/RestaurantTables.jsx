import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  TitleBar,
  Filters,
  AreaSection,
  Shortcuts,
  TableOrderModal,
  ServingSummaryModal,
  ServingInfoPage
} from "./components/restaurant-table-components";
import AddTable from "./AddTable";
import {
  useGetTablesQuery,
  useCreateTableMutation,
  useDeleteTableMutation,
  useUpdateTableStatusMutation,
  useTransferTableMutation,
  useCompleteCleaningMutation
} from "./features/tables/tablesApiSlice";
import { useLazyGetOrderByIdQuery } from "./features/orders/ordersApiSlice";

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

  // RTK Query Hooks
  const { data: tablesResponse, isLoading: tablesLoading, error: tablesError } = useGetTablesQuery({
    status: statusFilter !== "all" ? statusFilter : undefined,
    location: locationFilter || undefined
  }, {
    pollingInterval: 15000,
    refetchOnMountOrArgChange: true,
    skip: !localStorage.getItem('authToken')
  });

  // const [triggerGetOrder, { isLoading: orderLoading }] = useLazyGetOrderByIdQuery();
  const [triggerGetOrder] = useLazyGetOrderByIdQuery();

  const [createTable] = useCreateTableMutation();
  const [deleteTable] = useDeleteTableMutation();
  const [transferTable] = useTransferTableMutation();
  const [completeCleaning] = useCompleteCleaningMutation();
  const [updateTableStatus] = useUpdateTableStatusMutation();

  // Derived tables list
  const tables = useMemo(() => {
    let filteredTables = tablesResponse?.data || [];

    // Apply capacity filter on frontend (since backend might not support it)
    if (capacityFilter) {
      const capacity = parseInt(capacityFilter);
      if (capacity === 8) {
        filteredTables = filteredTables.filter(t => t.capacity >= 8);
      } else {
        filteredTables = filteredTables.filter(t => t.capacity === capacity);
      }
    }

    return filteredTables;
  }, [tablesResponse, capacityFilter]);

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

      const response = await createTable(tableData).unwrap();

      if (response.success) {
        setSuccess(`Table ${response.data.tableNumber || "N/A"} added successfully!`);

        // Close modal after 1.5 seconds
        setTimeout(() => {
          setIsAddTableModalOpen(false);
          setSuccess("");
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding table:", error);

      // Handle network errors
      if (error.message === "Failed to fetch" || error.message?.includes("ERR_CONNECTION_REFUSED")) {
        setError("Cannot connect to server. Please make sure the backend server is running on port 3000.");
        return;
      }

      // Handle permission errors (403 Forbidden)
      if (error.status === 403 || error.data?.message?.includes('Access denied') || error.data?.message?.includes('Insufficient permissions')) {
        setError(`Access Denied: You don't have permission to create tables.`);
      }
      // Handle authentication errors
      else if (error.status === 401) {
        setError("Your session has expired. Please login again.");
      } else if (error.status === 409) {
        setError(`Conflict: Table number ${tableData.tableNumber} already exists in your restaurant.`);
      } else if (error.status === 400 && error.data?.validationErrors && error.data.validationErrors.length > 0) {
        // Handle validation errors
        const validationMessages = error.data.validationErrors.map(err => {
          return `${err.field}: ${err.message}`;
        });
        setError(`Validation failed:\n${validationMessages.join('\n')}`);
      } else {
        // Show error message
        setError(error.data?.message || error.message || "Failed to add table. Please try again.");
      }
    }
  };

  // Handler for table selection for deletion
  // const handleTableSelectForDeletion = (tableId) => {
  //   setSelectedTableForDeletion(tableId);
  //   setShowDeleteConfirmation(true);
  // };

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

      const response = await deleteTable(selectedTableForDeletion).unwrap();

      if (response.success) {
        setSuccess(`Table deleted successfully!`);

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
      setError(error.data?.message || "Failed to delete table. Please try again.");
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
      const response = await transferTable(tableNumber).unwrap();
      if (response.success) {
        setSuccess(`Table ${tableNumber} transferred successfully`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error transferring table:", error);
      setError(error.data?.message || "Failed to transfer table");
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handler for completing cleaning
  const handleCompleteCleaning = async (tableNumber) => {
    try {
      setError("");
      const response = await completeCleaning(tableNumber).unwrap();
      if (response.success) {
        setSuccess(`Table ${tableNumber} cleaning completed successfully`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error completing cleaning:", error);
      setError(error.data?.message || "Failed to complete cleaning");
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handler for setting table to transfer status
  const handleSetTableTransfer = async (tableId) => {
    try {
      setError("");
      const response = await updateTableStatus({ tableId, status: 'transfer' }).unwrap();
      if (response.success) {
        setSuccess(`Table set to transfer status successfully`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error setting table to transfer:", error);
      setError(error.data?.message || "Failed to set table to transfer");
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handler for updating table status explicitly
  const handleUpdateStatus = async (tableId, newStatus) => {
    try {
      setError("");
      const response = await updateTableStatus({ tableId, status: newStatus }).unwrap();
      if (response.success) {
        setSuccess(`Table status updated to ${newStatus} successfully`);
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (error) {
      console.error("Error updating table status:", error);
      setError(error.data?.message || `Failed to update table status to ${newStatus}`);
      setTimeout(() => setError(""), 5000);
    }
  };

  // Handler for table click to show order details
  const handleTableClick = async (tableNumber, currentOrder, tableLocation) => {
    if (currentOrder && currentOrder._id) {
      try {
        setError("");

        // Fetch full order details using lazy query hook
        const response = await triggerGetOrder(currentOrder._id).unwrap();

        if (response.success && response.data) {
          setSelectedServingOrder(response.data);
          setSelectedServingTableNumber(tableNumber);
          setSelectedServingLocation(tableLocation);
          setIsServingSummaryModalOpen(true);
        } else {
          setError("Failed to load order details");
        }
      } catch (err) {
        console.error("Error loading order details:", err);
        setError(err.data?.message || err.message || "Failed to load order details");
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
              {tablesLoading ? (
                <div className="text-center py-8 text-gray-500">Loading tables...</div>
              ) : showServingInfo ? (
                <ServingInfoPage
                  tables={tables.map(transformTable)}
                  onTableClick={handleTableClick}
                  onUpdateStatus={handleUpdateStatus}
                />
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
                          onUpdateStatus={handleUpdateStatus}
                          onTableClick={handleTableClick}
                          showServingInfo={showServingInfo}
                        />
                        <div className="h-6" />
                      </React.Fragment>
                    );
                  })}

                  {/* Show message if no tables exist */}
                  {tables.length === 0 && !tablesLoading && (
                    <div className="text-center py-8 text-gray-500">
                      No tables found matching your filters. Try adjusting your filters or click "Add Table" to create a new table.
                    </div>
                  )}
                  {tablesError && (
                    <div className="text-center py-8 text-red-500">
                      Error loading tables: {tablesError.status === 'FETCH_ERROR' ? 'Connection Error' : tablesError.data?.message || 'Unknown Error'}
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

      {/* Serving Summary Modal */}
      {isServingSummaryModalOpen && (
        <ServingSummaryModal
          isOpen={isServingSummaryModalOpen}
          onClose={() => {
            setIsServingSummaryModalOpen(false);
            setSelectedServingOrder(null);
          }}
          order={selectedServingOrder}
          tableNumber={selectedServingTableNumber}
          location={selectedServingLocation}
        />
      )}

    </div>
  );
};

export default RestaurantTables;
