import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    LuLayoutDashboard,
    LuUtensilsCrossed,
    LuShoppingBag,
    LuCalendarDays,
    LuMenu,
    LuPackage,
    LuUsers,
    LuLogOut,
    LuChevronLeft,
    LuChevronRight,
    LuClock,
    LuBell,
    LuUser,
    //LuSettings
} from "react-icons/lu";
import { AiOutlinePercentage } from "react-icons/ai";
import { MdOutlineTableBar } from "react-icons/md";
import { FiBarChart } from "react-icons/fi";
import "./Sidebar.css";

const Sidebar = ({ onLogout, onCollapse }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        if (onCollapse) onCollapse(newState);
    };

    const menuItems = [
        { path: "/", icon: <LuLayoutDashboard />, label: "Dashboard" },
        { path: "/tables", icon: <MdOutlineTableBar />, label: "Tables" },
        { path: "/orders", icon: <LuShoppingBag />, label: "Orders" },
        { path: "/kots", icon: <LuClock />, label: "KOTs" },
        { path: "/reservations", icon: <LuCalendarDays />, label: "Reservations" },
        { path: "/menu-management", icon: <LuMenu />, label: "Menu" },
        { path: "/inventory-management", icon: <LuPackage />, label: "Inventory" },
        { path: "/staff-management", icon: <LuUsers />, label: "Staff" },
        { path: "/reports", icon: <FiBarChart />, label: "Reports" },
        { path: "/customers", icon: <LuUser />, label: "Customers" },
        { path: "/offers", icon: <AiOutlinePercentage />, label: "Offers" },
        //  { path: "/settings", icon: <LuSettings />, label: "Settings" },
    ];

    const userData = (() => {
        try {
            const data = localStorage.getItem("userData");
            return data ? JSON.parse(data) : { name: "Admin", role: "Manager" };
        } catch {
            return { name: "Admin", role: "Manager" };
        }
    })();

    const handleLogoutClick = () => {
        if (onLogout) onLogout();
        navigate("/login");
    };

    return (
        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} overflow-auto`}>
            {/* Logo Section */}
            <div className="sidebar-header">
                <div className="logo-container">
                    <div className="logo-icon">
                        < LuUtensilsCrossed />
                    </div>
                    {!isCollapsed && <span className="logo-text">QuickX Pos</span>}
                </div>
                <button
                    className="collapse-btn"
                    onClick={toggleCollapse}
                >
                    {isCollapsed ? <LuChevronRight /> : <LuChevronLeft />}
                </button>
            </div>

            {/* Navigation Menu */}
            <nav className="sidebar-nav">
                <div className="nav-group">
                    <span className="group-title">{!isCollapsed && "Main Menu"}</span>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
                            title={isCollapsed ? item.label : ""}
                        >
                            {({ isActive }) => (
                                <>
                                    <span className="nav-icon">{item.icon}</span>
                                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
                                    {isActive && !isCollapsed && <div className="active-indicator" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* User & Footer Section */}
            <div className="sidebar-footer">
                <div className="user-profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <div className="user-avatar">
                        <LuUser />
                    </div>
                    {!isCollapsed && (
                        <div className="user-info">
                            <span className="user-name">{userData.name || "Admin"}</span>
                            <span className="user-role">{userData.role || "Manager"}</span>
                        </div>
                    )}
                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogoutClick}
                    title={isCollapsed ? "Logout" : ""}
                >
                    <span className="nav-icon"><LuLogOut /></span>
                    {!isCollapsed && <span className="nav-label">Logout</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
