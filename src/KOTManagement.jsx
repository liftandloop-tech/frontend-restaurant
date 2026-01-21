import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiPrinter, FiRefreshCw, FiCheckCircle, FiClock, FiPlus, FiEdit } from "react-icons/fi";
import { getKOTs, markKOTPrinted, updateKOTStatus } from "./utils/kots";
import { getOrderById, updateOrderStatus } from "./utils/orders";
import TakeOrder from "./TakeOrder";
import ChangeOrder from "./ChangeOrder";

const KOTManagement = () => {
  const navigate = useNavigate();
  const [kots, setKots] = useState([]);
  const [filteredKOTs, setFilteredKOTs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [stationFilter, setStationFilter] = useState("all");
  const [printedFilter, setPrintedFilter] = useState("all");

  // Modal states
  // const [isTakeOrderVisible, setIsTakeOrderVisible] = useState(false);
  const [isChangeOrderVisible, setIsChangeOrderVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);

  const loadKOTs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getKOTs();
      if (!response?.success || !Array.isArray(response.data)) {
        throw new Error(response?.message || "Failed to fetch KOTs");
      }
      setKots(response.data);
    } catch (err) {
      console.error("Failed to load KOTs:", err);
      setError(err.message || "Unable to load KOTs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadKOTs();
  }, [loadKOTs]);

  useEffect(() => {
    let filtered = [...kots];

    // Remove KOTs only when order is completed (bill has been printed and paid)
    filtered = filtered.filter((kot) => {
      // Keep KOTs if order is not completed (bill not yet printed)
      // KOTs should remain visible even after order is served, until bill is printed
      if (kot.orderId?.status &&
        kot.orderId.status !== 'completed') {
        return true;
      }

      // Remove KOTs only when order is completed (bill printed and paid)
      return false;
    });

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((kot) => kot.status === statusFilter);
    }

    // Filter by station
    if (stationFilter !== "all") {
      filtered = filtered.filter((kot) => kot.station === stationFilter);
    }

    // Filter by printed status
    if (printedFilter === "printed") {
      filtered = filtered.filter((kot) => kot.isPrinted === true);
    } else if (printedFilter === "not-printed") {
      filtered = filtered.filter((kot) => kot.isPrinted !== true);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (kot) =>
          kot.kotNumber?.toLowerCase().includes(term) ||
          kot.orderId?.orderNumber?.toLowerCase().includes(term) ||
          kot.orderId?.tableNumber?.toString().includes(term) ||
          kot.station?.toLowerCase().includes(term)
      );
    }

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredKOTs(filtered);
  }, [kots, statusFilter, stationFilter, printedFilter, searchTerm]);

  const handleMarkPrinted = async (kotId) => {
    try {
      await markKOTPrinted(kotId);
      // Reload KOTs to refresh the list (will filter out completed ones)
      await loadKOTs();
    } catch (err) {
      console.error("Failed to mark KOT as printed:", err);
      setError(err.message || "Failed to mark KOT as printed");
    }
  };

  const handleStatusUpdate = async (kotId, newStatus) => {
    try {
      // Auto-update order status when KOT starts preparing
      if (newStatus === "preparing") {
        const kot = kots.find((k) => k._id === kotId);
        const orderId = kot?.orderId?._id || kot?.orderId;

        if (orderId) {
          // Update order status to confirmed
          try {
            await updateOrderStatus(orderId, "confirmed");
            // Also refresh orders if needed or just let the user see it elsewhere
          } catch (orderErr) {
            console.error("Failed to auto-update order status:", orderErr);
            // We continue even if this fails, as the KOT update is primary here
          }
        }
      }

      await updateKOTStatus(kotId, newStatus);
      await loadKOTs();
    } catch (err) {
      console.error("Failed to update KOT status:", err);
      setError(err.message || "Failed to update KOT status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "preparing":
        return "bg-blue-100 text-blue-800";
      case "ready":
        return "bg-green-100 text-green-800";
      case "sent":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStationColor = (station) => {
    switch (station) {
      case "kitchen":
        return "bg-orange-100 text-orange-800";
      case "bar":
        return "bg-purple-100 text-purple-800";
      case "beverage":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle Take Order - redirect to new order page
  const handleTakeOrder = () => {
    navigate("/new-order");
  };

  // Handle Close Table - Removed, use Print Bill instead

  // Handle Change Order
  const handleChangeOrder = async (kot) => {
    if (!kot.orderId) {
      setError("Order information not available for this KOT");
      return;
    }

    try {
      const orderId = kot.orderId._id || kot.orderId;
      const response = await getOrderById(orderId);

      if (response.success && response.data) {
        setSelectedOrder(response.data);
        setSelectedTable({
          tableNumber: response.data.tableNumber,
          code: `T${response.data.tableNumber}`
        });
        setIsChangeOrderVisible(true);
      } else {
        setError("Failed to load order details");
      }
    } catch (err) {
      console.error("Error loading order:", err);
      setError(err.message || "Failed to load order details");
    }
  };

  // Handle Print Bill
  const handlePrintBill = async (kot) => {
    if (!kot.orderId) {
      setError("Order information not available for this KOT");
      return;
    }

    const orderId = kot.orderId._id || kot.orderId;
    const tableNumber = kot.orderId.tableNumber;

    // Navigate to close table page which has print functionality
    navigate("/close-table", {
      state: { orderId, tableNumber, printOnly: true }
    });

    // After printing bill, reload KOTs to filter out completed ones
    setTimeout(() => {
      loadKOTs();
    }, 2000);
  };

  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              KOT Management
            </h1>
            <p className="text-gray-600 mt-2">
              Manage Kitchen Order Tickets (KOTs) and track printing status.
            </p>
          </div>

          {/* Filters Row */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 min-w-[120px]"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="sent">Sent</option>
                </select>
              </div>

              {/* Station Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Station:
                </label>
                <select
                  value={stationFilter}
                  onChange={(e) => setStationFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 min-w-[120px]"
                >
                  <option value="all">All Stations</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="bar">Bar</option>
                  <option value="beverage">Beverage</option>
                </select>
              </div>

              {/* Printed Filter */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Printed:
                </label>
                <select
                  value={printedFilter}
                  onChange={(e) => setPrintedFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 min-w-[120px]"
                >
                  <option value="all">All</option>
                  <option value="printed">Printed</option>
                  <option value="not-printed">Not Printed</option>
                </select>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search KOTs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700 min-w-[200px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Take Order Button */}
              <button
                onClick={handleTakeOrder}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors h-[40px] w-[150px]"
              >
                <FiPlus className="w-4 h-4" />
                <span>New Order</span>
              </button>

              {/* Refresh Button */}
              <button
                onClick={loadKOTs}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-[150px]"
              >
                <FiRefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div>
        <div className="max-w-7xl mx-auto">
          {error && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3">
              {error}
            </div>
          )}

          {loading && filteredKOTs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <FiRefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p>Loading KOTs...</p>
            </div>
          ) : filteredKOTs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No KOTs found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredKOTs.map((kot) => (
                <div
                  key={kot._id}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                >
                  {/* KOT Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {kot.kotNumber || `KOT-${kot._id.slice(-6)}`}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Order: {kot.orderId?.orderNumber || "N/A"}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                          kot.status
                        )}`}
                      >
                        {kot.status?.toUpperCase() || "PENDING"}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded ${getStationColor(
                          kot.station
                        )}`}
                      >
                        {kot.station?.toUpperCase() || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="mb-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Table:</span>
                      <span className="font-medium text-gray-900">
                        {kot.orderId?.tableNumber
                          ? `Table ${kot.orderId.tableNumber}`
                          : "N/A"}
                      </span>
                    </div>
                    {kot.tableStatus && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Table Status:</span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${kot.tableStatus === 'occupied' || kot.tableStatus === 'serving'
                            ? 'bg-blue-100 text-blue-800'
                            : kot.tableStatus === 'reserved'
                              ? 'bg-amber-100 text-amber-800'
                              : kot.tableStatus === 'cleaning'
                                ? 'bg-purple-100 text-purple-800'
                                : kot.tableStatus === 'available'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {kot.tableStatus.charAt(0).toUpperCase() + kot.tableStatus.slice(1)}
                        </span>
                      </div>
                    )}
                    {kot.orderId?.customerId && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Customer:</span>
                        <span className="font-medium text-gray-900">
                          {kot.orderId.customerId.name || "Guest"}
                        </span>
                      </div>
                    )}
                    {kot.orderId?.status && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Order Status:</span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${kot.orderId.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : kot.orderId.status === 'preparing' || kot.orderId.status === 'confirmed'
                              ? 'bg-blue-100 text-blue-800'
                              : kot.orderId.status === 'ready'
                                ? 'bg-green-100 text-green-800'
                                : kot.orderId.status === 'completed' || kot.orderId.status === 'served'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-gray-100 text-gray-800'
                            }`}
                        >
                          {kot.orderId.status.charAt(0).toUpperCase() + kot.orderId.status.slice(1)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium text-gray-900">
                        {formatDate(kot.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Items:
                    </h4>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {kot.items && kot.items.length > 0 ? (
                        kot.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded"
                          >
                            <span className="text-gray-700">
                              {item.name} x {item.qty}
                            </span>
                            {item.specialInstructions && (
                              <span className="text-xs text-gray-500 italic">
                                ({item.specialInstructions})
                              </span>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No items</p>
                      )}
                    </div>
                  </div>

                  {/* Printed Status */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Print Status:</span>
                      {kot.isPrinted ? (
                        <div className="flex items-center gap-2 text-green-600">
                          <FiCheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Printed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-yellow-600">
                          <FiClock className="w-4 h-4" />
                          <span className="text-sm font-medium">Not Printed</span>
                        </div>
                      )}
                    </div>
                    {kot.isPrinted && kot.printedAt && (
                      <div className="mt-2 text-xs text-gray-500">
                        Printed: {formatDate(kot.printedAt)}
                      </div>
                    )}
                    {kot.isPrinted && kot.printedBy && (
                      <div className="mt-1 text-xs text-gray-500">
                        By: {kot.printedBy?.fullName || "Staff"}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    {/* Primary Actions Row */}
                    <div className="grid grid-cols-1 gap-2">
                      <button
                        onClick={() => handleChangeOrder(kot)}
                        className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        <FiEdit className="w-4 h-4" />
                        Change Order
                      </button>
                    </div>

                    {/* Secondary Actions Row */}
                    <div className="flex gap-2">
                      {kot.orderId && (
                        <button
                          onClick={() => handlePrintBill(kot)}
                          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                        >
                          <FiPrinter className="w-4 h-4" />
                          Print Bill
                        </button>
                      )}

                    </div>

                    {/* Status Update Buttons */}
                    {kot.status === "pending" && (
                      <button
                        onClick={() => handleStatusUpdate(kot._id, "preparing")}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Start Preparing
                      </button>
                    )}
                    {kot.status === "preparing" && (
                      <button
                        onClick={() => handleStatusUpdate(kot._id, "ready")}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                      >
                        Mark Ready
                      </button>
                    )}
                    {kot.status === "ready" && (
                      <button
                        onClick={() => handleStatusUpdate(kot._id, "sent")}
                        className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                      >
                        Mark as Sent (Served)
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Summary Stats */}
          {!loading && kots.length > 0 && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Total KOTs</div>
                <div className="text-2xl font-bold text-gray-900">{kots.length}</div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Printed</div>
                <div className="text-2xl font-bold text-green-600">
                  {kots.filter((k) => k.isPrinted).length}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Not Printed</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {kots.filter((k) => !k.isPrinted).length}
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-4">
                <div className="text-sm text-gray-600">Pending</div>
                <div className="text-2xl font-bold text-blue-600">
                  {kots.filter((k) => k.status === "pending").length}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Change Order Modal */}
      {isChangeOrderVisible && (
        <ChangeOrder
          show={isChangeOrderVisible}
          onClose={() => {
            setIsChangeOrderVisible(false);
            setSelectedOrder(null);
            setSelectedTable(null);
            loadKOTs(); // Refresh KOTs after order update
          }}
          order={selectedOrder}
          table={selectedTable}
          onOrderUpdated={() => {
            loadKOTs(); // Refresh KOTs after order update
          }}
        />
      )}

    </div>
  );
};

export default KOTManagement;

