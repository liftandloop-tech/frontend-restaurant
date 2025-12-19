import React from "react";

/**
 * RecentBills component displays a table of recent bill entries
 *
 * Features:
 * - Bill number, date, and status
 * - Customer information and cashier details
 * - Payment method and amount
 * - Action buttons (View Invoice, Print)
 * - Show more bills button
 * - Responsive table design
 */
const RecentBills = () => {
  const recentBills = [
    {
      id: "BILL-02945",
      date: "05 Oct 2025 - 8:42 PM",
      status: "Paid",
      statusColor: "text-green-600",
      statusIcon: "✔",
      customer: "Aditi Verma",
      customerType: "Returning",
      cashier: "Ramesh",
      paymentMethod: "UPI",
      paymentIcon: "💳",
      amount: "₹ 1,260",
    },
    {
      id: "BILL-02944",
      date: "05 Oct 2025 - 7:15 PM",
      status: "Paid",
      statusColor: "text-green-600",
      statusIcon: "✔",
      customer: "Rahul Sharma",
      customerType: null,
      cashier: "Priya",
      paymentMethod: "Cash",
      paymentIcon: "💰",
      amount: "₹ 850",
    },
    {
      id: "BILL-02943",
      date: "05 Oct 2025 - 6:30 PM",
      status: "Pending",
      statusColor: "text-orange-600",
      statusIcon: "●",
      customer: "Sneha Patel",
      customerType: null,
      cashier: "Ramesh",
      paymentMethod: "Card",
      paymentIcon: "💳",
      amount: "₹ 1,450",
    },
  ];

  const handleViewInvoice = (billId) => {
    console.log(`Viewing invoice for ${billId}`);
    // Implement view invoice functionality
  };

  const handlePrint = (billId) => {
    console.log(`Printing bill ${billId}`);
    // Implement print functionality
  };

  const handleShowMore = () => {
    console.log("Loading next 20 bills...");
    // Implement show more functionality
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Bills</h3>

      {/* Bills Table */}
      <div className="space-y-4">
        {recentBills.map((bill, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left Section - Bill Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">#{bill.id}</span>
                    <span className="text-sm text-gray-500">{bill.date}</span>
                  </div>
                  <div
                    className={`flex items-center gap-1 ${bill.statusColor}`}
                  >
                    <span>{bill.statusIcon}</span>
                    <span className="text-sm font-medium">{bill.status}</span>
                  </div>
                </div>

                {/* Customer and Cashier Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {bill.customer}
                    </span>
                    {bill.customerType && (
                      <span className="text-gray-500">
                        ({bill.customerType})
                      </span>
                    )}
                  </div>
                  <div className="text-gray-600">Cashier - {bill.cashier}</div>
                </div>
              </div>

              {/* Right Section - Payment and Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                {/* Payment Info */}
                <div className="flex items-center gap-2">
                  <span className="text-lg">{bill.paymentIcon}</span>
                  <span className="text-sm text-gray-600">
                    Payment {bill.paymentMethod}
                  </span>
                </div>

                {/* Amount */}
                <div className="text-xl font-bold text-gray-900">
                  {bill.amount}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleViewInvoice(bill.id)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    View Invoice
                  </button>
                  <button
                    onClick={() => handlePrint(bill.id)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
                  >
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleShowMore}
          className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200"
        >
          Show More Bills (load next 20)
        </button>
      </div>
    </div>
  );
};

export default RecentBills;
