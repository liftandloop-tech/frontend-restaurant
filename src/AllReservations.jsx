import React, { useState } from "react";
import ReservationTable from "./components/all-reservations-components/ReservationTable";
import FilterTabs from "./components/all-reservations-components/FilterTabs";
import SearchBar from "./components/all-reservations-components/SearchBar";
import ReservationStats from "./components/all-reservations-components/ReservationStats";
import Pagination from "./components/all-reservations-components/Pagination";
import ActionButtons from "./components/all-reservations-components/ActionButtons";

const AllReservations = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for reservations
  const reservationsData = [
    {
      id: 1,
      customer: {
        name: "Sarah Johnson",
        phone: "+1 (555) 123-4567",
      },
      date: "Today, 7:30 PM",
      dateInfo: "Dec 15, 2023",
      table: "Table 12",
      capacity: 4,
      partySize: 4,
      staff: "Mike Chen",
      status: "checked-in",
    },
    {
      id: 2,
      customer: {
        name: "Michael Rodriguez",
        phone: "+1 (555) 987-6543",
      },
      date: "Today, 8:00 PM",
      dateInfo: "Dec 15, 2023",
      table: "Table 8",
      capacity: 2,
      partySize: 2,
      staff: "Unassigned",
      status: "upcoming",
    },
    {
      id: 3,
      customer: {
        name: "Emily Davis",
        phone: "+1 (555) 456-7890",
      },
      date: "Tomorrow, 6:30 PM",
      dateInfo: "Dec 16, 2023",
      table: "Table 15",
      capacity: 6,
      partySize: 6,
      staff: "Lisa Wong",
      status: "upcoming",
    },
    {
      id: 4,
      customer: {
        name: "David Thompson",
        phone: "+1 (555) 234-5678",
      },
      date: "Dec 13, 7:00 PM",
      dateInfo: "Completed",
      table: "Table 5",
      capacity: 4,
      partySize: 3,
      staff: "Alex Kim",
      status: "completed",
    },
    {
      id: 5,
      customer: {
        name: "Jennifer Wilson",
        phone: "+1 (555) 345-6789",
      },
      date: "Dec 14, 8:30 PM",
      dateInfo: "Cancelled",
      table: "Table 20",
      capacity: 8,
      partySize: 8,
      staff: "Unassigned",
      status: "cancelled",
    },
  ];

  // Filter reservations based on active tab and search query
  const filteredReservations = reservationsData.filter((reservation) => {
    // First apply tab filter
    let passesTabFilter = true;

    if (activeTab === "current-week") {
      // Logic for current week - assuming today and tomorrow are in current week
      const isCurrentWeek =
        reservation.dateInfo.includes("Dec 15") ||
        reservation.dateInfo.includes("Dec 16");
      passesTabFilter = isCurrentWeek;
    } else if (activeTab === "upcoming") {
      passesTabFilter = reservation.status === "upcoming";
    } else if (activeTab === "checked-in") {
      passesTabFilter = reservation.status === "checked-in";
    } else if (activeTab === "completed") {
      passesTabFilter = reservation.status === "completed";
    } else if (activeTab === "cancelled") {
      passesTabFilter = reservation.status === "cancelled";
    }

    // Then apply search filter if there's a search query
    if (!passesTabFilter) return false;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        reservation.customer.name.toLowerCase().includes(query) ||
        reservation.customer.phone.includes(query) ||
        reservation.table.toLowerCase().includes(query) ||
        reservation.date.toLowerCase().includes(query) ||
        reservation.dateInfo.toLowerCase().includes(query) ||
        reservation.status.toLowerCase().includes(query) ||
        (reservation.staff &&
          reservation.staff.toLowerCase().includes(query)) ||
        `${reservation.partySize}`.includes(query)
      );
    }

    return true;
  });

  // Stats for the reservation counts
  const stats = {
    total: reservationsData.length,
    checkedIn: reservationsData.filter((r) => r.status === "checked-in").length,
    upcoming: reservationsData.filter((r) => r.status === "upcoming").length,
    cancelled: reservationsData.filter((r) => r.status === "cancelled").length,
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-lg z-50">
      <div className="bg-white rounded-lg overflow-y-scroll scrollbar-hide shadow-xl w-[90%] h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            All Reservations
          </h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-6 overflow-y-auto scrollbar-hide flex-1">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <FilterTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>

          <ReservationStats stats={stats} />

          <ReservationTable reservations={filteredReservations} />

          <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
            <ActionButtons reservations={filteredReservations} />
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredReservations.length / 5)}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllReservations;
