import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormSection,
  CustomerInfo,
  ReservationDetails,
  AdditionalInfo,
  Summary,
} from "./components/add-reservation-components";
import { useCreateReservationMutation } from "./features/reservations/reservationsApiSlice";
import { useGetTablesQuery } from "./features/tables/tablesApiSlice";

/**
 * AddReservation page
 *
 * Clean, sectioned form closely following the provided UI. Uses local state to
 * track values and shows a live summary. Connected to backend API.
 */
const AddReservation = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    partySize: "",
    table: "",
    staff: "",
    notes: "",
    deposit: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // RTK Query Hooks
  const { data: tablesResponse } = useGetTablesQuery({ status: "available" }, { skip: !localStorage.getItem('authToken') });
  const [createReservation] = useCreateReservationMutation();

  // Derived available tables
  const availableTables = tablesResponse?.data?.map(table => ({
    label: `Table ${table.tableNumber} (Cap: ${table.capacity})`,
    value: table.tableNumber.toString()
  })) || [];

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Client-side validation
    if (!form.name || !form.phone || !form.date || !form.time || !form.partySize || !form.table) {
      setError("Please fill in all required fields (marked with *)");
      setLoading(false);
      return;
    }

    // Extract table number from "Table X" format or use direct number
    let tableNumber = form.table;
    if (tableNumber.includes("Table ")) {
      tableNumber = tableNumber.replace("Table ", "").split(" ")[0]; // Handle "Table 12 (Cap: 4)"
    }

    try {
      const reservationData = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || undefined,
        date: form.date,
        time: form.time,
        partySize: form.partySize,
        table: tableNumber,
        notes: form.notes.trim() || undefined
      };

      const response = await createReservation(reservationData).unwrap();

      if (response.success) {
        setSuccess("Reservation created successfully!");
        // Navigate to reservations page after 1.5 seconds
        setTimeout(() => {
          navigate("/reservations");
        }, 1500);
      }
    } catch (error) {
      console.error("Error creating reservation:", error);

      // Handle authentication errors
      if (error.status === 401) {
        setError("Your session has expired. Please login again.");
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (error.status === 400 && error.data?.validationErrors && error.data.validationErrors.length > 0) {
        // Handle validation errors
        const validationMessages = error.data.validationErrors.map(err => {
          return `${err.field}: ${err.message}`;
        });
        setError(`Validation failed:\n${validationMessages.join('\n')}`);
      } else {
        setError(error.data?.message || "Failed to create reservation. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] max-w-[1200px] mx-auto px-0 py-6">
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div>
            <div className="text-[14px] font-semibold">New Reservation</div>
            <div className="text-[12px] text-gray-600">
              Create a new reservation for your restaurant
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="grid place-items-center w-8 h-8 rounded-md border border-gray-200 hover:bg-gray-50"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-4 h-4"
            >
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSave} className="p-4 space-y-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600 whitespace-pre-line">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          <FormSection icon={1} title="Customer Information">
            <CustomerInfo form={form} onChange={update} />
          </FormSection>

          <FormSection icon={2} title="Reservation Details">
            <ReservationDetails form={form} onChange={update} availableTables={availableTables} />
          </FormSection>

          <FormSection icon={3} title="Additional Information">
            <AdditionalInfo form={form} onChange={update} />
          </FormSection>

          <Summary form={form} />

          {/* Footer actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="h-9 px-3 rounded-md border border-gray-200 text-[13px] hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-9 px-3 rounded-md bg-blue-600 text-white text-[13px] hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Reservation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReservation;
