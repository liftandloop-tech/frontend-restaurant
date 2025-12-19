import React, { useState, useEffect } from "react";
import {
  CustomerManagement,
  CustomerSegments,
} from "./components/customer-dashboard-components";
import AddCustomer from "./AddCustomer";
import { getCustomers, createCustomer } from "./utils/customers";

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

  // Customer data
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sample feedback data
  const feedbackData = {
    distribution: {
      positive: 78,
      neutral: 15,
      negative: 7,
    },
    recentFeedback: [
      {
        customerName: "Sarah Johnson",
        rating: 5,
        comment: "Amazing food and service! Will definitely come back.",
        date: "2 days ago",
      },
      {
        customerName: "Michael Chen",
        rating: 2,
        comment: "Food was okay, but service was slow.",
        date: "1 week ago",
      },
      {
        customerName: "Emily Rodriguez",
        rating: 5,
        comment:
          "Perfect dining experience. The staff was incredibly attentive.",
        date: "3 days ago",
      },
    ],
  };

  // Sample customer segments data
  const segments = [
    {
      type: "highSpenders",
      count: 24,
      title: "High Spenders",
      description: "Top 10% by spend",
      metric: "Avg Spend: ₹127",
    },
    {
      type: "frequentVisitors",
      count: 67,
      title: "Frequent Visitors",
      description: "5+ visits in 30 days",
      metric: "Avg Visits: 8.2",
    },
    {
      type: "inactive",
      count: 43,
      title: "Inactive 90 Days",
      description: "No visits recently",
      metric: "Last Visit: 3+ months",
    },
    {
      type: "newCustomers",
      count: 18,
      title: "New Customers",
      description: "First visit in 30 days",
      metric: "Avg Spend: ₹32",
    },
  ];

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await getCustomers({ isActive: true });
        if (response.success && response.data) {
          const transformedCustomers = response.data.map((customer) => {
            let status = "Walk-in";
            if (customer.loyaltyPoints >= 1000) {
              status = "VIP";
            } else if (customer.totalOrders > 5) {
              status = "Regular";
            }

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
              status: status,
              totalSpent: customer.totalSpent || 0,
              loyaltyPoints: customer.loyaltyPoints || 0,
              isActive: customer.isActive,
              createdAt: customer.createdAt
            };
          });
          setCustomers(transformedCustomers);
        }
      } catch (err) {
        console.error("Error fetching customers:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

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

      const response = await createCustomer(customerData);

      if (response.success) {
        setSuccess("Customer added successfully!");
        // Refresh customer list
        const updatedResponse = await getCustomers({ isActive: true });
        if (updatedResponse.success && updatedResponse.data) {
          const transformedCustomers = updatedResponse.data.map((customer) => {
            let status = "Walk-in";
            if (customer.loyaltyPoints >= 1000) {
              status = "VIP";
            } else if (customer.totalOrders > 5) {
              status = "Regular";
            }

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
              status: status,
              totalSpent: customer.totalSpent || 0,
              loyaltyPoints: customer.loyaltyPoints || 0,
              isActive: customer.isActive,
              createdAt: customer.createdAt
            };
          });
          setCustomers(transformedCustomers);
        }

        // Close modal after 1.5 seconds
        setTimeout(() => {
          setIsAddCustomerModalOpen(false);
          setSuccess("");
        }, 1500);
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      setError(error.message || "Failed to add customer. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Customer Management Section */}
        <CustomerManagement
          customers={customers}
          feedbackData={feedbackData}
          onAddCustomer={handleAddCustomer}
          loading={loading}
        />

        {/* Customer Segments Section */}
        <CustomerSegments segments={segments} />

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
