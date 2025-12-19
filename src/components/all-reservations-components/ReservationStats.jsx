import React from 'react';

const ReservationStats = ({ stats }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center my-6 bg-gray-50 p-4 rounded-lg">
      <div className="flex items-center mb-4 md:mb-0">
        <span className="text-gray-600 mr-2">Total Reservations:</span>
        <span className="font-semibold text-lg">{stats.total}</span>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col items-center bg-green-100 px-4 py-2 rounded-md">
          <span className="font-bold text-green-700">{stats.checkedIn}</span>
          <span className="text-sm text-green-600">Checked-in</span>
        </div>
        
        <div className="flex flex-col items-center bg-blue-100 px-4 py-2 rounded-md">
          <span className="font-bold text-blue-700">{stats.upcoming}</span>
          <span className="text-sm text-blue-600">Upcoming</span>
        </div>
        
        <div className="flex flex-col items-center bg-red-100 px-4 py-2 rounded-md">
          <span className="font-bold text-red-700">{stats.cancelled}</span>
          <span className="text-sm text-red-600">Cancelled</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationStats;