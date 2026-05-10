import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import MyTripsPage from "../pages/trips/MyTripsPage";

import ItineraryPage from "../pages/itinerary/ItineraryPage";

import BudgetPage from "../pages/budget/BudgetPage";

import SettingsPage from "../pages/profile/SettingsPage";

import AdminPage from "../pages/admin/AdminPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path="/signup" element={<SignupPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/trips" element={<MyTripsPage />} />

                <Route path="/itinerary" element={<ItineraryPage />} />

                <Route path="/budget" element={<BudgetPage />} />

                <Route path="/settings" element={<SettingsPage />} />

                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
