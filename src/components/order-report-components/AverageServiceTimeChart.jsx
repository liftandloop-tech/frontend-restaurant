// import React from "react";

// /**
//  * AverageServiceTimeChart component displays a line chart showing service time trends
//  *
//  * Features:
//  * - Line chart with service time data by day
//  * - Y-axis with time labels
//  * - X-axis with day labels
//  * - Summary statistics below chart
//  * - Responsive design
//  */
// const AverageServiceTimeChart = ({ data }) => {
//   const avgTime = data?.metrics?.avgServiceTimeMinutes || 0;

//   // Placeholder for daily data if not available in backend yet
//   // We can try to map from data.data if it contains orders with dates, 
//   // but simpler to just show the main metric for now as per instructions to remove mock data.
//   // We will show a simplified view or just the metric.

//   return (
//     <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
//       <h3 className="text-lg font-semibold text-gray-900 mb-6">
//         Average Service Time
//       </h3>

//       <div className="flex items-center justify-center h-40">
//         <div className="text-center">
//           <span className="text-5xl font-bold text-blue-600">{avgTime}</span>
//           <span className="text-xl text-gray-500 ml-2">min</span>
//           <p className="text-sm text-gray-400 mt-2">Average time to complete an order</p>
//         </div>
//       </div>

//       <div className="mt-6 pt-4 border-t border-gray-100">
//         <div className="flex flex-wrap justify-between text-sm text-gray-600">
//           <span>
//             Target: <span className="font-semibold text-gray-900">20m</span>
//           </span>
//           <span>
//             Status: <span className={`font-semibold ${avgTime <= 20 ? 'text-green-600' : 'text-red-600'}`}>
//               {avgTime <= 20 ? 'On Track' : 'Needs Improvement'}
//             </span>
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AverageServiceTimeChart;
