import React from "react";

/**
 * TopPerformingOffers component displays ranked list of best performing offers
 * Shows top 3 offers with their performance metrics and revenue impact
 */
const TopPerformingOffers = () => {
  const topOffers = [
    {
      rank: 1,
      name: "Weekend Special",
      description: "25% off all items",
      revenue: "₹18,450",
    },
    {
      rank: 2,
      name: "Happy Hour",
      description: "Buy 1 Get 1 free",
      revenue: "₹12,230",
    },
    {
      rank: 3,
      name: "Loyalty Reward",
      description: "₹200 off for VIP",
      revenue: "₹8,920",
    },
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Top Performing Offers
      </h3>

      <div className="space-y-4 mb-6">
        {topOffers.map((offer) => (
          <div
            key={offer.rank}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">
                {offer.rank}
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{offer.name}</h4>
              <p className="text-sm text-gray-500">{offer.description}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-green-600">
                {offer.revenue} Revenue
              </p>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-2 px-4 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200">
        View Full Analytics
      </button>
    </div>
  );
};

export default TopPerformingOffers;
