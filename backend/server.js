const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");
const routeRoutes = require("./routes/routeRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "EventRoute API is running",
  });
});

app.use("/api/events", eventRoutes);
app.use("/api/route", routeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});