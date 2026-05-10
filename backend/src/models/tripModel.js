const db = require("../config/db");

const TripModel = {
    // Requirement: Create customized multi-city itineraries [cite: 18]
    createTrip: async (userId, data) => {
        const query = `
      INSERT INTO trips (user_id, name, description, start_date, end_date, total_budget)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
        const values = [
            userId,
            data.name,
            data.description,
            data.start_date,
            data.end_date,
            data.total_budget,
        ];
        const { rows } = await db.query(query, values);
        return rows[0];
    },

    // Requirement: Fetch full trip with stops and activities [cite: 23, 24]
    getTripDetails: async (tripId) => {
        const query = `
      SELECT t.*, 
        json_agg(DISTINCT s.*) as stops,
        json_agg(DISTINCT a.*) as activities
      FROM trips t
      LEFT JOIN stops s ON t.id = s.trip_id
      LEFT JOIN activities a ON s.id = a.stop_id
      WHERE t.id = $1
      GROUP BY t.id;
    `;
        const { rows } = await db.query(query, [tripId]);
        return rows[0];
    },
};

module.exports = TripModel;
