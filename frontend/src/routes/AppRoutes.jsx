import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import SignupPage from "../pages/auth/SignupPage";

import DashboardPage from "../pages/dashboard/DashboardPage";

import MyTripsPage from "../pages/trips/MyTripsPage";

import ItineraryPage from "../pages/itinerary/ItineraryPage";

import BudgetPage from "../pages/budget/BudgetPage";

import SettingsPage from "../pages/profile/SettingsPage";

import AdminPage from "../pages/admin/AdminPage";

import CreateTripPage from "../pages/trips/CreateTripPage";

import TripDetailsPage from "../pages/trips/TripDetailsPage";

import CitySearchPage from "../pages/itinerary/CitySearchPage";

import ActivitySearchPage from "../pages/itinerary/ActivitySearchPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path="/signup" element={<SignupPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />

                {/* Trip Routes */}
                <Route path="/trips" element={<MyTripsPage />} />
                <Route path="/create-trip" element={<CreateTripPage />} />
                <Route path="/trip/:id" element={<TripDetailsPage />} />

                {/* Itinerary Routes */}
                <Route path="/itinerary" element={<ItineraryPage />} />
                <Route path="/cities" element={<CitySearchPage />} />
                <Route path="/activities" element={<ActivitySearchPage />} />

                <Route path="/budget" element={<BudgetPage />} />

                <Route path="/settings" element={<SettingsPage />} />

                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
