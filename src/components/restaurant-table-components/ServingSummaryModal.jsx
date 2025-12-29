import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  FiX, FiUser, FiUserCheck, FiPhone, FiMapPin,
  FiShoppingCart, FiArrowRight, FiSearch,
  FiClock, FiActivity
} from "react-icons/fi";

const ServingSummaryModal = ({ isOpen, onClose, tableNumber, order }) => {
  const navigate = useNavigate();
  const [itemSearch, setItemSearch] = useState("");

  // Filter items based on search input
  const filteredItems = useMemo(() => {
    if (!order?.items) return []; // use optional chaining
    return order.items.filter(item =>
      (item.name || item.itemName || "").toLowerCase().includes(itemSearch.toLowerCase())
    );
  }, [order, itemSearch]); // depend on order, not order.items to avoid crash if order is null

  if (!isOpen || !order) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      preparing: "bg-blue-100 text-blue-700 border-blue-200",
      ready: "bg-indigo-100 text-indigo-700 border-indigo-200",
      served: "bg-green-100 text-green-700 border-green-200",
    };
    return colors[status?.toLowerCase()] || "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col transform transition-all animate-scaleIn border border-white/20">

        {/* Header - "Detailed Information Page" Style */}
        <div className="bg-slate-900 text-white p-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-3xl font-bold">T{tableNumber}</span>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
                  Order Details <span className="text-blue-400">#{order.orderNumber || order._id?.slice(-5)}</span>
                </h2>
                <p className="text-slate-400 text-sm font-medium flex items-center gap-2">
                  <FiClock className="w-4 h-4" /> Started at {formatDate(order.createdAt)}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all text-white border border-white/10"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          {/* Progress Tracker Layer */}
          <div className="mt-6 flex items-center gap-2 px-1">
            {['Pending', 'Preparing', 'Ready', 'Served'].map((step, idx) => {
              const isActive = order.status?.toLowerCase() === step.toLowerCase();
              return (
                <React.Fragment key={step}>
                  <div className={`flex items-center gap-2 ${isActive ? 'text-blue-400' : 'text-slate-500'}`}>
                    <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-blue-400 animate-pulse' : 'bg-slate-700'}`} />
                    <span className="text-[11px] font-bold uppercase tracking-widest">{step}</span>
                  </div>
                  {idx < 3 && <div className="flex-1 h-[1px] bg-slate-800" />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Filters Section */}
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center gap-3">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Filter items..."
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>
          <div className="px-3 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold uppercase tracking-tight flex items-center gap-2 border border-blue-100">
            <FiActivity className="w-3 h-3" /> Live
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">

          {/* Navigation/Quick Info Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm cursor-pointer hover:border-blue-200 transition-colors"
              onClick={() => { onClose(); navigate(`/staff-details/${order.waiterId?._id}`); }}>
              <div className="flex items-center gap-2 mb-1">
                <FiUserCheck className="text-blue-600" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Waiter</span>
              </div>
              <p className="font-bold text-gray-900 truncate">
                {order.waiterId?.fullName || order.waiterId?.name || 'Unassigned'}
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm cursor-pointer hover:border-green-200 transition-colors"
              onClick={() => { onClose(); navigate(`/customers`); }}>
              <div className="flex items-center gap-2 mb-1">
                <FiUser className="text-green-600" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</span>
              </div>
              <p className="font-bold text-gray-900 truncate">
                {order.customerId?.name || order.customerName || 'Walk-in'}
              </p>
            </div>
          </div>

          {/* Items List */}
          <div className="space-y-3">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Order Summary</h3>

            <div className="space-y-2">
              {filteredItems.length > 0 ? filteredItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center font-black text-blue-600">
                      {item.qty || item.quantity}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">{item.name || item.itemName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border border-current uppercase ${getStatusColor(item.status || 'pending')}`}>
                          {item.status || 'pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-gray-900">₹{(item.price * (item.qty || item.quantity)).toFixed(2)}</p>
                  </div>
                </div>
              )) : (
                <div className="text-center py-10">
                  <p className="text-gray-400">No items found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100 bg-white flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Total Amount</p>
            <p className="text-2xl font-black text-slate-900 leading-tight">
              ₹{order.total?.toLocaleString() || '0.00'}
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-2xl transition-all font-bold"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                navigate(`/close-table?orderId=${order._id}&tableNumber=${tableNumber}`);
              }}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl transition-all font-bold shadow-xl shadow-blue-500/20 flex items-center gap-3"
            >
              Settlement <FiArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
      `}} />
    </div>
  );
};

ServingSummaryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  tableNumber: PropTypes.number,
  order: PropTypes.object,
  location: PropTypes.string,
};

ServingSummaryModal.defaultProps = {
  tableNumber: null,
  order: null,
  location: 'indoor',
};

export default ServingSummaryModal;
