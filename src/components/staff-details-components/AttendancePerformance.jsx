import React from 'react';

/**
 * Attendance & Performance Overview Component
 * Displays key metrics, progress indicators, and summary cards
 */
const AttendancePerformance = ({ 
  performanceData = {
    attendanceRate: 94,
    punctualityScore: 89,
    ordersHandled: 247,
    ordersGrowth: 12,
    hoursWorked: 164,
    presentDays: 23,
    absentDays: 2,
    leaveDays: 1
  },
  onViewFullAttendance
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Attendance & Performance Overview</h2>
        </div>
        <button
          onClick={onViewFullAttendance}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-200"
        >
          View Full Attendance
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* Attendance Rate */}
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-3">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-200"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-green-500"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${performanceData.attendanceRate}, 100`}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-green-600">{performanceData.attendanceRate}%</span>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900">Attendance Rate</p>
        </div>

        {/* Punctuality Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">{performanceData.punctualityScore}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${performanceData.punctualityScore}%` }}
            ></div>
          </div>
          <p className="text-sm font-medium text-gray-900">Punctuality Score</p>
        </div>

        {/* Orders Handled */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">{performanceData.ordersHandled}</span>
          </div>
          <div className="flex items-center text-sm text-green-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
            <span className="font-medium">↑ {performanceData.ordersGrowth}% vs last month</span>
          </div>
          <p className="text-sm font-medium text-gray-900">Orders Handled</p>
        </div>

        {/* Hours Worked */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">{performanceData.hoursWorked}h</span>
          </div>
          <p className="text-sm text-gray-500">This month</p>
          <p className="text-sm font-medium text-gray-900">Hours Worked</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Present Days */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{performanceData.presentDays}</p>
              <p className="text-sm font-medium text-green-800">Present Days</p>
            </div>
          </div>
        </div>

        {/* Absent Days */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">{performanceData.absentDays}</p>
              <p className="text-sm font-medium text-red-800">Absent Days</p>
            </div>
          </div>
        </div>

        {/* Leave Days */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{performanceData.leaveDays}</p>
              <p className="text-sm font-medium text-blue-800">Leave Days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendancePerformance;
