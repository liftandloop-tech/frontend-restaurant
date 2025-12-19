// import React, { useState, useMemo } from "react";
// import {
//   Header,
//   ActiveOrdersList,
//   OrderDetailsPanel,
// } from "./components/online-order-components";

// /**
//  * Online Orders main page component
//  * Manages the state and interactions for the online orders management interface
//  */
// const OnlineOrder = () => {
//   // State management
//   const [selectedOrders, setSelectedOrders] = useState([]);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sourceFilter, setSourceFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Mock data - In a real application, this would come from an API
//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       orderId: "#ORD-1234",
//       source: "Zomato",
//       status: "New",
//       customerName: "Rajesh Kumar",
//       phoneNumber: "+91 98765 43210",
//       eta: 35,
//       timeElapsed: 2,
//       partnerRef: "ZOM-789456",
//       totalAmount: 485,
//       paymentMethod: "Prepaid",
//       orderTime: new Date(),
//       customer: {
//         name: "Rajesh Kumar",
//         phone: "+91 98765 43210",
//         address: "A-204, Sunshine Apartments, Sector 15, Noida - 201301",
//         specialInstructions: "Ring the bell twice. No spicy food.",
//       },
//       items: [
//         {
//           name: "Butter Chicken",
//           quantity: 2,
//           unitPrice: 180,
//           totalPrice: 360,
//           description: "Extra spicy, No onions",
//         },
//         {
//           name: "Garlic Naan",
//           quantity: 3,
//           unitPrice: 35,
//           totalPrice: 105,
//           description: "Well done",
//         },
//         {
//           name: "Basmati Rice",
//           quantity: 1,
//           unitPrice: 45,
//           totalPrice: 45,
//           description: "",
//         },
//       ],
//       summary: {
//         subtotal: 510,
//         cgstRate: 9,
//         cgst: 45.9,
//         sgstRate: 9,
//         sgst: 45.9,
//         platformFee: -116.8,
//         deliveryFee: 0,
//         total: 485.0,
//       },
//       rider: null,
//     },
//     {
//       id: 2,
//       orderId: "#ORD-1235",
//       source: "Swiggy",
//       status: "Preparing",
//       customerName: "Priya Sharma",
//       phoneNumber: "+91 87654 32109",
//       eta: 25,
//       timeElapsed: 15,
//       partnerRef: "SWG-123789",
//       totalAmount: 320,
//       paymentMethod: "COD",
//       orderTime: new Date(Date.now() - 15 * 60000),
//       customer: {
//         name: "Priya Sharma",
//         phone: "+91 87654 32109",
//         address: "B-45, Green Valley, Sector 12, Noida - 201301",
//         specialInstructions: "Call before delivery",
//       },
//       items: [
//         {
//           name: "Chicken Biryani",
//           quantity: 1,
//           unitPrice: 250,
//           totalPrice: 250,
//           description: "Medium spicy",
//         },
//         {
//           name: "Raita",
//           quantity: 1,
//           unitPrice: 50,
//           totalPrice: 50,
//           description: "",
//         },
//         {
//           name: "Salad",
//           quantity: 1,
//           unitPrice: 20,
//           totalPrice: 20,
//           description: "",
//         },
//       ],
//       summary: {
//         subtotal: 320,
//         cgstRate: 9,
//         cgst: 28.8,
//         sgstRate: 9,
//         sgst: 28.8,
//         platformFee: -57.6,
//         deliveryFee: 0,
//         total: 320.0,
//       },
//       rider: "Delivery Partner #123",
//     },
//     {
//       id: 3,
//       orderId: "#ORD-1236",
//       source: "UberEats",
//       status: "Ready",
//       customerName: "Amit Singh",
//       phoneNumber: "+91 76543 21098",
//       eta: 10,
//       timeElapsed: 30,
//       partnerRef: "UBR-456123",
//       totalAmount: 180,
//       paymentMethod: "Prepaid",
//       orderTime: new Date(Date.now() - 30 * 60000),
//       customer: {
//         name: "Amit Singh",
//         phone: "+91 76543 21098",
//         address: "C-78, Royal Heights, Sector 8, Noida - 201301",
//         specialInstructions: "",
//       },
//       items: [
//         {
//           name: "Margherita Pizza",
//           quantity: 1,
//           unitPrice: 150,
//           totalPrice: 150,
//           description: "Extra cheese",
//         },
//         {
//           name: "Coca Cola",
//           quantity: 1,
//           unitPrice: 30,
//           totalPrice: 30,
//           description: "",
//         },
//       ],
//       summary: {
//         subtotal: 180,
//         cgstRate: 9,
//         cgst: 16.2,
//         sgstRate: 9,
//         sgst: 16.2,
//         platformFee: -32.4,
//         deliveryFee: 0,
//         total: 180.0,
//       },
//       rider: "Delivery Partner #456",
//     },
//   ]);

//   // Filtered orders based on search and filters
//   const filteredOrders = useMemo(() => {
//     return orders.filter((order) => {
//       // Search filter
//       const matchesSearch =
//         searchTerm === "" ||
//         order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         order.phoneNumber.includes(searchTerm);

//       // Source filter
//       const matchesSource =
//         sourceFilter === "all" ||
//         order.source.toLowerCase() === sourceFilter.toLowerCase();

//       // Status filter
//       const matchesStatus =
//         statusFilter === "all" ||
//         order.status.toLowerCase() === statusFilter.toLowerCase();

//       return matchesSearch && matchesSource && matchesStatus;
//     });
//   }, [orders, searchTerm, sourceFilter, statusFilter]);

//   // Event handlers
//   const handleOrderSelect = (orderId, isSelected) => {
//     if (isSelected) {
//       setSelectedOrders((prev) => [...prev, orderId]);
//     } else {
//       setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
//     }
//   };

//   const handleOrderClick = (order) => {
//     setSelectedOrder(order);
//   };

//   const handleBulkAccept = () => {
//     // Update orders status to 'preparing'
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         selectedOrders.includes(order.id)
//           ? { ...order, status: "Preparing" }
//           : order
//       )
//     );
//     setSelectedOrders([]);
//   };

//   const handlePrintKOTs = () => {
//     // In a real application, this would trigger printing
//     console.log("Printing KOTs for orders:", selectedOrders);
//     alert(`Printing KOTs for ${selectedOrders.length} orders`);
//   };

//   const handleSyncNow = () => {
//     // In a real application, this would sync with external platforms
//     console.log("Syncing orders with external platforms");
//     alert("Orders synced successfully!");
//   };

//   const handleAccept = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId ? { ...order, status: "Preparing" } : order
//       )
//     );
//     // Update selected order if it's the one being accepted
//     if (selectedOrder && selectedOrder.id === orderId) {
//       setSelectedOrder((prev) => ({ ...prev, status: "Preparing" }));
//     }
//   };

//   const handleReject = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.filter((order) => order.id !== orderId)
//     );
//     // Clear selected order if it's the one being rejected
//     if (selectedOrder && selectedOrder.id === orderId) {
//       setSelectedOrder(null);
//     }
//   };

//   const handleStatusUpdate = (orderId, newStatus) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId ? { ...order, status: newStatus } : order
//       )
//     );
//     // Update selected order if it's the one being updated
//     if (selectedOrder && selectedOrder.id === orderId) {
//       setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
//     }
//   };

//   const handlePrintKOT = (orderId) => {
//     console.log("Printing KOT for order:", orderId);
//     alert(`Printing KOT for order ${orderId}`);
//   };

//   const handlePrintReceipt = (orderId) => {
//     console.log("Printing receipt for order:", orderId);
//     alert(`Printing receipt for order ${orderId}`);
//   };

//   return (
//     <div className="scrollbar-hide bg-gray-50">
//       {/* Header */}
//       <div className="w-full mx-auto">
//         <Header
//           selectedCount={selectedOrders.length}
//           onBulkAccept={handleBulkAccept}
//           onPrintKOTs={handlePrintKOTs}
//           onSyncNow={handleSyncNow}
//           onSourceFilter={setSourceFilter}
//           onStatusFilter={setStatusFilter}
//           onSearch={setSearchTerm}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="w-[95%] mx-auto p-4 lg:p-6">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 h-[calc(100vh-160px)] lg:h-[calc(100vh-180px)]">
//           {/* Left Panel - Active Orders */}
//           <div className="h-full">
//             <ActiveOrdersList
//               orders={filteredOrders}
//               selectedOrders={selectedOrders}
//               onOrderSelect={handleOrderSelect}
//               onOrderClick={handleOrderClick}
//             />
//           </div>

//           {/* Right Panel - Order Details */}
//           <div className="h-full">
//             <OrderDetailsPanel
//               selectedOrder={selectedOrder}
//               onAccept={handleAccept}
//               onReject={handleReject}
//               onStatusUpdate={handleStatusUpdate}
//               onPrintKOT={handlePrintKOT}
//               onPrintReceipt={handlePrintReceipt}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OnlineOrder;
