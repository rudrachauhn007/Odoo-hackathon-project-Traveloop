import express from "express";

import {
    searchCities,
    searchActivities,
    searchPublicTrips,
    getTrendingDestinations,
    getPopularActivities,
} from "../controllers/searchController.js";

const router = express.Router();

router.get("/cities", searchCities);
router.get("/activities", searchActivities);
router.get("/trips", searchPublicTrips);
router.get("/trending-destinations", getTrendingDestinations);
router.get("/popular-activities", getPopularActivities);

export default router;
