import React from "react";

/**
 * Footer component for the Reports Dashboard
 * Contains data sync status and customize layout link
 */
const Footer = () => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      {/* Data Sync Status */}
      <div className="text-sm text-gray-500">
        Data last synced: 5 mins ago • Auto-refresh every 10 mins
      </div>

      {/* Customize Layout Link */}
      <a
        href="#"
        className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
      >
        Customize Dashboard Layout
      </a>
    </div>
  );
};

export default Footer;
