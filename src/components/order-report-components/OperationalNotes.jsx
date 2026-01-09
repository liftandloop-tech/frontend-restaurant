// import React from "react";

// /**
//  * OperationalNotes component displays operational alerts and issues
//  *
//  * Features:
//  * - Warning icon and title
//  * - Bullet point list of issues
//  * - Action buttons for resolution
//  * - Responsive design
//  */
// const OperationalNotes = () => {
//   const operationalIssues = [
//     "3 delayed orders flagged by staff.",
//     "2 online orders refunded (₹560 total).",
//     "1 takeaway order still pending sync.",
//   ];

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       {/* Section Header */}
//       <div className="flex items-center space-x-3 mb-6">
//         <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
//           <svg
//             className="w-5 h-5 text-yellow-600"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path
//               fillRule="evenodd"
//               d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </div>
//         <h3 className="text-lg font-semibold text-gray-900">
//           Operational Notes
//         </h3>
//       </div>

//       {/* Issues List */}
//       <div className="space-y-3 mb-6">
//         {operationalIssues.map((issue, index) => (
//           <div key={index} className="flex items-start space-x-3">
//             <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
//             <p className="text-sm text-gray-700 leading-relaxed">{issue}</p>
//           </div>
//         ))}
//       </div>

//       {/* Action Buttons */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         <button className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
//           Resolve Issues
//         </button>
//         <button className="flex-1 border border-blue-200 text-blue-600 text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200">
//           View Order Log
//         </button>
//       </div>

//       {/* Additional Info */}
//       <div className="mt-4 pt-4 border-t border-gray-100">
//         <p className="text-xs text-gray-500 text-center">
//           Issues are automatically flagged based on order status and customer
//           feedback
//         </p>
//       </div>
//     </div>
//   );
// };

// export default OperationalNotes;
