import Link from "next/link";
import type { Event } from "../types/event";

interface EventCardProps {
  event: Event;
}

function getCategoryStyle(category: string) {
  const value = category.toLowerCase();

  if (value.includes("hackathon")) {
    return {
      label: "HACKATHON",
      gradient: "from-violet-600/80 via-indigo-600/50 to-slate-950",
      accent: "text-violet-300",
      icon: "⌘",
    };
  }

  if (value.includes("workshop")) {
    return {
      label: "WORKSHOP",
      gradient: "from-cyan-600/70 via-blue-700/50 to-slate-950",
      accent: "text-cyan-300",
      icon: "✳",
    };
  }

  if (value.includes("competition")) {
    return {
      label: "COMPETITION",
      gradient: "from-orange-600/70 via-rose-700/40 to-slate-950",
      accent: "text-orange-300",
      icon: "✦",
    };
  }

  if (value.includes("conference") || value.includes("summit")) {
    return {
      label: "CONFERENCE",
      gradient: "from-blue-600/70 via-indigo-700/50 to-slate-950",
      accent: "text-blue-300",
      icon: "◈",
    };
  }

  if (value.includes("network")) {
    return {
      label: "NETWORKING",
      gradient: "from-emerald-600/60 via-teal-700/50 to-slate-950",
      accent: "text-emerald-300",
      icon: "◎",
    };
  }

  if (value.includes("cultural")) {
    return {
      label: "CULTURAL",
      gradient: "from-pink-600/70 via-purple-700/50 to-slate-950",
      accent: "text-pink-300",
      icon: "✧",
    };
  }

  return {
    label: category.toUpperCase(),
    gradient: "from-blue-600/70 via-indigo-700/50 to-slate-950",
    accent: "text-blue-300",
    icon: "✦",
  };
}

export default function EventCard({ event }: EventCardProps) {
  const style = getCategoryStyle(event.category);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.09] bg-slate-900/90 shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-400/40 hover:shadow-2xl hover:shadow-blue-500/[0.08]">
      {/* Event visual */}
      <div
        className={`relative flex h-48 items-end overflow-hidden bg-gradient-to-br ${style.gradient} p-5 sm:h-52`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -top-12 h-48 w-48 rounded-full border border-white/[0.08] transition-transform duration-500 group-hover:scale-110"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-1 -top-5 h-32 w-32 rounded-full border border-white/[0.10]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-10 top-8 h-16 w-16 rounded-2xl border border-white/[0.10] bg-white/[0.03] transition-transform duration-500 group-hover:rotate-12"
        />

        <div className="relative z-10 flex w-full items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/60">
              Discover opportunities
            </p>
            <p className={`mt-2 text-4xl font-light ${style.accent}`}>
              {style.icon}
            </p>
          </div>

          <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1.5 text-[10px] font-bold tracking-[0.15em] text-white/90 backdrop-blur-md">
            {style.label}
          </span>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/40 to-transparent"
        />
      </div>

      {/* Event information */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-slate-400">
            {event.category}
          </span>

          {event.entryFee === 0 ? (
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">
              Free entry
            </span>
          ) : (
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm font-bold text-white">
              ₹{event.entryFee}
            </span>
          )}
        </div>

        <h2 className="text-lg font-bold leading-snug text-white transition-colors duration-200 group-hover:text-blue-300 sm:text-xl">
          {event.title}
        </h2>

        <div className="mt-4 flex items-start gap-3">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.04] text-sm text-blue-300"
          >
            ⌖
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Venue
            </p>
            <p className="mt-1 text-sm leading-5 text-slate-300">
              {event.college}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-white/[0.07] bg-slate-950/60 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Date
            </p>
            <p className="mt-2 break-words text-sm font-semibold text-slate-200">
              {event.date}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-slate-950/60 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              Time
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-200">
              {event.startTime}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              to {event.endTime}
            </p>
          </div>
        </div>

        <div className="mt-auto pt-5">
          <Link
            href={`/events/${event._id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/10 transition-all duration-200 hover:bg-blue-400 hover:shadow-blue-500/20 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Plan Your Journey
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}
