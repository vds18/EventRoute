# EventRoute — Navigate the Opportunity 

**Discover college events. Plan your journey. Arrive on time.**

EventRoute is a web application built for students to discover inter-college events and plan how to get there. Browse opportunities, explore event details, calculate routes, and estimate when you should leave—all in one place.

🌐 **Live Demo:** [EventRoute](https://eventroute-frontend.vercel.app)  
💻 **Source Code:** [GitHub Repository](https://github.com/vds18/EventRoute)

---

## 📸 Screenshots

| Homepage | Events Discovery |
|---|---|
| ![EventRoute homepage](https://github.com/vds18/EventRoute/blob/master/frontend/public/screenshots/homepage.png?raw=true) | ![Event discovery page](https://github.com/vds18/EventRoute/blob/master/frontend/public/screenshots/events.png?raw=true) |

| Event Details | Route Planning |
|---|---|
| ![Event details page](https://github.com/vds18/EventRoute/blob/master/frontend/public/screenshots/event-details.png?raw=true) | ![Route planning map](https://github.com/vds18/EventRoute/blob/master/frontend/public/screenshots/route-planning.png?raw=true) |

---

## ✨ Features

- **Event Discovery:** Browse events retrieved from the backend.
- **Search and Filtering:** Find events by title or college and filter by category.
- **Event Details:** View event venue, date, time, category, and entry fee.
- **Route Planning:** Select a starting location and calculate a route to an event.
- **Distance and Travel Time:** View estimated route distance and duration.
- **Interactive Map:** Visualize the calculated route.
- **Smart Journey Check:** Estimate a recommended departure time using travel duration and a 20-minute safety buffer.
- **Responsive Design:** Use the application on desktop and mobile screens.
- **Error Handling:** Handle missing events, empty search results, and backend availability issues.

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Mapping | Leaflet, React Leaflet, OpenStreetMap |
| Routing | OSRM routing service |
| Deployment | Vercel |

## 🏗️ Project Structure

```text
eventroute/
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── events/
│   ├── components/
│   │   ├── EventCard.tsx
│   │   └── RouteMap.tsx
│   ├── lib/
│   │   └── api.ts
│   └── types/
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── seedEvents.js
│   └── server.js
├── README.md
└── .gitignore
```

## ⚙️ Getting Started

### Prerequisites

- Node.js and npm
- A MongoDB Atlas database or compatible MongoDB instance
- Git

### 1. Clone the repository

```bash
git clone https://github.com/vds18/EventRoute.git
cd EventRoute
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `backend/.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Replace the placeholder with your MongoDB connection string. Never commit your `.env` file or expose database credentials.

Start the backend:

```bash
npm run dev
```

If Nodemon is unavailable, run:

```bash
npm start
```

The backend should run at `http://localhost:5000` with the default port configuration.

### 3. Set up the frontend

Open a second terminal from the repository root:

```bash
cd frontend
npm install
```

Create `frontend/.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

This configures the frontend to use your local backend. The deployed frontend uses its separately configured Vercel environment variable.

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 🔌 API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/events` | Retrieve events |
| `GET` | `/api/events/:id` | Retrieve an event by ID |
| `POST` | `/api/events` | Create an event |
| `POST` | `/api/route` | Calculate route information |

## 🧭 How Smart Journey Check Works

EventRoute estimates the recommended departure time using:

**Recommended departure = Event start time − Estimated travel duration − 20-minute safety buffer**

The application uses this estimate to help users decide whether they should leave now or whether they may already be late.

This is an estimate, not a guarantee. Actual travel times may vary, and the route calculation should not be interpreted as a live traffic prediction.

## 🧪 Testing

The following scenarios have been manually tested during development:

- Search with no matching results
- Clearing search and category filters
- Opening an invalid event URL
- Backend unavailability
- Departure recommendations for past and upcoming events
- Production event discovery and event details
- Production route calculation and map rendering
- Desktop and mobile layouts

## ⚠️ Current Limitations

- Route calculations depend on the routing service being available.
- Browser geolocation may fail or time out; manual starting-location selection is available.
- Departure recommendations use estimated travel duration and a fixed 20-minute buffer.
- Available events depend on the records stored in the database.
- Route estimates cannot guarantee arrival on time.

## 🔮 Future Improvements

- Traffic-aware travel estimates
- More flexible starting-location selection
- Alternative route options
- Event reminders and calendar integration
- Automated tests and improved monitoring

## 🎯 Project Goal

EventRoute aims to make discovering college opportunities and planning the journey to attend them easier through a single web application.

---

**Built for HackShift — Problem Statement 1: EventRoute — Navigate the Opportunity.**
