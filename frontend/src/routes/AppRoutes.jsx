import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

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
import PackingChecklistPage from "../pages/trips/PackingChecklistPage";
import NotesPage from "../pages/trips/NotesPage";
import PublicItineraryPage from "../pages/shared/PublicItineraryPage";
import CommunityPage from "../pages/community/CommunityPage";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route path="/signup" element={<SignupPage />} />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage />
                        </ProtectedRoute>
                    }
                />

                {/* Trip Routes */}
                <Route
                    path="/trips"
                    element={
                        <ProtectedRoute>
                            <MyTripsPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/create-trip"
                    element={
                        <ProtectedRoute>
                            <CreateTripPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/trips/:tripId"
                    element={
                        <ProtectedRoute>
                            <TripDetailsPage />
                        </ProtectedRoute>
                    }
                />

                {/* Itinerary Routes */}
                <Route
                    path="/itinerary"
                    element={
                        <ProtectedRoute>
                            <ItineraryPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cities"
                    element={
                        <ProtectedRoute>
                            <CitySearchPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/activities"
                    element={
                        <ProtectedRoute>
                            <ActivitySearchPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/public/trip/:tripId"
                    element={<PublicItineraryPage />}
                />

                <Route
                    path="/budget"
                    element={
                        <ProtectedRoute>
                            <BudgetPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingsPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/packing"
                    element={
                        <ProtectedRoute>
                            <PackingChecklistPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/notes"
                    element={
                        <ProtectedRoute>
                            <NotesPage />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/community"
                    element={
                        <ProtectedRoute>
                            <CommunityPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
