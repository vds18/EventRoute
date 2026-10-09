
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import EventCard from "../../components/EventCard";
import type { Event } from "../../types/event";
import { getEvents } from "../../lib/api";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch {
        setError("Unable to load events. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(events.map((event) => event.category))),
  ];

  const filteredEvents = events.filter((event) => {
    const searchTerm = search.toLowerCase().trim();

    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm) ||
      event.college.toLowerCase().includes(searchTerm);

    const matchesCategory =
      category === "All" || event.category === category;

    return matchesSearch && matchesCategory;
  });

  const filtersActive = search.trim() !== "" || category !== "All";

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-10 text-white sm:px-6 sm:py-14">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Navigation */}
        <nav className="mb-12 flex items-center justify-between border-b border-white/10 pb-5">
          <Link href="/" className="text-xl font-extrabold tracking-tight sm:text-2xl">
            Event<span className="text-blue-400">Route</span>
          </Link>

          <Link
            href="/"
            className="rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 transition hover:border-blue-400/50 hover:text-white"
          >
            ← Home
          </Link>
        </nav>

        {/* Page heading */}
        <header className="mb-10">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
            <span className="h-2 w-2 rounded-full bg-blue-400" />
            Discover · Explore · Attend
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find your next
            <span className="block text-blue-400">opportunity.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
            Explore workshops, hackathons, competitions, and campus events.
            Find an opportunity and plan your journey to get there.
          </p>
        </header>

        {/* Search and filters */}
        {!loading && !error && events.length > 0 && (
          <section
            aria-label="Search and filter events"
            className="mb-8 rounded-2xl border border-white/10 bg-slate-900/70 p-4 sm:p-5"
          >
            <div className="grid gap-4 md:grid-cols-[1fr_230px]">
              {/* Search */}
              <div className="relative">
                <label htmlFor="event-search" className="mb-2 block text-sm font-medium text-slate-300">
                  Search opportunities
                </label>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-4 left-4 text-lg text-slate-500"
                >
                  ⌕
                </span>

                <input
                  id="event-search"
                  type="search"
                  placeholder="Search by event or college..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Category */}
              <div>
                <label htmlFor="event-category" className="mb-2 block text-sm font-medium text-slate-300">
                  Event category
                </label>

                <select
                  id="event-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "All" ? "All categories" : item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick category filters */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Browse categories
              </p>

              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    aria-pressed={category === item}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                      category === item
                        ? "border-blue-400 bg-blue-500 text-white"
                        : "border-slate-700 bg-slate-950 text-slate-300 hover:border-blue-400/50 hover:text-white"
                    }`}
                  >
                    {item === "All" ? "All events" : item}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-white/10 bg-slate-900 p-5"
              >
                <div className="h-4 w-24 rounded bg-slate-800" />
                <div className="mt-5 h-6 w-4/5 rounded bg-slate-800" />
                <div className="mt-3 h-4 w-3/5 rounded bg-slate-800" />
                <div className="mt-8 h-10 rounded-lg bg-slate-800" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div
            role="alert"
            className="rounded-2xl border border-red-400/20 bg-red-400/5 p-8 text-center"
          >
            <p className="text-lg font-bold text-red-300">
              We couldn&apos;t load the events.
            </p>
            <p className="mt-2 text-sm text-slate-400">{error}</p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
            >
              Try again
            </button>
          </div>
        )}

        {/* Events */}
        {!loading && !error && events.length > 0 && (
          <section aria-label="Event results">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold sm:text-2xl">
                  {filtersActive ? "Search results" : "Explore events"}
                </h2>

                <p className="mt-1 text-sm text-slate-400">
                  Showing{" "}
                  <span className="font-semibold text-white">
                    {filteredEvents.length}
                  </span>{" "}
                  {filteredEvents.length === 1 ? "opportunity" : "opportunities"}
                </p>
              </div>

              {filtersActive && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-blue-300 transition hover:border-blue-400/50 hover:bg-blue-400/5"
                >
                  Clear filters ✕
                </button>
              )}
            </div>

            {filteredEvents.length > 0 ? (
              <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-14 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-400/10 text-2xl">
                  ⌕
                </div>

                <h3 className="mt-5 text-xl font-bold">No matching events</h3>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                  Try another search term or select a different category to
                  discover more opportunities.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 rounded-xl bg-blue-500 px-5 py-3 font-semibold transition hover:bg-blue-400"
                >
                  Show all events
                </button>
              </div>
            )}
          </section>
        )}

        {/* Empty backend state */}
        {!loading && !error && events.length === 0 && (
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-10 text-center">
            <h2 className="text-xl font-bold">No events available yet</h2>
            <p className="mt-2 text-slate-400">
              Check back later for new opportunities.
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 border-t border-white/10 py-6 text-center text-sm text-slate-500">
          <Link href="/" className="font-semibold text-slate-300 hover:text-blue-400">
            Event<span className="text-blue-400">Route</span>
          </Link>
          <span className="mx-2">·</span>
          Navigate the Opportunity.
        </footer>
      </div>
    </main>
  );
}
