import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import AdminManagement from "./pages/AdminManagement";
import AdminUsersList from "./pages/AdminUsersList"; // ADD THIS
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/stats"
              element={
                <PrivateRoute>
                  <Statistics />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-management"
              element={
                <PrivateRoute>
                  <AdminManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin-users"
              element={
                <PrivateRoute>
                  <AdminUsersList />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
