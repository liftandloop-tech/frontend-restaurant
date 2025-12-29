import React, { useMemo } from "react";
import { useGetBillsQuery } from "../../features/bills/billsApiSlice";

/**
 * RecentBills component displays a table of recent bill entries
 */
const RecentBills = () => {
  const { data: billsResponse, isLoading, isError } = useGetBillsQuery();

  const recentBills = useMemo(() => {
    if (!billsResponse?.success || !billsResponse?.data) return [];

    return billsResponse.data.slice(0, 10).map((bill) => {
      const isPaid = bill.status === "paid";
      const paymentMethod = bill.payment?.length > 0 ? bill.payment[0].paymentMethod : "N/A";

      // Map payment method to icon
      const paymentIcons = {
        cash: { label: "Cash", icon: "💰" },
        card: { label: "Card", icon: "💳" },
        upi: { label: "UPI", icon: "📱" },
        other: { label: "Other", icon: "📝" },
      };

      const pMethod = paymentMethod.toLowerCase();
      const pConfig = paymentIcons[pMethod] || paymentIcons.other;

      return {
        id: bill.billNumber || bill._id.slice(-7).toUpperCase(),
        date: new Date(bill.createdAt).toLocaleString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: isPaid ? "Paid" : "Pending",
        statusColor: isPaid ? "text-green-600" : "text-orange-600",
        statusIcon: isPaid ? "✔" : "●",
        customer: bill.orderId?.customerName || "Walk-in Guest",
        customerType: bill.orderId?.customerId ? "Registered" : null,
        cashier: bill.waiterId?.name || bill.waiterId?.fullName || "System",
        paymentMethod: pConfig.label,
        paymentIcon: pConfig.icon,
        amount: `₹ ${bill.totalAmount.toLocaleString()}`,
        originalId: bill._id,
      };
    });
  }, [billsResponse]);

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

  if (isLoading) return <div className="p-6 text-center">Loading bills...</div>;
  if (isError) return <div className="p-6 text-center text-red-500">Error loading bills</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Bills</h3>

      {/* Bills Table */}
      <div className="space-y-4">
        {recentBills.length > 0 ? (
          recentBills.map((bill) => (
            <div
              key={bill.originalId}
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
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No bills found for the selected criteria.</div>
        )}
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
