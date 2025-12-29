import React from "react";

const POTable = ({ data = [] }) => {
    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">PO Number</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Vendor</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Total Amount</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Order Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No purchase orders found</td>
                        </tr>
                    ) : (
                        data.map((po) => (
                            <tr key={po._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{po.poNumber}</td>
                                <td className="px-6 py-4 text-gray-700">{po.vendorId?.name || 'N/A'}</td>
                                <td className="px-6 py-4 text-gray-900 font-semibold">₹{po.totalAmount}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{new Date(po.orderDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${po.status === 'received' ? 'bg-green-100 text-green-700' :
                                        po.status === 'ordered' ? 'bg-blue-100 text-blue-700' :
                                            po.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {po.status}
                                    </span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default POTable;
