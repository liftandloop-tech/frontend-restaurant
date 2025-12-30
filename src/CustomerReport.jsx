import React, { useState, useMemo } from "react";
import {
  CustomerManagement,
  //CustomerSegments,
} from "./components/customer-dashboard-components";
import AddCustomer from "./AddCustomer";
import {
  useGetCustomersQuery,
  useGetFeedbacksQuery,
  useCreateCustomerMutation,
  useDeleteCustomerMutation
} from "./features/customers/customersApiSlice";

/**
 * CustomerReport - Customer Management Page
 *
 * This component renders a comprehensive customer management dashboard with:
 * - Customer CRUD operations, table view, and segments
 * - Add customer functionality with modal
 * - Real-time customer data from backend
 *
 * The dashboard is fully responsive and uses Tailwind CSS for styling.
 * All components are modular and reusable with proper prop handling.
 */
const CustomerReport = () => {
  // State for AddCustomer modal
  const [isAddCustomerModalOpen, setIsAddCustomerModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // RTK Query hooks
  const { data: customersResponse, isLoading: customersLoading } = useGetCustomersQuery({ isActive: true });
  const { data: feedbackResponse } = useGetFeedbacksQuery();
  const [createCustomerApi] = useCreateCustomerMutation();
  const [deleteCustomerApi] = useDeleteCustomerMutation();

  // Transform customers data
  const customers = useMemo(() => {
    if (!customersResponse?.success || !customersResponse?.data) return [];

    return customersResponse.data.map((customer) => {
      const lastVisit = customer.lastVisit
        ? new Date(customer.lastVisit).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
        : "Never";

      const avgSpend = customer.totalOrders > 0
        ? `₹${Math.round(customer.totalSpent / customer.totalOrders)}`
        : "₹0";

      const rating = customer.loyaltyPoints > 0
        ? Math.min(5, Math.max(1, (customer.loyaltyPoints / 200) + 3))
        : 0;

      return {
        id: customer._id,
        name: customer.name,
        phone: customer.phone,
        email: customer.email || "",
        visits: customer.totalOrders || 0,
        lastVisit: lastVisit,
        avgSpend: avgSpend,
        rating: rating,
        status: customer.isVIP ? 'VIP' : (customer.totalOrders > 5 ? 'Regular' : 'Walk-in'),
        isVIP: customer.isVIP,
        revenueCardEnabled: customer.revenueCardEnabled,
        revenueCardNumber: customer.revenueCardNumber,
        revenueCardBalance: customer.revenueCardBalance,
        totalSpent: customer.totalSpent || 0,
        loyaltyPoints: customer.loyaltyPoints || 0,
        isActive: customer.isActive,
        createdAt: customer.createdAt
      };
    });
  }, [customersResponse]);

  // Transform feedback for the overview component
  const transformedFeedback = useMemo(() => {
    const feedbackData = feedbackResponse?.success ? feedbackResponse.data : [];
    const feedbackResult = {
      distribution: { positive: 0, neutral: 0, negative: 0 },
      recentFeedback: []
    };

    if (!feedbackData || feedbackData.length === 0) return feedbackResult;

    const total = feedbackData.length;
    const pos = feedbackData.filter(f => f.rating >= 4).length;
    const neu = feedbackData.filter(f => f.rating === 3).length;
    const neg = feedbackData.filter(f => f.rating <= 2).length;

    return {
      distribution: {
        positive: total > 0 ? Math.round((pos / total) * 100) : 0,
        neutral: total > 0 ? Math.round((neu / total) * 100) : 0,
        negative: total > 0 ? Math.round((neg / total) * 100) : 0,
      },
      recentFeedback: feedbackData.slice(0, 10).map(f => ({
        customerName: f.customerName,
        rating: f.rating,
        comment: f.comment,
        date: new Date(f.createdAt).toLocaleDateString()
      }))
    };
  }, [feedbackResponse]);

  // Derived segments from real data
  const segments = useMemo(() => {
    if (!customers || customers.length === 0) return [];

    return [
      {
        type: "vip",
        count: customers.filter(c => c.isVIP).length,
        title: "VIP Customers",
        description: "Premium members",
        metric: `Avg Spend: ₹${Math.round(customers.filter(c => c.isVIP).reduce((acc, c) => acc + (c.totalSpent || 0), 0) / Math.max(1, customers.filter(c => c.isVIP).length))}`,
      },
      {
        type: "highSpenders",
        count: customers.filter(c => (c.totalSpent || 0) > 5000).length,
        title: "High Spenders",
        description: "Spend > ₹5000",
        metric: "Top Tier",
      },
      {
        type: "newCustomers",
        count: customers.filter(c => {
          const createdAt = new Date(c.createdAt);
          const now = new Date();
          return (now - createdAt) / (1000 * 60 * 60 * 24) <= 30;
        }).length,
        title: "New Customers",
        description: "Joined last 30 days",
        metric: "Growing",
      }
    ];
  }, [customers]);

  // Handler to open Add Customer modal
  const handleAddCustomer = () => {
    setIsAddCustomerModalOpen(true);
    setError("");
    setSuccess("");
  };

  // Handler to close Add Customer modal
  const handleCloseAddCustomerModal = () => {
    setIsAddCustomerModalOpen(false);
    setError("");
    setSuccess("");
  };

  // Handle customer submission from AddCustomer modal
  const handleCustomerSubmit = async (customerData) => {
    try {
      setError("");
      setSuccess("");

      const response = await createCustomerApi(customerData).unwrap();

      if (response.success) {
        setSuccess("Customer added successfully!");
        // Close modal after 1.5 seconds
        setTimeout(() => {
          setIsAddCustomerModalOpen(false);
          setSuccess("");
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      setError(error.data?.message || error.message || "Failed to add customer. Please try again.");
    }
  };

  // Handle edit customer
  const handleEditCustomer = (customer) => {
    // Logic to open edit modal or navigate to edit page
    console.log("Edit customer:", customer);
  };

  // Handle delete customer
  const handleDeleteCustomer = async (customer) => {
    if (window.confirm(`Are you sure you want to delete ${customer.name}?`)) {
      try {
        const response = await deleteCustomerApi(customer.id).unwrap();
        if (response.success) {
          setSuccess("Customer deleted successfully");
          setTimeout(() => setSuccess(""), 3000);
        }
      } catch (err) {
        console.error("Error deleting customer:", err);
        setError("Failed to delete customer");
        setTimeout(() => setError(""), 3000);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Customer Management Section */}
        <CustomerManagement
          customers={customers}
          feedbackData={transformedFeedback}
          onAddCustomer={handleAddCustomer}
          onEditCustomer={handleEditCustomer}
          onDeleteCustomer={handleDeleteCustomer}
          loading={customersLoading}
        />

        {/* Customer Segments Section
        <CustomerSegments segments={segments} /> */}

        {/* AddCustomer Modal */}
        <AddCustomer
          isOpen={isAddCustomerModalOpen}
          onClose={handleCloseAddCustomerModal}
          onSubmit={handleCustomerSubmit}
          error={error}
          success={success}
        />
      </div>
    </div>
  );
};

export default CustomerReport;
