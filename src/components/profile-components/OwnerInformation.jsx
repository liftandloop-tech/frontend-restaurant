import React from "react";

/**
 * Owner Information Component
 * Displays owner profile picture and details
 */
const OwnerInformation = ({
  ownerData = {
    name: "Ishan Bhagat",
    role: "Business Owner",
    joinedOn: "12 Jan 2024",
    status: "Active",
    profilePicture: "https://i.pravatar.cc/150?img=12",
    gender: "Male",
    contact: "+91 98765 43210",
    email: "ishan@example.com",
    address: "201, Royal Enclave, Indore, MP 452001",
    city: "Indore",
    dateOfBirth: "12 May 1996",
    alternate: "+91 98765 67890",
    state: "Madhya Pradesh",
  },
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Profile */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="relative mb-4">
            <img
              src={ownerData.profilePicture}
              alt={ownerData.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <svg
                className="w-3 h-3 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            {ownerData.name}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            {ownerData.role}
          </div>
          <p className="text-sm text-gray-500 mb-3">
            Joined On: {ownerData.joinedOn}
          </p>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm font-medium text-green-700">
              {ownerData.status}
            </span>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Gender</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.gender}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Contact</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.contact}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.email}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Address</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.address}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">City</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.city}
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Date of Birth</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.dateOfBirth}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Alternate</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.alternate}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">State</p>
              <p className="text-sm font-medium text-gray-900">
                {ownerData.state}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerInformation;
