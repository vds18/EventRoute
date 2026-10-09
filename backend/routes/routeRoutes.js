const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { startLat, startLng, endLat, endLng } = req.body;

    if (
      startLat === undefined ||
      startLng === undefined ||
      endLat === undefined ||
      endLng === undefined
    ) {
      return res.status(400).json({
        message: "Start and destination coordinates are required",
      });
    }

    const url =
      `https://router.project-osrm.org/route/v1/driving/` +
      `${startLng},${startLat};${endLng},${endLat}` +
      `?overview=full&geometries=geojson`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Routing service failed");
    }

    const data = await response.json();

    if (!data.routes || data.routes.length === 0) {
      return res.status(404).json({
        message: "No route found",
      });
    }

    const route = data.routes[0];

    res.json({
      distanceKm: Number((route.distance / 1000).toFixed(2)),
      durationMinutes: Math.round(route.duration / 60),
      geometry: route.geometry,
    });
  } catch (error) {
    console.error("Route error:", error);

    res.status(500).json({
      message: "Failed to calculate route",
      error: error.message,
    });
  }
});

module.exports = router;