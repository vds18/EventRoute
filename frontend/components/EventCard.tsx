import Link from "next/link";
import type { Event } from "../types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-blue-500/60 hover:shadow-xl hover:shadow-blue-500/10">

      <div className="flex h-44 items-center justify-center bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-purple-600/30">
        <span className="text-6xl">🎯</span>
      </div>

      <div className="p-5">

        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
            {event.category}
          </span>

          {event.entryFee === 0 ? (
            <span className="text-sm font-semibold text-emerald-400">
              FREE
            </span>
          ) : (
            <span className="text-sm font-semibold text-slate-300">
              ₹{event.entryFee}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-white">
          {event.title}
        </h2>

        <p className="mt-3 text-sm text-slate-400">
          📍 {event.college}
        </p>

        <p className="mt-2 text-sm text-slate-400">
          📅 {event.date}
        </p>

        <p className="mt-2 text-sm text-slate-400">
          ⏰ {event.startTime} – {event.endTime}
        </p>

        <Link
          href={`/events/${event._id}`}
          className="mt-5 block rounded-xl bg-blue-500 px-4 py-3 text-center font-semibold text-white transition hover:bg-blue-400"
        >
          Plan Journey →
        </Link>

      </div>
    </div>
  );
}