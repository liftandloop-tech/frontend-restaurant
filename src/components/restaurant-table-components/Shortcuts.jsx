import React from "react";

const Key = ({ children }) => (
  <span className="px-1.5 py-0.5 rounded border border-gray-300 bg-white text-[11px] text-gray-700">
    {children}
  </span>
);

const Row = ({ left, right }) => (
  <div className="flex items-center justify-between text-[12px]">
    <div className="flex items-center gap-2 text-gray-700">{left}</div>
    <div className="flex items-center gap-2 text-gray-700">{right}</div>
  </div>
);

const Shortcuts = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-md p-4">
      <div className="text-[12px] text-gray-600 mb-2">Keyboard Shortcuts</div>
      <div className="grid grid-cols-4 gap-4">
        <Row
          left={
            <>
              <Key>N</Key> New Order
            </>
          }
          right={
            <>
              <Key>R</Key> Reserve
            </>
          }
        />
        <Row
          left={
            <>
              <Key>T</Key> Transfer
            </>
          }
          right={
            <>
              <Key>M</Key> Merge/Split
            </>
          }
        />
        <Row
          left={
            <>
              <Key>A</Key> Add Table
            </>
          }
          right={
            <>
              <Key>D</Key> Delete Table
            </>
          }
        />
      </div>
    </div>
  );
};

export default Shortcuts;
