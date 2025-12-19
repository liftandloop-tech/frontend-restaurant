import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiltersBar,
  WeekCalendar,
  RightSidebar,
} from "./components/reservations-components";

/**
 * Reservations page
 *
 * The layout mirrors a modern reservations dashboard:
 * - Top filter bar with controls and a New Reservation button
 * - Main content split into a week calendar grid and a right sidebar summary
 *
 * NOTE: This implementation uses light mock data so the UI is functional
 * and error-free. It is intentionally simple and can be wired to real data later.
 */
const Reservations = () => {
  const navigate = useNavigate();
  // Week header labels
  const columns = [
    { key: "mon", label: "Mon 15", subLabel: "" },
    { key: "tue", label: "Tue 16", subLabel: "" },
    { key: "wed", label: "Wed 17", subLabel: "" },
    { key: "thu", label: "Thu 18", subLabel: "" },
    { key: "fri", label: "Fri 19", subLabel: "" },
    { key: "sat", label: "Sat 20", subLabel: "" },
    { key: "sun", label: "Sun 21", subLabel: "" },
  ];

  // Mock rows with cells per day
  const rows = [
    {
      key: "t1",
      title: "Table 1 (2 seats)",
      subtitle: "",
      cells: {
        mon: [pill("1", "7:00 PM", "Smith (2)")],
        wed: [pill("2", "6:30 PM", "Johnson (2)", "checked-in")],
        fri: [pill("3", "8:00 PM", "Brown (2)")],
        sun: [pill("4", "8:30 PM", "Hall (2)")],
      },
    },
    {
      key: "t2",
      title: "Table 2 (4 seats)",
      subtitle: "",
      cells: {
        tue: [pill("5", "7:30 PM", "Davis (4)")],
        wed: [pill("6", "7:00 PM", "Wilson (3)")],
        thu: [pill("7", "8:30 PM", "Taylor (4)")],
        sat: [pill("8", "6:00 PM", "Martinez (6)")],
      },
    },
    {
      key: "t3",
      title: "Table 3 (6 seats)",
      subtitle: "",
      cells: {
        mon: [pill("9", "", "Lee (6)", "cancelled")],
        thu: [pill("10", "7:00 PM", "Garcia (5)")],
      },
    },
    {
      key: "t4",
      title: "Table 4 (4 seats)",
      subtitle: "",
      cells: {
        wed: [pill("11", "8:00 PM", "Rodriguez (4)")],
        fri: [pill("12", "7:30 PM", "Lopez (3)")],
      },
    },
    {
      key: "t5",
      title: "Table 5 (2 seats)",
      subtitle: "",
      cells: {
        tue: [pill("13", "6:00 PM", "White (2)")],
        thu: [pill("14", "7:30 PM", "Clark (2)")],
      },
    },
  ];

  return (
    <div className="w-[90%] max-w-[1400px] mx-auto px-0 py-10">
      <div className="flex pr-2 items-center justify-between mb-5">
        <div>
          <h1 className="text-[22px] font-semibold">Reservations</h1>
          <p className="text-[12px] text-gray-600">
            Manage your restaurant reservations for this week
          </p>
        </div>
      </div>

      <FiltersBar onNewReservation={() => navigate("/reservations/new")} />

      <div className="mt-4 flex flex-col lg:flex-row gap-6">
        <div className="flex-1 min-w-0">
          <WeekCalendar
            weekLabel="Week of January 15–21, 2024"
            columns={columns}
            rows={rows}
          />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
};

function pill(id, time, name, status = "reserved") {
  return { id, time, name, status };
}

export default Reservations;
