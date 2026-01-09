// import React from "react";

// /**
//  * CustomerInsightsCard component displays customer feedback insights
//  *
//  * Features:
//  * - Large quotation mark icon
//  * - Customer feedback quote
//  * - Source information
//  * - Responsive design
//  */
// const CustomerInsightsCard = () => {
//   const insightData = {
//     quote: "Customers loved your quick delivery and packaging this week.",
//     source: "Generated from 164 online feedback forms.",
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       {/* Card Title */}
//       <h3 className="text-lg font-semibold text-gray-900 mb-6">
//         Customer Insights
//       </h3>

//       {/* Quote Section */}
//       <div className="space-y-4">
//         {/* Large Quotation Mark */}
//         <div className="flex justify-center">
//           <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
//             <svg
//               className="w-8 h-8 text-blue-600"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V8a1 1 0 112 0v2.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Quote Text */}
//         <div className="text-center">
//           <blockquote className="text-lg text-gray-700 italic leading-relaxed">
//             "{insightData.quote}"
//           </blockquote>
//         </div>

//         {/* Source Information */}
//         <div className="text-center pt-4 border-t border-gray-100">
//           <p className="text-sm text-gray-500">{insightData.source}</p>
//         </div>
//       </div>

//       {/* Additional Insights */}
//       <div className="mt-6 pt-4 border-t border-gray-100">
//         <div className="grid grid-cols-2 gap-4 text-center">
//           <div>
//             <div className="text-2xl font-bold text-green-600">92%</div>
//             <div className="text-xs text-gray-500">Satisfaction Rate</div>
//           </div>
//           <div>
//             <div className="text-2xl font-bold text-blue-600">4.7</div>
//             <div className="text-xs text-gray-500">Avg Rating</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustomerInsightsCard;
