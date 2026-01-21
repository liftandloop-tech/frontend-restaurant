import React from "react";
import PropTypes from "prop-types";
import { BsDot, BsInfoCircle } from "react-icons/bs";

// Styles mapping for each table status. Controls border, background, dot color, and button style.
const statusToStyles = {
  available: {
    container: "border-green-500 bg-green-50",
    dot: "bg-green-600",
    statusText: "text-green-700",
    outlineBtn: "border-green-500 text-green-700 hover:bg-green-100",
    filledBtn: "bg-green-600 text-white hover:bg-green-700",
  },
  serving: {
    container: "border-blue-500 bg-blue-50",
    dot: "bg-blue-600",
    statusText: "text-blue-700",
    outlineBtn: "border-blue-500 text-blue-700 hover:bg-blue-100",
    filledBtn: "bg-blue-600 text-white hover:bg-blue-700",
  },
  reserved: {
    container: "border-amber-500 bg-amber-50",
    dot: "bg-amber-500",
    statusText: "text-amber-700",
    outlineBtn: "border-amber-500 text-amber-700 hover:bg-amber-100",
    filledBtn: "bg-amber-500 text-white hover:bg-amber-600",
  },
  cleaning: {
    container: "border-purple-500 bg-purple-50",
    dot: "bg-purple-600",
    statusText: "text-purple-700",
    outlineBtn: "border-purple-500 text-purple-700 hover:bg-purple-100",
    filledBtn: "bg-purple-600 text-white hover:bg-purple-700",
  },
  transfer: {
    container: "border-orange-500 bg-orange-50",
    dot: "bg-orange-600",
    statusText: "text-orange-700",
    outlineBtn: "border-orange-500 text-orange-700 hover:bg-orange-100",
    filledBtn: "bg-orange-600 text-white hover:bg-orange-700",
  },
};

/**
 * TableCard component displays a single restaurant table's status and actions.
 * @param {string} code - Table code (e.g., T01)
 * @param {number} seats - Seat count
 * @param {"available"|"serving"|"reserved"} status - Current state
 * @param {number} tableNumber -Table number (e.g.,1,2,3)
 * @param {string} id - Table ID
 * @param {object} currentOrder - Current order data if table is occupied
 * @param {function} onTransferTable - Callback for transferring table to available
 * @param {function} onCompleteCleaning - Callback for completing cleaning
 * @param {function} onSetTableTransfer - Callback for setting table to transfer status
 */
const TableCard = ({
  code,
  seats,
  status,
  tableNumber,
  id,
  currentOrder,
  location,
  onTransferTable,
  onCompleteCleaning,
  // onSetTableTransfer, // Removed unused prop
  onUpdateStatus,
  onTableClick,
  showServingInfo
}) => {
  // Select the styles to apply for the current table status
  const styles = statusToStyles[status] || statusToStyles.available;

  const isAvailable = status === "available";

  // Handle card click - show order details for serving and reserved tables
  const handleCardClick = () => {
    if ((status === "serving" || status === "reserved") && onTableClick) {
      onTableClick(tableNumber, currentOrder, location);
    }
  };

  return (
    <div
      className={`w-[230px] rounded-lg border-2 ${styles.container} p-3 relative ${isAvailable || status === "serving" || status === "reserved"
        ? `cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-200 ${status === "serving" || status === "reserved"
          ? `ring-2 ${status === 'serving' ? 'ring-blue-300 hover:ring-blue-400' : 'ring-amber-300 hover:ring-amber-400'} ${location === 'outdoor' ? 'bg-blue-50/50' : ''
          }`
          : ""
        }`
        : ""
        }`}
      onClick={handleCardClick}
    >
      {/* Serving Order Summary Overlay */}
      {(status === "serving" || status === "reserved") && showServingInfo && currentOrder && (
        <div className="absolute top-10 left-3 right-3 z-10 bg-white/95 backdrop-blur shadow-md border border-blue-200 rounded p-2 text-xs animate-fadeIn">
          <div className="font-semibold text-gray-800 mb-1 border-b pb-1">Order Details</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Waiter:</span>
              <span className="font-medium truncate max-w-[80px]">
                {currentOrder.waiterId?.fullName || currentOrder.waiterId?.name || 'Unassigned'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Customer:</span>
              <span className="font-medium truncate max-w-[80px]">
                {currentOrder.customerId?.name || 'Walk-in'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Table code and status dot */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-[17px] font-semibold leading-none">{code}</div>
          <span className={`w-2 h-2 rounded-full ${styles.dot}`}></span>
        </div>
        <div className="text-[12px] text-gray-600">{seats} seats</div>
      </div>
      {/* Status label */}
      <div className={`mt-2 text-[13px] font-medium ${styles.statusText}`}>
        {(status === "serving" || status === "reserved") && currentOrder ? (
          <div className="space-y-1">
            <div
              className="flex items-center gap-1 cursor-pointer hover:underline transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                handleCardClick();
              }}
            >
              <span className="capitalize">{status}</span>
              <BsInfoCircle className="w-3 h-3 opacity-70" title={`Click for ${status} summary`} />
            </div>
            {currentOrder.waiterId && (
              <div className="text-xs opacity-80">
                Waiter: {currentOrder.waiterId.fullName || currentOrder.waiterId.name || 'Unknown'}
              </div>
            )}
            <div className="text-xs opacity-80">
              Customer: {currentOrder.customerId?.name || currentOrder.customerName || 'Walk-in'}
            </div>
          </div>
        ) : (
          status.charAt(0).toUpperCase() + status.slice(1)
        )}
      </div>
      {/* Render buttons based on state */}
      <div className="mt-3 flex flex-col gap-2">
        {status === "available" && (
          <button
            className={`h-8 px-3 rounded text-[13px] border ${styles.outlineBtn} w-full`}
            onClick={(e) => { e.stopPropagation(); onUpdateStatus && onUpdateStatus(id, 'reserved'); }}
          >
            Available
          </button>
        )}
        {status === "serving" && (
          <>
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                onTableClick && onTableClick(tableNumber, currentOrder, location);
              }}
              className={`h-8 px-3 rounded text-[13px] ${styles.outlineBtn} w-full font-semibold border-2`}
            >
              🥣 Serving Order info
            </button>*/}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus && onUpdateStatus(id, 'reserved');
              }}
              className={`h-8 px-3 rounded text-[13px] ${styles.filledBtn} w-full`}
            >
              ✓ Mark as Served
            </button>
          </>
        )}
        {status === "reserved" && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onUpdateStatus && onUpdateStatus(id, 'available');
              }}
              className={`h-8 px-3 rounded text-[13px] ${styles.filledBtn} w-full`}
              title="Return table to available status"
            >
              Release Table (Available)
            </button>
          </>
        )}
        {status === "cleaning" && (
          <button
            onClick={() => onCompleteCleaning && onCompleteCleaning(tableNumber)}
            className={`h-8 px-3 rounded text-[13px] ${styles.filledBtn} w-full`}
          >
            Complete Cleaning
          </button>
        )}
        {status === "transfer" && (
          <button
            onClick={() => onTransferTable && onTransferTable(tableNumber)}
            className={`h-8 px-3 rounded text-[13px] ${styles.filledBtn} w-full`}
          >
            Return to Available
          </button>
        )}
      </div>
    </div>
  );
};

TableCard.propTypes = {
  code: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired,
  status: PropTypes.oneOf(["available", "serving", "reserved", "cleaning", "transfer"]).isRequired,
  tableNumber: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  currentOrder: PropTypes.object,
  location: PropTypes.string,
  onTransferTable: PropTypes.func,
  onCompleteCleaning: PropTypes.func,
  onSetTableTransfer: PropTypes.func,
  onUpdateStatus: PropTypes.func,
  onTableClick: PropTypes.func,
  showServingInfo: PropTypes.bool
};

TableCard.defaultProps = {
  currentOrder: null,
  onTransferTable: () => { }, // provide a default empty function for onTransferTable
  onCompleteCleaning: () => { }, // provide a default empty function for onCompleteCleaning
  onSetTableTransfer: () => { }, // provide a default empty function for onSetTableTransfer
  onTableClick: () => { }, // provide a default empty function for onTableClick
};

export default TableCard;
