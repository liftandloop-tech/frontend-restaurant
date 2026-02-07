import React from "react";
import PropTypes from "prop-types";

/**
 * WeekCalendar renders a simple week grid with tables as rows and days as columns.
 * This is a presentational component that accepts structured data so it can be
 * easily replaced later by a real calendar if needed.
 */
const WeekCalendar = ({ weekLabel, columns, rows }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="text-[14px] font-medium">{weekLabel}</div>
        <div className="flex items-center gap-2">
          <IconButton label="Prev" iconPath="M15 18l-6-6 6-6" />
          <button className="h-8 px-3 rounded-md border text-[12px] border-gray-200 hover:bg-gray-50">
            Today
          </button>
          <IconButton label="Next" iconPath="M9 6l6 6-6 6" />
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-gray-50 text-gray-600">
              <th className="w-[140px] text-left font-medium p-3 border-b border-gray-200">
                Tables
              </th>
              {columns.map((c) => (
                <th key={c.key} className="text-left font-medium p-3 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">{c.label}</span>
                    <span className="text-gray-500">{c.subLabel}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.key} className="border-b border-gray-100 align-top">
                <td className="p-3 text-gray-700">
                  <div className="text-[12px] font-medium">{r.title}</div>
                  <div className="text-[11px] text-gray-500">{r.subtitle}</div>
                </td>
                {columns.map((c) => (
                  <td key={`${r.key}-${c.key}`} className="p-2">
                    <div className="min-h-[64px] flex flex-col gap-2">
                      {(r.cells[c.key] || []).map((item) => (
                        <ReservationPill key={item.id} item={item} />
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 px-4 py-3 border-t border-gray-200 text-[12px]">
        <Legend color="bg-green-500" label="Available" />
        <Legend color="bg-amber-500" label="Reserved" />
        <Legend color="bg-blue-500" label="Checked-in" />
        <Legend color="bg-red-500" label="Cancelled" />
      </div>
    </div>
  );
};

WeekCalendar.propTypes = {
  weekLabel: PropTypes.string.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, label: PropTypes.string, subLabel: PropTypes.string })
  ).isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, title: PropTypes.string, subtitle: PropTypes.string, cells: PropTypes.object })
  ).isRequired,
};

const ReservationPill = ({ item }) => {
  const color =
    item.status === "cancelled"
      ? "bg-red-500"
      : item.status === "checked-in"
        ? "bg-blue-600"
        : "bg-amber-500";

  return (
    <div
      className={`flex flex-col gap-0.5 rounded px-2 py-1.5 text-white shadow-sm ${color}`}
      title={`${item.time} - ${item.name}`}
    >
      <div className="text-[10px] font-bold uppercase tracking-wider opacity-80">{item.time}</div>
      <div className="text-[12px] font-medium truncate leading-tight">{item.name}</div>
    </div>
  );
};

ReservationPill.propTypes = {
  item: PropTypes.shape({ id: PropTypes.string, status: PropTypes.string, time: PropTypes.string, name: PropTypes.string }).isRequired,
};

const Legend = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <span className={`w-3 h-3 rounded-sm ${color}`}></span>
    <span className="text-gray-700">{label}</span>
  </div>
);

Legend.propTypes = {
  color: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const IconButton = ({ label, iconPath }) => (
  <button
    type="button"
    aria-label={label}
    className="grid place-items-center w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-50"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-700">
      <path d={iconPath} />
    </svg>
  </button>
);

IconButton.propTypes = {
  label: PropTypes.string.isRequired,
  iconPath: PropTypes.string.isRequired,
};

export default WeekCalendar;


