// import React from "react";

// /**
//  * FastestServerCard component displays information about the top performing server
//  *
//  * Features:
//  * - Server avatar with initials
//  * - Performance metrics
//  * - Top performer badge
//  * - Customer rating display
//  * - Responsive design
//  */
// const FastestServerCard = ({ data }) => {
//   const server = data?.metrics?.fastestServer || { name: 'N/A', orders: 0 };
//   const avgServiceTime = data?.metrics?.avgServiceTimeMinutes || 0;

//   const serverData = {
//     name: server.name === 'N/A' ? 'No Data' : server.name,
//     initials: server.name === 'N/A' ? 'NA' : server.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
//     title: "Top Performer",
//     avgServiceTime: `${avgServiceTime} min`,
//     ordersServed: server.orders || server.count || 0, // Backend might return .orders or .count
//     customerRating: 4.8, // Default
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, index) => (
//       <span
//         key={index}
//         className={`text-sm ${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
//           }`}
//       >
//         ★
//       </span>
//     ));
//   };

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       {/* Card Title */}
//       <h3 className="text-lg font-semibold text-gray-900 mb-6">
//         Fastest Server This Week
//       </h3>

//       {/* Server Info */}
//       <div className="space-y-6">
//         {/* Server Profile */}
//         <div className="flex items-center space-x-4">
//           {/* Avatar */}
//           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//             <span className="text-white font-semibold text-lg">
//               {serverData.initials}
//             </span>
//           </div>

//           {/* Name and Badge */}
//           <div className="flex-1">
//             <div className="flex items-center space-x-2">
//               <h4 className="font-semibold text-gray-900">{serverData.name}</h4>
//               <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">
//                 <svg
//                   className="w-3 h-3"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//                 <span>{serverData.title}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Performance Metrics */}
//         <div className="space-y-4">
//           {/* Average Service Time */}
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Avg. Service Time:</span>
//             <span className="text-sm font-semibold text-gray-900">
//               {serverData.avgServiceTime}
//             </span>
//           </div>

//           {/* Orders Served */}
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Orders Served:</span>
//             <span className="text-sm font-semibold text-gray-900">
//               {serverData.ordersServed}
//             </span>
//           </div>

//           {/* Customer Rating */}
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Customer Rating:</span>
//             <div className="flex items-center space-x-1">
//               <div className="flex">
//                 {renderStars(serverData.customerRating)}
//               </div>
//               <span className="text-sm font-semibold text-gray-900 ml-1">
//                 {serverData.customerRating}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Performance Indicator */}
//         <div className="pt-4 border-t border-gray-100">
//           <div className="flex items-center justify-center space-x-2 text-sm text-green-600">
//             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//               <path
//                 fillRule="evenodd"
//                 d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                 clipRule="evenodd"
//               />
//             </svg>
//             <span className="font-medium">15% faster than team average</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FastestServerCard;
