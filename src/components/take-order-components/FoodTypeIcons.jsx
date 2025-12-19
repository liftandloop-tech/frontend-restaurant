import React from "react";

/**
 * A reusable SVG icon to indicate a vegetarian food item.
 */
export const VegIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#4CAF50" />
    <circle cx="8" cy="8" r="4" fill="#4CAF50" />
  </svg>
);

/**
 * A reusable SVG icon to indicate a non-vegetarian food item.
 */
export const NonVegIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#F44336" />
    <path d="M8 4L11.4641 10H4.5359L8 4Z" fill="#F44336" />
  </svg>
);
