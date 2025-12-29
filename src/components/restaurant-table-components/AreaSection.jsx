import React from "react";
import TableCard from "./TableCard";

/**
 * AreaSection groups and lays out the TableCard components for a specific area.
 * Props:
 *   - title: section heading (e.g., 'Main Dining Area')
 *   - tables: array of table objects [{code, seats, status}]
 *   - onTransferTable: callback for transfer table action
 *   - onCompleteCleaning: callback for complete cleaning action
 *   - onSetTableTransfer: callback for setting table to transfer status
 */
const AreaSection = ({ title, tables, location, onTransferTable, onCompleteCleaning, onSetTableTransfer, onUpdateStatus, onTableClick, showServingInfo }) => {
  return (
    <div className="py-1">
      <div className="text-[12px] text-gray-700 mb-2">{title}</div>
      {/* Responsive grid for 3 columns, gap-y for vertical space, gap for horizontal space */}
      <div className="grid grid-cols-3 gap-y-4 gap-2">
        {tables.map((t) => (
          // TableCard expects code, seats, status currentOrder as props
          <TableCard
            key={t.code}
            code={t.code}
            seats={t.seats}
            status={t.status}
            tableNumber={t.tableNumber}
            id={t._id}
            currentOrder={t.currentOrder}
            location={location}
            onTransferTable={onTransferTable}
            onCompleteCleaning={onCompleteCleaning}
            onSetTableTransfer={onSetTableTransfer}
            onUpdateStatus={onUpdateStatus}
            onTableClick={onTableClick}
            showServingInfo={showServingInfo}
          />
        ))}
      </div>
    </div>
  );
};

export default AreaSection;
