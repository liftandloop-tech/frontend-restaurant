
import React, { useState, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { isAuthenticated as checkAuth, clearAuthData } from "./utils/auth.js";

// Eager load critical components (login, header)
import Header from "./Header";
import Login from "./Login";
import Register from "./Register";


const Dashboard = React.lazy(() => import("./Dashboard"))
const TakeOrder = React.lazy(() => import("./TakeOrder"))
const RestaurantTables = React.lazy(() => import("./RestaurantTables"))
const ChangeOrder = React.lazy(() => import("./ChangeOrder"))
const CloseTable = React.lazy(() => import("./CloseTable"))
const OrderManagement = React.lazy(() => import("./OrderManagement"))
const NewOrder = React.lazy(() => import("./NewOrder"))
//const OnlineOrder = React.lazy(() => import("./OnlineOrder"))
const Reservations = React.lazy(() => import("./Reservations"))
const AddReservation = React.lazy(() => import("./AddReservation"))
const AllReservations = React.lazy(() => import("./AllReservations"))
const MenuManagement = React.lazy(() => import("./MenuManagement"))
const InventoryManagement = React.lazy(() => import("./InventoryManagement"))
const StaffManagement = React.lazy(() => import("./StaffManagement"))
const PayrollManagement = React.lazy(() => import("./PayrollManagement"))
const StaffDetails = React.lazy(() => import("./StaffDetails"))
const ReportsDashboard = React.lazy(() => import("./ReportsDashboard"))
const BillingReport = React.lazy(() => import("./BillingReport"))
const OrderReport = React.lazy(() => import("./OrderReport"))
const Offers = React.lazy(() => import("./Offers"))
const Profile = React.lazy(() => import("./Profile"))
const CustomerReport = React.lazy(() => import("./CustomerReport"))
const KOTManagement = React.lazy(() => import("./KOTManagement"))
const WaiterNotifications = React.lazy(() => import("./WaiterNotifications"))
const PhoneOrder = React.lazy(() => import("./PhoneOrder"))
const ForgotPassword = React.lazy(() => import("./ForgotPassword"))
const ResetPassword = React.lazy(() => import("./ResetPassword"))
const InventoryReport = React.lazy(() => import("./InventoryReport"))
const MenuReport = React.lazy(() => import("./MenuReport"))
const StaffReport = React.lazy(() => import("./StaffReport"))
const VendorReport = React.lazy(() => import("./VendorReport"))
const PurchaseReport = React.lazy(() => import("./PurchaseReport"))
const OfferReport = React.lazy(() => import("./OfferReport"))
// const ActivateLicense = React.lazy(() => import("./ActivateLicense"));
import { useAuth } from "./context/AuthContext";


import Sidebar from "./components/Sidebar.jsx";

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div className="flex-1 flex items-center justify-center bg-[#F7F8FA]">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);





/**
 * The main App component sets up the application's routing and global state.
 * It manages the visibility of the "Take Order" modal, allowing it to be
 * opened from different parts of the application.
 * It also handles authentication state and routing.
 */
const App = () => {
  const { isAuthenticated, isLoading,
    // isLicenseVerified,
    login, logout } = useAuth();

  // State to control sidebar collapse state for layout padding
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // TakeOrder states...
  const [isTakeOrderVisible, setIsTakeOrderVisible] = useState(false);
  const [isChangeOrderVisible, setIsChangeOrderVisible] = useState(false);
  const [isPhoneOrderVisible, setIsPhoneOrderVisible] = useState(false);
  const [isOnlineDeliveryOrderVisible, setIsOnlineDeliveryOrderVisible] = useState(false);
  const [takeOrderTableNumber, setTakeOrderTableNumber] = useState("");

  // Handlers...
  const handleOpenTakeOrder = React.useCallback((tableData) => {
    if (tableData && tableData.tableNumber) setTakeOrderTableNumber(tableData.tableNumber);
    else setTakeOrderTableNumber("");
    setIsTakeOrderVisible(true);
  }, []);
  const handleCloseTakeOrder = React.useCallback(() => setIsTakeOrderVisible(false), []);
  const handleCloseChangeOrder = React.useCallback(() => setIsChangeOrderVisible(false), []);
  const handleOpenPhoneOrder = React.useCallback(() => setIsPhoneOrderVisible(true), []);
  const handleClosePhoneOrder = React.useCallback(() => setIsPhoneOrderVisible(false), []);
  const handleOpenOnlineDeliveryOrder = React.useCallback(() => setIsOnlineDeliveryOrderVisible(true), []);
  const handleCloseOnlineDeliveryOrder = React.useCallback(() => setIsOnlineDeliveryOrderVisible(false), []);

  // Handle login
  const handleLogin = React.useCallback((userData) => {
    login(userData);
  }, [login]);

  // Handle register
  const handleRegister = React.useCallback((userData) => {
    login(userData);
  }, [login]);

  // Handle logout
  const handleLogout = React.useCallback(() => {
    logout();
  }, [logout]);

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) return <LoadingSpinner />;

    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    //License check
    // License check - Commented out to bypass license verification for now
    // if (!isLicenseVerified) {
    //   return <Navigate to="/activate-license" replace />;
    // }

    return children;
  };

  // Public Route Component (redirect to dashboard if already authenticated)
  const PublicRoute = ({ children }) => {
    if (isLoading) return <LoadingSpinner />;

    if (isAuthenticated) {
      // if (!isLicenseVerified) return <Navigate to="/activate-license" replace />;
      return <Navigate to="/" replace />;
    }
    return children;
  };

  // License Route Component (accessible if auth but not verified)
  const LicenseRoute = ({ children }) => {
    if (isLoading) return <LoadingSpinner />;
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    if (isLicenseVerified) return <Navigate to="/" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <div className={`app-container ${isAuthenticated ? 'has-sidebar' : ''}`}>
        {/* Sidebar replaces the old Header */}
        {isAuthenticated && <Sidebar onLogout={handleLogout} onCollapse={setIsSidebarCollapsed} />}

        <main className={`main-content ${isSidebarCollapsed ? 'sidebar-collapsed-padding' : ''}`}>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Public Routes - Login and Register */}
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login onLogin={handleLogin} />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register onRegister={handleRegister} />
                  </PublicRoute>
                }
              />
              <Route
                path="/forgot-password"
                element={
                  <PublicRoute>
                    <ForgotPassword />
                  </PublicRoute>
                }
              />
              <Route
                path="/reset-password/:token"
                element={
                  <PublicRoute>
                    <ResetPassword />
                  </PublicRoute>
                }
              />

              {/* Protected Routes - All other routes require authentication */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Dashboard onTakeOrder={handleOpenTakeOrder} />
                  </ProtectedRoute>
                }
              />
              {/* The RestaurantTables route, also with a handler to open the modal */}
              <Route
                path="/tables"
                element={
                  <ProtectedRoute>
                    <RestaurantTables />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/new-order"
                element={
                  <ProtectedRoute>
                    <NewOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/close-table"
                element={
                  <ProtectedRoute>
                    <CloseTable />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <OrderManagement
                      onOpenPhoneOrder={handleOpenPhoneOrder}
                      onOpenOnlineDeliveryOrder={handleOpenOnlineDeliveryOrder}
                    />
                  </ProtectedRoute>
                }
              />
              {/* <Route
                path="/online-orders"
                element={
                  <ProtectedRoute>
                    <OnlineOrder />
                  </ProtectedRoute>
                }
              /> */}
              <Route
                path="/reservations"
                element={
                  <ProtectedRoute>
                    <Reservations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservations/new"
                element={
                  <ProtectedRoute>
                    <AddReservation />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/menu-management"
                element={
                  <ProtectedRoute>
                    <MenuManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reservations/all"
                element={
                  <ProtectedRoute>
                    <AllReservations
                      isOpen={true}
                      onClose={() => window.history.back()}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/inventory-management"
                element={
                  <ProtectedRoute>
                    <InventoryManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff-management"
                element={
                  <ProtectedRoute>
                    <StaffManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/staff-details/:id"
                element={
                  <ProtectedRoute>
                    <StaffDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/payroll-management"
                element={
                  <ProtectedRoute>
                    <PayrollManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports"
                element={
                  <ProtectedRoute>
                    <ReportsDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/customer"
                element={
                  <ProtectedRoute>
                    <CustomerReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/billing"
                element={
                  <ProtectedRoute>
                    <BillingReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customers"
                element={
                  <ProtectedRoute>
                    <CustomerReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/order"
                element={
                  <ProtectedRoute>
                    <OrderReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/inventory"
                element={
                  <ProtectedRoute>
                    <InventoryReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/menu"
                element={
                  <ProtectedRoute>
                    <MenuReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/staff"
                element={
                  <ProtectedRoute>
                    <StaffReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/vendors"
                element={
                  <ProtectedRoute>
                    <VendorReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/purchase"
                element={
                  <ProtectedRoute>
                    <PurchaseReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reports/offers"
                element={
                  <ProtectedRoute>
                    <OfferReport />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/offers"
                element={
                  <ProtectedRoute>
                    <Offers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/kots"
                element={
                  <ProtectedRoute>
                    <KOTManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/waiter-notifications"
                element={
                  <ProtectedRoute>
                    <WaiterNotifications />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/phone-orders"
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-gray-50 p-6">
                      <div className="max-w-4xl mx-auto">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                          <h1 className="text-2xl font-bold text-gray-900 mb-4">Phone Orders</h1>
                          <p className="text-gray-600 mb-6">Manage phone orders and delivery</p>
                          <button
                            onClick={handleOpenPhoneOrder}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Create Phone Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </ProtectedRoute>
                }
              />

              {/* Catch all - redirect to login if route not found */}
              <Route
                path="*"
                element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
              />
            </Routes>
          </Suspense>
          {/* The TakeOrder modal is rendered here and controlled by the App's state */}
          {isTakeOrderVisible && (
            <Suspense fallback={<LoadingSpinner />}>
              <TakeOrder
                show={isTakeOrderVisible}
                onClose={handleCloseTakeOrder}
                tableNumber={takeOrderTableNumber}
                isSidebarCollapsed={isSidebarCollapsed}
              />
            </Suspense>
          )}
          {isChangeOrderVisible && (
            <Suspense fallback={<LoadingSpinner />}>
              <ChangeOrder
                show={isChangeOrderVisible}
                onClose={handleCloseChangeOrder}
                order={null}
                table={null}
              />
            </Suspense>
          )}
          {isPhoneOrderVisible && (
            <Suspense fallback={<LoadingSpinner />}>
              <PhoneOrder
                show={isPhoneOrderVisible}
                onClose={handleClosePhoneOrder}
              />
            </Suspense>
          )}
          {isOnlineDeliveryOrderVisible && (
            <Suspense fallback={<LoadingSpinner />}>
              <OnlineDeliveryOrder
                show={isOnlineDeliveryOrderVisible}
                onClose={handleCloseOnlineDeliveryOrder}
              />
            </Suspense>
          )}
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
