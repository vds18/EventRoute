const dotenv = require("dotenv");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Event = require("./models/Event");

dotenv.config();

const events = [
  {
    title: "AI Innovation Hackathon",
    description:
      "Build innovative AI-powered solutions with students from different colleges.",
    college: "IIIT Delhi",
    category: "Hackathon",
    date: "2026-10-18",
    startTime: "10:00",
    endTime: "19:00",
    latitude: 28.5458,
    longitude: 77.2732,
    venue: "IIIT Delhi Campus",
    entryFee: 0,
    registrationLink: "https://example.com",
  },

  {
    title: "Web Development Workshop",
    description:
      "Hands-on workshop covering modern full-stack web development.",
    college: "Delhi Technological University",
    category: "Workshop",
    date: "2026-10-18",
    startTime: "11:00",
    endTime: "15:00",
    latitude: 28.7501,
    longitude: 77.1177,
    venue: "DTU Innovation Center",
    entryFee: 100,
    registrationLink: "https://example.com",
  },

  {
    title: "Startup Pitch Competition",
    description:
      "Students pitch their startup ideas to entrepreneurs and investors.",
    college: "NSUT",
    category: "Competition",
    date: "2026-10-19",
    startTime: "10:00",
    endTime: "17:00",
    latitude: 28.6093,
    longitude: 77.0384,
    venue: "NSUT Auditorium",
    entryFee: 0,
    registrationLink: "https://example.com",
  },

  {
    title: "AI & Machine Learning Summit",
    description:
      "Talks and networking sessions with AI researchers and industry professionals.",
    college: "IIT Delhi",
    category: "Conference",
    date: "2026-10-20",
    startTime: "09:30",
    endTime: "17:30",
    latitude: 28.545,
    longitude: 77.1926,
    venue: "IIT Delhi",
    entryFee: 250,
    registrationLink: "https://example.com",
  },

  {
    title: "Entrepreneurship Networking Meet",
    description:
      "Connect with founders, student entrepreneurs and startup communities.",
    college: "Delhi University",
    category: "Networking",
    date: "2026-10-21",
    startTime: "16:00",
    endTime: "19:00",
    latitude: 28.6863,
    longitude: 77.2075,
    venue: "DU North Campus",
    entryFee: 0,
    registrationLink: "https://example.com",
  },

  {
    title: "Annual Cultural Fest",
    description:
      "A large inter-college cultural festival featuring music, dance and competitions.",
    college: "Amity University Noida",
    category: "Cultural",
    date: "2026-10-24",
    startTime: "10:00",
    endTime: "20:00",
    latitude: 28.544,
    longitude: 77.332,
    venue: "Amity University Campus",
    entryFee: 150,
    registrationLink: "https://example.com",
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    await Event.deleteMany();

    await Event.insertMany(events);

    console.log("Events seeded successfully!");

    await mongoose.connection.close();

    process.exit(0);
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

seedDatabase();