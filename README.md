# EventRoute — Navigate the Opportunity

EventRoute is an event discovery and journey-planning web application designed to help students find college events and plan how to reach them.

Instead of simply browsing events, users can explore available opportunities, view event details, calculate a route from a selected starting location, and check whether they can leave in time.

## Features

- **Event discovery:** Browse events retrieved from the backend.
- **Search and filtering:** Find events by title or college and filter by category.
- **Event details:** View event information, including venue, date, time, category, and entry fee.
- **Route planning:** Select a starting location and calculate a route to the event.
- **Distance and travel time:** View route statistics returned by the routing service.
- **Interactive map:** Visualize the route on a map.
- **Smart Journey Check:** Calculate a recommended departure time using estimated travel duration and a 20-minute safety buffer.
- **Responsive interface:** Browse the application on desktop and mobile screens.
- **Error handling:** Handle cases such as missing events, empty search results, and unavailable backend services.

## Technology Stack

| Area | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Mapping | Leaflet, React Leaflet, OpenStreetMap |
| Route calculation | OSRM routing service |

## Project Structure

```text
eventroute/
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   └── events/
│   │       ├── page.tsx
│   │       └── [id]/
│   │           └── page.tsx
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

*This is the expected high-level structure; adjust it to match the actual files in your repository.*

## How It Works

1. The frontend requests event data from the Express backend.
2. The backend retrieves event information from MongoDB.
3. Users search for events or open an event details page.
4. Users select a starting location and request a route.
5. The backend requests route information from OSRM.
6. The application displays the route, distance, estimated travel duration, and recommended departure time.
7. The Smart Journey Check compares the current time with the recommended departure time.

## Getting Started

### Prerequisites

Install the following before running the project:

- Node.js and npm
- MongoDB connection or MongoDB Atlas account
- Git (optional, for cloning the repository)

### 1. Get the project

```bash
git clone YOUR_REPOSITORY_URL
cd eventroute
```

Replace `YOUR_REPOSITORY_URL` with your repository URL. If you already have the project locally, open its root directory instead.

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` using the environment variable names expected by your backend code. For example:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
```

Check `server.js` and `config/db.js` to confirm the exact variable names used by your implementation.

### 3. Start the backend

```bash
npx nodemon server.js
```

If Nodemon is not installed, use the start script defined in `backend/package.json`, or run:

```bash
node server.js
```

The backend should be available at `http://localhost:5000` if configured to use port 5000.

### 4. Configure the frontend

Open a second terminal:

```bash
cd frontend
npm install
```

Configure the API base URL using the environment variable expected by `frontend/lib/api.ts`. For a typical local setup, the backend base URL is:

```text
http://localhost:5000
```

Use the actual variable name required by the project. Do not expose database credentials in frontend environment variables.

### 5. Start the frontend

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## API Overview

The current project includes these backend endpoints:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/events` | Retrieve events |
| GET | `/api/events/:id` | Retrieve an event by ID |
| POST | `/api/events` | Create an event |
| POST | `/api/route` | Calculate route information |

Confirm the request body, response format, and validation rules in the actual route files before relying on this table for integration.

## Smart Journey Check

EventRoute estimates the latest recommended departure time using:

**Recommended departure = Event start time − Estimated travel duration − 20-minute safety buffer**

The application compares the recommended departure time with the current time to indicate whether the user should still be able to leave on time.

This is an estimate, not a guarantee. Actual travel times may change because of traffic, transport availability, weather, or other delays. The routing and timing features should not be treated as a live traffic prediction unless that capability is implemented separately.

## Testing

The following edge cases have been manually tested during development:

- Search with no matching results
- Clearing search and category filters
- Opening an invalid event URL
- Handling backend unavailability
- Checking departure recommendations for a past event
- Checking departure recommendations for an upcoming event

Retest these scenarios after significant code changes or deployment.

## Current Limitations

- Route estimates depend on the routing service being available.
- Browser geolocation may fail or time out; manual starting-location selection is available.
- The departure recommendation uses estimated travel duration and a fixed 20-minute buffer.
- Event data depends on the records available in the database.
- A route estimate does not guarantee arrival at the event on time.

## Future Improvements

- Live traffic-aware travel estimates
- More flexible starting-location selection
- Improved route alternatives
- Event reminders and calendar integration
- More comprehensive automated tests
- Production deployment and monitoring

## Project Goal

EventRoute aims to make discovering college opportunities and planning the journey to attend them easier through a single web application.

---

**Built as a hackathon project.**