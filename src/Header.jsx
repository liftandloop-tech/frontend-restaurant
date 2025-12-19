import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = ({ onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate("/login");
    setShowDropdown(false);
  };
  return (
    <header className="w-screen bg-white border-b border-gray-200">
      <div className="w-full max-w-[1400px] mx-auto px-4">
        <div className="h-[56px] flex items-center justify-between gap-4">
          {/* Left: Brand + Nav */}
          <div className="flex items-center gap-8 overflow-x-auto">
            {/* Brand */}
            <Link
              to="/"
              className="shrink-0 text-[18px] font-semibold tracking-[-0.01em]"
            >
              Quick X Pos
            </Link>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-6 text-[13px] text-gray-600">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
                end
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/tables"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Tables
              </NavLink>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Orders
              </NavLink>
              <NavLink
                to="/kots"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                KOTs
              </NavLink>
              <NavLink
                to="/reservations"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Reservations
              </NavLink>
              <NavLink
                to="/menu-management"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Menu
              </NavLink>
              <NavLink
                to="/inventory-management"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Inventory
              </NavLink>
              <NavLink
                to="/staff-management"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Staff
              </NavLink>
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Reports
              </NavLink>
              <NavLink
                to="/customers"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 font-medium" : "hover:text-gray-900"
                }
              >
                Customers
              </NavLink>
              <NavLink className="hover:text-gray-900" to="/offers">
                Offers
              </NavLink>
            </nav>
          </div>

          {/* Right: Search + Icons + Avatar */}
          <div className="flex items-center gap-3">
           

            {/* Avatar with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-2 pl-1 pr-2 h-9 rounded-full hover:bg-gray-100"
                aria-label="Account"
              >
                <div className="w-8 h-8 rounded-full bg-[url('https://i.pravatar.cc/64?img=3')] bg-cover bg-center"></div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-4 h-4 text-gray-700"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {(() => {
                        try {
                          const userDataStr = localStorage.getItem("userData");
                          if (!userDataStr || userDataStr === "undefined" || userDataStr === "null") {
                            return "";
                          }
                          const userData = JSON.parse(userDataStr);
                          return userData?.name || "";
                        } catch (error) {
                          console.warn("Error parsing userData:", error);
                          return "";
                        }
                      })()}
                    </p>
                    {/* <p className="text-xs text-gray-500 truncate">
                      {(() => {
                        try {
                          const userDataStr = localStorage.getItem("userData");
                          if (!userDataStr || userDataStr === "undefined" || userDataStr === "null") {
                            return "";
                          }
                          const userData = JSON.parse(userDataStr);
                          return userData?.email || "";
                        } catch (error) {
                          console.warn("Error parsing userData:", error);
                          return "";
                        }
                      })()}
                    </p> */}
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setShowDropdown(false)}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-4 h-4"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
