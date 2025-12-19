import React from "react";
import MenuItemCard from "./MenuItemCard";
// import "../MenuManagement.css"; // Removed manual CSS import

const MenuItemsList = ({ menuItems }) => {
  return (
    <div className="grid gap-5 mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
      {menuItems.map((item) => (
        <MenuItemCard key={item._id || item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuItemsList;
