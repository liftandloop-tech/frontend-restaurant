import React, { useState, useMemo } from "react";
import ReservationTable from "./components/all-reservations-components/ReservationTable";
import FilterTabs from "./components/all-reservations-components/FilterTabs";
import SearchBar from "./components/all-reservations-components/SearchBar";
import ReservationStats from "./components/all-reservations-components/ReservationStats";
import Pagination from "./components/all-reservations-components/Pagination";
import ActionButtons from "./components/all-reservations-components/ActionButtons";
import { useGetReservationsQuery } from "./features/reservations/reservationsApiSlice";

const AllReservations = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // RTK Query
  const { data: response, isLoading } = useGetReservationsQuery(undefined, {
    skip: !isOpen, // Only fetch when modal is open
    pollingInterval: 30000
  });

  // Map API data to component structure
  const reservationsData = useMemo(() => {
    if (!response?.data) return [];

    return response.data.map(r => {
      // Simplify date parsing
      return {
        id: r._id,
        customer: {
          name: r.customerName,
          phone: r.customerPhone,
        },
        date: `${r.reservationDate} ${r.reservationTime}`,
        dateInfo: new Date(r.reservationDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        table: `Table ${r.tableNumber}`,
        capacity: r.numberOfGuests,
        partySize: r.numberOfGuests,
        staff: "Unassigned",
        status: r.status || "pending",
        originalData: r
      };
    });
  }, [response]);

  // Filter reservations based on active tab and search query
  const filteredReservations = useMemo(() => {
    return reservationsData.filter((reservation) => {
      // First apply tab filter
      let passesTabFilter = true;

      if (activeTab === "current-week") {
        // Logic for current week - simplified check
        const resDate = new Date(reservation.originalData.reservationDate);
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        passesTabFilter = resDate >= today && resDate <= nextWeek;
      } else if (activeTab === "upcoming") {
        passesTabFilter = reservation.status === "upcoming" || reservation.status === "pending" || reservation.status === "confirmed";
      } else if (activeTab === "checked-in") {
        passesTabFilter = reservation.status === "checked-in" || reservation.status === "seated";
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
  }, [reservationsData, activeTab, searchQuery]);

  // Stats for the reservation counts
  const stats = useMemo(() => ({
    total: reservationsData.length,
    checkedIn: reservationsData.filter((r) => r.status === "checked-in" || r.status === "seated").length,
    upcoming: reservationsData.filter((r) => r.status === "upcoming" || r.status === "pending" || r.status === "confirmed").length,
    cancelled: reservationsData.filter((r) => r.status === "cancelled").length,
  }), [reservationsData]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/20 backdrop-blur-lg z-50">
        <div className="bg-white rounded-lg p-6 shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading reservations...</p>
        </div>
      </div>
    );
  }

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
