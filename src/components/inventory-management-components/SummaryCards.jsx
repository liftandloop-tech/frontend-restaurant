// import React from "react";

// /**
//  * SummaryCards component for displaying key inventory metrics at the bottom of the page
//  * @param {object} stats - Object containing summary statistics
//  */
// const SummaryCards = ({ stats }) => {
//   // Define the summary cards data
//   const cards = [
//     {
//       label: "Total Items",
//       value: stats.totalItems,
//       icon: "📦",
//       iconClass: "blue",
//       valueClass: "",
//     },
//     {
//       label: "Low Stock",
//       value: stats.lowStock,
//       icon: "⚠️",
//       iconClass: "orange",
//       valueClass: "orange",
//     },
//     {
//       label: "Out of Stock",
//       value: stats.outOfStock,
//       icon: "❌",
//       iconClass: "red",
//       valueClass: "red",
//     },
//   ];

//   return (
//     <div className="grid grid-cols-3 w-[90%] mx-auto gap-4 p-4 bg-gray-50">
//       {cards.map((card, index) => (
//         <div
//           key={index}
//           className="bg-white rounded-lg px-6 shadow-sm py-7 flex items-center gap-3"
//         >
//           {/* Card Icon */}
//           <div
//             className={`w-8 h-8 rounded-md flex items-center justify-center text-lg ${
//               card.iconClass === "blue"
//                 ? "bg-blue-100 text-blue-700"
//                 : card.iconClass === "orange"
//                 ? "bg-orange-100 text-orange-700"
//                 : card.iconClass === "red"
//                 ? "bg-red-100 text-red-700"
//                 : card.iconClass === "green"
//                 ? "bg-green-100 text-green-700"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {card.icon}
//           </div>

//           {/* Card Content */}
//           <div className="flex-1">
//             <p className="text-xs text-gray-500 font-medium mb-1">
//               {card.label}
//             </p>
//             <p
//               className={`text-xl font-bold leading-none ${
//                 card.valueClass === "orange"
//                   ? "text-orange-600"
//                   : card.valueClass === "red"
//                   ? "text-red-600"
//                   : "text-gray-900"
//               }`}
//             >
//               {card.value}
//             </p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SummaryCards;
