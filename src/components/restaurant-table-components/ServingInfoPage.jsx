import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
    FiSearch, FiUser, FiUserCheck,
    FiClock, FiArrowRight, FiFilter
} from "react-icons/fi";


const ServingInfoPage = ({ tables, onTableClick, onUpdateStatus }) => {

    const [searchQuery, setSearchQuery] = useState("");
    const [waiterFilter, setWaiterFilter] = useState("all");

    // Filter tables to only show serving and reserved statuses
    const activeTables = useMemo(() => {
        return tables.filter(t => t.status === 'serving' || t.status === 'reserved');
    }, [tables]);

    // Extract unique waiters for the filter
    const waiters = useMemo(() => {
        const list = activeTables
            .map(t => t.currentOrderId?.waiterId)
            .filter(w => w && (w.name || w.fullName));

        // De-duplicate by ID
        const unique = [];
        const map = new Map();
        for (const waiter of list) {
            if (!map.has(waiter._id)) {
                map.set(waiter._id, true);
                unique.push(waiter);
            }
        }
        return unique;
    }, [activeTables]);

    const filteredTables = useMemo(() => {
        return activeTables.filter(table => {
            const order = table.currentOrderId;
            const customerName = (order?.customerId?.name || order?.customerName || "").toLowerCase();
            const waiterName = (order?.waiterId?.fullName || order?.waiterId?.name || "").toLowerCase();
            const orderNum = (order?.orderNumber || "").toString().toLowerCase();
            const tableNum = (table.tableNumber || "").toString();

            const matchesSearch =
                customerName.includes(searchQuery.toLowerCase()) ||
                waiterName.includes(searchQuery.toLowerCase()) ||
                orderNum.includes(searchQuery.toLowerCase()) ||
                tableNum.includes(searchQuery);

            const matchesWaiter = waiterFilter === "all" || order?.waiterId?._id === waiterFilter;

            return matchesSearch && matchesWaiter;
        });
    }, [activeTables, searchQuery, waiterFilter]);

    const getStatusStyle = (status) => {
        if (status === 'serving') return "bg-blue-100 text-blue-700 border-blue-200";
        if (status === 'reserved') return "bg-amber-100 text-amber-700 border-amber-200";
        return "bg-gray-100 text-gray-700 border-gray-200";
    };

    return (
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden animate-fadeIn">
            {/* Header & Internal Filters */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                            Serving Tables Overview
                            <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest">
                                {activeTables.length} Active
                            </span>
                        </h2>
                        <p className="text-slate-500 text-sm font-medium">Real-time status of all active dining sessions</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search Customer, Order, Table..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                            />
                        </div>

                        <select
                            value={waiterFilter}
                            onChange={(e) => setWaiterFilter(e.target.value)}
                            className="px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-700"
                        >
                            <option value="all">All Waiters</option>
                            {waiters.map(w => (
                                <option key={w._id} value={w._id}>{w.fullName || w.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Tables Table/List */}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Table</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Customer</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Service Waiter</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Order Status</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Duration</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Total</th>
                            <th className="px-6 py-4 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredTables.length > 0 ? filteredTables.map((table) => {
                            const order = table.currentOrderId;
                            const startTime = new Date(order?.createdAt);
                            const now = new Date();
                            const diffMins = Math.floor((now - startTime) / 60000);

                            return (
                                <tr key={table._id} className="hover:bg-blue-50/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-110 transition-transform">
                                                T{table.tableNumber}
                                            </div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{table.location}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                                <FiUser className="w-4 h-4" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{order?.customerId?.name || order?.customerName || 'Walk-in Guest'}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">#{order?.orderNumber || order?._id?.slice(-5)}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                                <FiUserCheck className="w-4 h-4" />
                                            </div>
                                            <p className="font-bold text-slate-700">{order?.waiterId?.fullName || order?.waiterId?.name || 'Unassigned'}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border tracking-widest ${getStatusStyle(table.status)}`}>
                                            {table.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <FiClock className="w-3 h-3" />
                                            {diffMins > 60 ? `${Math.floor(diffMins / 60)}h ${diffMins % 60}m` : `${diffMins} mins`}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <p className="font-black text-slate-900">₹{order?.total?.toLocaleString() || '0.00'}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {table.status === 'serving' && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onUpdateStatus(table._id, 'reserved'); }}
                                                    className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm shadow-blue-200"
                                                    title="Mark order as fully served"
                                                >
                                                    Served
                                                </button>
                                            )}
                                            {table.status === 'reserved' && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onUpdateStatus(table._id, 'available'); }}
                                                    className="px-3 py-1.5 bg-slate-900 hover:bg-black text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                                                    title="Release table to available"
                                                >
                                                    Release
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onTableClick(table.tableNumber, order, table.location)}
                                                className="p-2 bg-gray-100 hover:bg-blue-100 text-blue-600 rounded-lg transition-all"
                                                title="View Full Order Summary"
                                            >
                                                <FiArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        }) : (
                            <tr>
                                <td colSpan="7" className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center gap-2 text-slate-400">
                                        <FiFilter className="w-10 h-10 mb-2 opacity-20" />
                                        <p className="text-lg font-bold">No active tables found</p>
                                        <p className="text-sm">Try changing your filters or checking back later.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ServingInfoPage.propTypes = {
    tables: PropTypes.array.isRequired,
    onTableClick: PropTypes.func.isRequired,
    onUpdateStatus: PropTypes.func.isRequired,
};

export default ServingInfoPage;
