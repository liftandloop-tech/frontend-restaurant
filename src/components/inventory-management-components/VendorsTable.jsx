import React from "react";

const VendorsTable = ({ data = [] }) => {
    return (
        <div className="w-full bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200">
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Vendor Name</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact Person</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Categories</th>
                        <th className="px-6 py-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No vendors found</td>
                        </tr>
                    ) : (
                        data.map((vendor) => (
                            <tr key={vendor._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{vendor.name}</td>
                                <td className="px-6 py-4 text-gray-700">{vendor.contactPerson || 'N/A'}</td>
                                <td className="px-6 py-4 text-gray-700">{vendor.phone}</td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {vendor.categories?.map(cat => (
                                            <span key={cat} className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full capitalize">{cat}</span>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-[11px] font-medium ${vendor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {vendor.status}
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

export default VendorsTable;
