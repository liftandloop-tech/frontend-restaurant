import React from "react";

/**
 * OptionalNotes Component
 *
 * Handles optional internal notes for staff members including:
 * - Internal notes textarea with character limit
 * - Character counter display
 * - Max 200 characters limit
 */
const OptionalNotes = ({ formData, onInputChange }) => {
  const MAX_CHARACTERS = 200;
  const currentLength = formData.internalNotes
    ? formData.internalNotes.length
    : 0;
  const remainingChars = MAX_CHARACTERS - currentLength;

  // Handle textarea change with character limit
  const handleNotesChange = (e) => {
    const { value } = e.target;
    if (value.length <= MAX_CHARACTERS) {
      onInputChange(e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Optional Notes
        </h3>
        <p className="text-sm text-gray-600">
          Add any internal notes or remarks about this staff member
        </p>
      </div>

      {/* Notes Textarea */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Internal Notes
        </label>
        <div className="relative">
          <textarea
            name="internalNotes"
            value={formData.internalNotes || ""}
            onChange={handleNotesChange}
            placeholder="Internal notes or remarks..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
          />

          {/* Character Counter */}
          <div className="absolute bottom-3 right-3 text-xs text-gray-400">
            {remainingChars >= 0 ? (
              <span
                className={
                  remainingChars < 20 ? "text-orange-500" : "text-gray-400"
                }
              >
                {remainingChars} characters remaining
              </span>
            ) : (
              <span className="text-red-500">
                {Math.abs(remainingChars)} characters over limit
              </span>
            )}
          </div>
        </div>

        {/* Helper Text */}
        <div className="mt-2 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Max {MAX_CHARACTERS} characters
          </p>
          {currentLength > 0 && (
            <p className="text-xs text-gray-400">
              {currentLength}/{MAX_CHARACTERS}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OptionalNotes;
