import React from "react";

const WastageTable = ({ data = [] }) => {
    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Item Name</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Reason</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Notes</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No wastage records found</td>
                        </tr>
                    ) : (
                        data.map((wastage) => (
                            <tr key={wastage._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{wastage.inventoryItemId?.name || 'N/A'}</td>
                                <td className="px-6 py-4 text-gray-700">{wastage.quantity} {wastage.inventoryItemId?.unit}</td>
                                <td className="px-6 py-4 capitalize text-gray-700">{wastage.reason}</td>
                                <td className="px-6 py-4 text-gray-600 text-sm">{new Date(wastage.date).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-gray-500 text-sm truncate max-w-xs">{wastage.notes || '-'}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default WastageTable;
