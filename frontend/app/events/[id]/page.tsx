
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { getEvent, calculateRoute } from "../../../lib/api";
import type { Event } from "../../../types/event";
import type { RouteResult } from "../../../types/journey";

const RouteMap = dynamic(() => import("../../../components/RouteMap"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 flex h-[350px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900 sm:h-[450px]">
      <p className="animate-pulse text-slate-400">Loading interactive map...</p>
    </div>
  ),
});

interface EventDetailsPageProps {
  params: Promise<{ id: string }>;
}

const startingLocations = [
  { name: "SCRIET, Meerut", lat: 28.9845, lng: 77.7064 },
  { name: "IIT Delhi", lat: 28.545, lng: 77.1926 },
  { name: "Delhi University", lat: 28.6863, lng: 77.2075 },
];

function formatEventDate(date: string) {
  const [year, month, day] = date.slice(0, 10).split("-").map(Number);

  if (!year || !month || !day) return date;

  return new Date(year, month - 1, day).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTravelDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = Math.round(minutes % 60);

  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours} hr`;

  return `${hours} hr ${remainingMinutes} min`;
}

export default function EventDetailsPage({
  params,
}: EventDetailsPageProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedStart, setSelectedStart] = useState(startingLocations[0]);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState("");

  const [route, setRoute] = useState<RouteResult | null>(null);
  const [routeLoading, setRouteLoading] = useState(false);
  const [routeError, setRouteError] = useState("");

  const [canMakeIt, setCanMakeIt] = useState<boolean | null>(null);
  const [latestDeparture, setLatestDeparture] = useState("");
  const [latestDepartureDate, setLatestDepartureDate] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadEvent() {
      try {
        const { id } = await params;
        const data = await getEvent(id);

        if (!cancelled) {
          setEvent(data);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load this event. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadEvent();

    return () => {
      cancelled = true;
    };
  }, [params]);

  function resetRouteResults() {
    setRoute(null);
    setRouteError("");
    setCanMakeIt(null);
    setLatestDeparture("");
    setLatestDepartureDate("");
  }

  function handleUseCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setLocationLoading(true);
    setLocationError("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setSelectedStart({
          name: "My Current Location",
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });

        resetRouteResults();
        setLocationLoading(false);
      },
      (geoError) => {
        let message =
          "Unable to access your location. Please select a starting college.";

        if (geoError.code === 1) {
          message =
            "Location permission denied. You can select your starting college instead.";
        } else if (geoError.code === 2) {
          message =
            "Your location is unavailable. Please select your starting college.";
        } else if (geoError.code === 3) {
          message =
            "Location detection timed out. Please select your starting college.";
        }

        setLocationError(message);
        setLocationLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 60000,
      }
    );
  }

  async function handleCalculateRoute() {
    if (!event) return;

    try {
      setRouteLoading(true);
      setRouteError("");
      resetRouteResults();

      const result = await calculateRoute(
        selectedStart.lat,
        selectedStart.lng,
        event.latitude,
        event.longitude
      );

      setRoute(result);

      const [eventHours, eventMinutes] = event.startTime
        .split(":")
        .map(Number);

      const [year, month, day] = event.date
        .slice(0, 10)
        .split("-")
        .map(Number);

      if (
        !Number.isFinite(eventHours) ||
        !Number.isFinite(eventMinutes) ||
        !year ||
        !month ||
        !day
      ) {
        throw new Error("Invalid event date or start time.");
      }

      const eventDateTime = new Date(
        year,
        month - 1,
        day,
        eventHours,
        eventMinutes,
        0,
        0
      );

      const safetyBufferMinutes = 20;
      const requiredMinutes =
        result.durationMinutes + safetyBufferMinutes;

      const recommendedDeparture = new Date(
        eventDateTime.getTime() - requiredMinutes * 60_000
      );

      setLatestDeparture(
        recommendedDeparture.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );

      setLatestDepartureDate(
        recommendedDeparture.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      );

      setCanMakeIt(new Date().getTime() <= recommendedDeparture.getTime());
    } catch {
      setRoute(null);
      setRouteError(
        "Unable to calculate the route. Please check your connection and try again."
      );
    } finally {
      setRouteLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-slate-700 border-t-blue-400" />
          <p className="mt-4 text-slate-400">Loading event details...</p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="max-w-md rounded-3xl border border-white/10 bg-slate-900 p-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">
            Event unavailable
          </p>
          <h1 className="mt-3 text-2xl font-bold">Event not found</h1>
          <p className="mt-3 text-slate-400">
            {error || "This event could not be found."}
          </p>
          <Link
            href="/events"
            className="mt-6 inline-flex rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
          >
            Back to events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 text-white sm:px-6 sm:py-12">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Navigation */}
        <nav className="flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Event<span className="text-blue-400">Route</span>
          </Link>

          <Link
            href="/events"
            className="rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-blue-400/50 hover:text-white sm:px-4"
          >
            ← All events
          </Link>
        </nav>

        {/* Event information */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950/30 p-5 shadow-xl shadow-black/20 sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-sm font-semibold text-blue-300">
              {event.category}
            </span>

            {event.entryFee === 0 ? (
              <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-sm font-semibold text-emerald-300">
                FREE ENTRY
              </span>
            ) : (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-slate-200">
                Entry ₹{event.entryFee}
              </span>
            )}
          </div>

          <h1 className="mt-5 break-words text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            {event.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
            {event.description}
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 sm:p-5">
              <p className="text-sm text-slate-500">College</p>
              <p className="mt-2 break-words font-semibold text-slate-100">
                <span aria-hidden="true">📍 </span>
                {event.college}
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 sm:p-5">
              <p className="text-sm text-slate-500">Venue</p>
              <p className="mt-2 break-words font-semibold text-slate-100">
                <span aria-hidden="true">🏫 </span>
                {event.venue}
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 sm:p-5">
              <p className="text-sm text-slate-500">Event date</p>
              <p className="mt-2 font-semibold text-slate-100">
                <span aria-hidden="true">📅 </span>
                {formatEventDate(event.date)}
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-slate-950/70 p-4 sm:p-5">
              <p className="text-sm text-slate-500">Event time</p>
              <p className="mt-2 font-semibold text-slate-100">
                <span aria-hidden="true">🕒 </span>
                {event.startTime} – {event.endTime}
              </p>
            </div>
          </div>
        </section>

        {/* Journey planner */}
        <section className="mt-8 rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.08] to-slate-900/80 p-5 shadow-xl shadow-black/10 sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-2xl text-blue-300">
            ↗
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
            EventRoute journey planner
          </p>

          <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
            Plan your journey
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            Choose your starting location to calculate the route, estimate
            travel time, and find a recommended departure time.
          </p>

          <div className="mt-7">
            <label
              htmlFor="starting-location"
              className="mb-2 block text-sm font-semibold text-slate-200"
            >
              Starting location
            </label>

            <select
              id="starting-location"
              value={selectedStart.name}
              onChange={(e) => {
                const location = startingLocations.find(
                  (item) => item.name === e.target.value
                );

                if (location) {
                  setSelectedStart(location);
                  setLocationError("");
                  resetRouteResults();
                }
              }}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
            >
              {startingLocations.map((location) => (
                <option key={location.name} value={location.name}>
                  {location.name}
                </option>
              ))}
              {selectedStart.name === "My Current Location" && (
                <option value="My Current Location">
                  My Current Location
                </option>
              )}
            </select>

            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={locationLoading}
              className="mt-3 w-full rounded-xl border border-blue-400/30 bg-blue-400/[0.07] px-4 py-3 text-sm font-semibold text-blue-300 transition hover:bg-blue-400/15 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-5"
            >
              {locationLoading
                ? "Detecting location..."
                : "📍 Use my current location"}
            </button>

            {locationError && (
              <p role="status" className="mt-3 text-sm leading-6 text-amber-300">
                {locationError}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleCalculateRoute}
            disabled={routeLoading}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {routeLoading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Calculating route...
              </>
            ) : (
              <>Calculate my route <span aria-hidden="true">→</span></>
            )}
          </button>

          {routeError && (
            <div
              role="alert"
              className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm leading-6 text-red-300"
            >
              {routeError}
            </div>
          )}
        </section>

        {/* Route results */}
        {route && (
          <section className="mt-8">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                Your journey
              </p>
              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Route overview
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 transition hover:border-blue-400/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Total distance</p>
                  <span className="text-xl text-blue-300">↗</span>
                </div>
                <p className="mt-4 text-3xl font-extrabold">
                  {Number(route.distanceKm).toFixed(1)}
                  <span className="ml-2 text-base font-medium text-slate-400">
                    km
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/80 p-5 transition hover:border-blue-400/30">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-400">Estimated travel time</p>
                  <span className="text-xl text-blue-300">◷</span>
                </div>
                <p className="mt-4 text-3xl font-extrabold">
                  {formatTravelDuration(route.durationMinutes)}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.06] p-5 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-emerald-300">Route status</p>
                  <span className="text-xl text-emerald-300">✓</span>
                </div>
                <p className="mt-4 text-2xl font-extrabold text-emerald-300">
                  Route found
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  Your route is ready to view.
                </p>
              </div>
            </div>

            {/* Smart Journey Check */}
            <div
              className={`mt-6 rounded-3xl border p-5 sm:p-7 ${
                canMakeIt === true
                  ? "border-emerald-400/20 bg-emerald-500/[0.05]"
                  : canMakeIt === false
                    ? "border-red-400/20 bg-red-500/[0.05]"
                    : "border-white/10 bg-slate-900/70"
              }`}
            >
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">
                    Smart Journey Check
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                    Can I make it?
                  </h3>

                  <div className="mt-5 space-y-3 text-sm text-slate-400">
                    <p>
                      <span aria-hidden="true">📅 </span>
                      Event date:{" "}
                      <span className="font-semibold text-slate-200">
                        {formatEventDate(event.date)}
                      </span>
                    </p>

                    <p>
                      <span aria-hidden="true">🕒 </span>
                      Starts at:{" "}
                      <span className="font-semibold text-slate-200">
                        {event.startTime}
                      </span>
                    </p>

                    <p>
                      <span aria-hidden="true">🚗 </span>
                      Travel time:{" "}
                      <span className="font-semibold text-slate-200">
                        {formatTravelDuration(route.durationMinutes)}
                      </span>
                    </p>

                    <p>
                      <span aria-hidden="true">🛡️ </span>
                      Safety buffer:{" "}
                      <span className="font-semibold text-slate-200">
                        20 minutes
                      </span>
                    </p>
                  </div>
                </div>

                <div
                  className={`w-full min-w-0 rounded-2xl p-5 text-center sm:p-6 md:w-64 ${
                    canMakeIt === true
                      ? "bg-emerald-500/10"
                      : canMakeIt === false
                        ? "bg-red-500/10"
                        : "bg-slate-800/70"
                  }`}
                >
                  {canMakeIt === null && (
                    <>
                      <p className="text-lg font-bold text-slate-200">
                        Check complete
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">
                        Your departure recommendation is being prepared.
                      </p>
                    </>
                  )}

                  {canMakeIt === true && (
                    <>
                      <p className="text-lg font-bold text-emerald-300">
                        ✓ You can make it!
                      </p>
                      <p className="mt-3 text-sm text-slate-400">
                        Recommended departure
                      </p>
                      <p className="mt-1 break-words text-3xl font-extrabold text-white">
                        {latestDeparture}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        {latestDepartureDate}
                      </p>
                      <p className="mt-3 text-xs leading-5 text-slate-400">
                        Leave by this time to allow for the estimated journey
                        and a 20-minute buffer.
                      </p>
                    </>
                  )}

                  {canMakeIt === false && (
                    <>
                      <p className="text-lg font-bold text-red-300">
                        ⚠ You may be late
                      </p>
                      <p className="mt-3 text-sm text-slate-400">
                        Recommended departure
                      </p>
                      <p className="mt-1 break-words text-3xl font-extrabold text-white">
                        {latestDeparture}
                      </p>
                      <p className="mt-2 text-xs text-slate-400">
                        {latestDepartureDate}
                      </p>
                      <p className="mt-3 text-xs leading-5 text-slate-400">
                        The recommended departure time has passed. Consider
                        another travel option or check with the event
                        organizer about late arrival.
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Interactive map */}
            <div className="mt-8">
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
                  Navigation
                </p>
                <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                  Your route on the map
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Explore the calculated route between your starting point and
                  the event destination.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-2 sm:p-3">
                <RouteMap
                  route={route}
                  start={selectedStart}
                  destination={{
                    name: event.college,
                    lat: event.latitude,
                    lng: event.longitude,
                  }}
                />
              </div>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 py-7 text-center text-sm text-slate-500">
          <Link href="/" className="font-bold text-slate-300 transition hover:text-blue-400">
            Event<span className="text-blue-400">Route</span>
          </Link>
          <p className="mt-2">Discover. Plan. Reach.</p>
        </footer>
      </div>
    </main>
  );
}
