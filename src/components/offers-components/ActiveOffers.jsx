import React from "react";
import OfferCard from "./OfferCard";

/**
 * ActiveOffers component displays the grid of offer cards
 * Shows all active promotional offers in a responsive grid layout
 */
const ActiveOffers = () => {
  const offers = [
    {
      id: 1,
      title: "Weekend Special",
      category: "Discount",
      description: "20% OFF",
      conditions: "On all main courses",
      validity: "Valid: Dec 23-24, 2024",
      redemptions: "124 redemptions",
      impact: "₹8,420 impact",
      status: "active",
      icon: "%",
      iconBg: "bg-purple-500",
    },
    {
      id: 2,
      title: "Happy Hour",
      category: "Time-based",
      description: "Buy 1 Get 1",
      conditions: "On all beverages",
      validity: "Daily: 4PM - 7PM",
      redemptions: "89 redemptions",
      impact: "₹5,230 impact",
      status: "active",
      icon: "🕐",
      iconBg: "bg-orange-500",
    },
    {
      id: 3,
      title: "Loyalty Reward",
      category: "Customer Segment",
      description: "₹200 OFF",
      conditions: "For VIP customers",
      validity: "Starts: Dec 25, 2024",
      redemptions: "67 redemptions",
      impact: "₹3,890 impact",
      status: "scheduled",
      icon: "⭐",
      iconBg: "bg-green-500",
    },
    {
      id: 4,
      title: "New Year Special",
      category: "Discount",
      description: "Free Dessert",
      conditions: "On orders above ₹500",
      validity: "Dec 31 - Jan 2",
      redemptions: "45 redemptions",
      impact: "₹2,150 impact",
      status: "scheduled",
      icon: "🏢",
      iconBg: "bg-blue-500",
    },
    {
      id: 5,
      title: "First Order",
      category: "Customer Segment",
      description: "15% OFF",
      conditions: "For new customers",
      validity: "Expired: Dec 15, 2024",
      redemptions: "203 redemptions",
      impact: "₹12,450 impact",
      status: "expired",
      icon: "💖",
      iconBg: "bg-pink-500",
    },
    {
      id: 6,
      title: "Birthday Special",
      category: "Customer Segment",
      description: "Free Cake",
      conditions: "On birthday month",
      validity: "Monthly offer",
      redemptions: "156 redemptions",
      impact: "₹7,820 impact",
      status: "active",
      icon: "🎂",
      iconBg: "bg-yellow-500",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Active Offers</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default ActiveOffers;
