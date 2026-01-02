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

import { useGetProfileQuery } from "../features/users/usersApiSlice";
import { FiUser } from "react-icons/fi";

const Sidebar = ({ onLogout, onCollapse }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();

    // Fetch user profile from backend
    const { data: userProfile, refetch: refetchProfile } = useGetProfileQuery();
    const userData = userProfile?.data || { name: "User", role: "Staff" };

    const toggleCollapse = () => {
        const newState = !isCollapsed;
        setIsCollapsed(newState);
        if (onCollapse) onCollapse(newState);
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };

    const navGroups = [
        {
            title: "Main",
            items: [
                { path: "/", icon: <LuLayoutDashboard />, label: "Dashboard" },
            ]
        },
        {
            title: "Booking",
            items: [
                { path: "/tables", icon: <MdOutlineTableBar />, label: "Tables" },
                { path: "/orders", icon: <LuShoppingBag />, label: "Orders" },
                { path: "/kots", icon: <LuClock />, label: "KOTs" },
                { path: "/reservations", icon: <LuCalendarDays />, label: "Reservations" },
            ]
        },
        {
            title: "Setting",
            items: [
                { path: "/menu-management", icon: <LuMenu />, label: "Menu" },
                { path: "/inventory-management", icon: <LuPackage />, label: "Inventory" },
                { path: "/staff-management", icon: <LuUsers />, label: "Staff" },
                { path: "/reports", icon: <FiBarChart />, label: "Reports" },
                { path: "/customers", icon: <LuUser />, label: "Customers" },
                { path: "/offers", icon: <AiOutlinePercentage />, label: "Offers" },
            ]
        }
    ];

    const handleLogoutClick = () => {
        if (onLogout) onLogout();
        navigate("/login");
    };

    return (
        <aside className={`sidebar ${isCollapsed ? "collapsed" : ""} overflow-visible relative`}>
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
                {navGroups.map((group, groupIndex) => (
                    <div className="nav-group" key={groupIndex}>
                        <span className="group-title">
                            {!isCollapsed && (group.title === "Main" ? "Main Menu" : group.title)}
                            {isCollapsed && <div className="h-4"></div>} {/* Spacer for collapsed mode */}
                        </span>
                        {group.items.map((item) => (
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
                ))}
            </nav>

            {/* User & Footer Section */}
            <div className="sidebar-footer relative">

                <div
                    className="user-profile cursor-pointer hover:bg-gray-800/50 transition-colors p-2 rounded-lg"
                    onClick={handleProfileClick}
                >
                    <div className="user-avatar bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <LuUser />
                    </div>
                    {!isCollapsed && (
                        <div className="user-info">
                            <span className="user-name font-semibold">{userData.name}</span>
                            <span className="user-role text-xs opacity-70">{userData.role}</span>
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
