import React from "react";

/**
 * SummaryCards component displays key metrics in card format
 * Shows active offers, revenue impact, redemptions, and redemption rate
 */
const SummaryCards = () => {
  const cards = [
    {
      icon: "🏷️",
      value: "24",
      label: "Active Offers",
      change: "+12%",
      changeColor: "text-green-600",
    },
    {
      icon: "📈",
      value: "₹45,280",
      label: "Revenue Impact",
      change: "+8.3%",
      changeColor: "text-green-600",
    },
    {
      icon: "👥",
      value: "1,247",
      label: "Total Redemptions",
      change: "+15%",
      changeColor: "text-green-600",
    },
    {
      icon: "%",
      value: "68.4%",
      label: "Avg. Redemption Rate",
      change: "+2.1%",
      changeColor: "text-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 mt-8 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{card.icon}</span>
            </div>
            <span className={`text-sm font-medium ${card.changeColor}`}>
              {card.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {card.value}
            </p>
            <p className="text-sm text-gray-600">{card.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
