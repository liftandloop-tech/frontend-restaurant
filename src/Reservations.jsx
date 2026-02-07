import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiltersBar,
  WeekCalendar,
  RightSidebar,
} from "./components/reservations-components";
import { useGetReservationsQuery } from "./features/reservations/reservationsApiSlice";
import { useGetTablesQuery } from "./features/tables/tablesApiSlice";

const Reservations = () => {
  const navigate = useNavigate();

  // Filter States
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("This Week (Mon–Sun)");
  const [partySize, setPartySize] = useState("All Sizes");

  // Calculate API filters
  const apiFilters = useMemo(() => {
    const filters = {};
    if (statusFilter !== "all") filters.status = statusFilter;

    // Date Range logic
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (dateRange === "Today") {
      filters.reservationDate = today.toISOString().split('T')[0];
    } else if (dateRange === "Tomorrow") {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      filters.reservationDate = tomorrow.toISOString().split('T')[0];
    } else if (dateRange === "This Week (Mon–Sun)") {
      const dayOfWeek = today.getDay(); // 0 is Sunday
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      filters.startDate = startOfWeek.toISOString().split('T')[0];
      filters.endDate = endOfWeek.toISOString().split('T')[0];
    }

    // Party Size logic
    if (partySize !== "All Sizes") {
      const minSize = partySize.split('-')[0].replace('+', '');
      filters.numberOfGuests = parseInt(minSize);
    }

    return filters;
  }, [statusFilter, dateRange, partySize]);

  // RTK Query
  const { data: reservationsResponse, isLoading: isReservationsLoading, isError: isReservationsError } = useGetReservationsQuery(apiFilters);
  const { data: tablesResponse, isLoading: isTablesLoading, isError: isTablesError } = useGetTablesQuery();

  // Generate week columns dynamically
  const columns = useMemo(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);
      return {
        key: day.toLowerCase(),
        label: `${day} ${date.getDate()}`,
        subLabel: "",
        date: date.toISOString().split('T')[0]
      };
    });
  }, []);

  const weekLabel = useMemo(() => {
    if (columns.length === 0) return "";
    const start = columns[0].label + " " + new Date().getFullYear();
    const end = columns[6].label + " " + new Date().getFullYear();
    return `Week of ${start} – ${end}`;
  }, [columns]);

  // Map real data to rows
  const rows = useMemo(() => {
    if (!tablesResponse?.data) return [];

    const reservations = reservationsResponse?.data || [];

    const dayMap = {
      0: "sun", 1: "mon", 2: "tue", 3: "wed", 4: "thu", 5: "fri", 6: "sat"
    };

    return tablesResponse.data.map(table => {
      const tableCells = {
        mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: []
      };

      const tableReservations = reservations.filter(r => r.tableNumber === table.tableNumber);

      tableReservations.forEach(res => {
        const resDateStr = res.reservationDate.split('T')[0];
        const resDate = new Date(res.reservationDate);
        const dayKey = dayMap[resDate.getDay()];

        // Find which column matches this reservation date
        const matchedColumn = columns.find(c => c.date === resDateStr);

        if (dayKey && matchedColumn) {
          tableCells[dayKey].push({
            id: res._id,
            time: res.reservationTime,
            name: `${res.customerName || 'Guest'} (${res.numberOfGuests})`,
            status: res.status || "reserved"
          });
        }
      });

      return {
        key: table._id,
        title: `Table ${table.tableNumber} (${table.capacity} seats)`,
        subtitle: table.location || "",
        cells: tableCells
      };
    });
  }, [tablesResponse, reservationsResponse, columns]);

  if (isReservationsError || isTablesError) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7F8FA] min-h-[400px]">
        <div className="text-red-500">Error loading reservations data. Please try again.</div>
      </div>
    );
  }

  if (isReservationsLoading || isTablesLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#F7F8FA] min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="w-[95%] max-w-[1500px] mx-auto px-0 py-10">
      <div className="flex pr-2 items-center justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-semibold">Reservations</h1>
          <p className="text-[12px] text-gray-600">
            {dateRange === "This Week (Mon–Sun)"
              ? "Manage your restaurant reservations for this week"
              : `Viewing reservations for ${dateRange.toLowerCase()}`}
          </p>
        </div>
      </div>

      <FiltersBar
        onNewReservation={() => navigate("/reservations/new")}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        partySize={partySize}
        setPartySize={setPartySize}
      />

      <div className="mt-4 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <WeekCalendar
            weekLabel={weekLabel}
            columns={columns}
            rows={rows}
          />
        </div>
        <RightSidebar
          reservations={reservationsResponse?.data || []}
          filterLabel={dateRange}
        />
      </div>
    </div>
  );
};

export default Reservations;
