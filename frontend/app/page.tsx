
import Link from "next/link";

const features = [
  {
    number: "01",
    title: "Discover Events",
    description:
      "Explore workshops, hackathons, competitions, and networking opportunities across colleges.",
    icon: "✦",
  },
  {
    number: "02",
    title: "Plan Your Journey",
    description:
      "Calculate your route and understand the distance and estimated travel time before leaving.",
    icon: "↗",
  },
  {
    number: "03",
    title: "Know When to Leave",
    description:
      "Get a recommended departure time with a safety buffer to help you reach events on time.",
    icon: "◷",
  },
];

const highlights = [
  { value: "01", label: "Discover opportunities" },
  { value: "02", label: "Calculate your route" },
  { value: "03", label: "Make it on time" },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link href="/" className="text-2xl font-extrabold tracking-tight">
            Event<span className="text-blue-400">Route</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <Link href="#how-it-works" className="transition hover:text-blue-400">
              How it works
            </Link>
            <Link href="/events" className="transition hover:text-blue-400">
              Discover events
            </Link>
          </div>

          <Link
            href="/events"
            className="rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold transition hover:bg-blue-400 sm:px-5"
          >
            Explore Events <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative isolate">
        {/* Background effects */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-10 -z-10 h-96 w-96 rounded-full bg-blue-600/20 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 top-64 -z-10 h-80 w-80 rounded-full bg-indigo-600/15 blur-[110px]"
        />

        <div className="mx-auto grid min-h-[82vh] max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-blue-300 sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              HACKSHIFT · PROBLEM STATEMENT 1
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Navigate the
              <span className="mt-2 block bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                Opportunity.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Great opportunities are worth the journey. Discover
              inter-college events, calculate your travel route, and
              find out when you should leave to make it on time.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/events"
                className="rounded-xl bg-blue-500 px-6 py-3.5 font-bold shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-400"
              >
                Explore Opportunities <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="#how-it-works"
                className="rounded-xl border border-white/15 bg-white/[0.03] px-6 py-3.5 font-semibold text-slate-200 transition hover:border-blue-400/50 hover:bg-white/[0.06]"
              >
                How it works
              </Link>
            </div>

            <p className="mt-7 text-sm text-slate-500">
              Built for students who don’t want to miss an opportunity.
            </p>
          </div>

          {/* Journey preview card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-2xl" />

            <div className="relative rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl shadow-black/30 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
                    Your next journey
                  </p>
                  <h2 className="mt-2 text-xl font-bold">Event planner</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-2xl text-blue-300">
                  ↗
                </div>
              </div>

              {/* Route illustration */}
              <div className="relative mt-8 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
                <div className="absolute bottom-12 left-[2.15rem] top-12 border-l-2 border-dashed border-blue-400/60" />

                <div className="relative flex items-start gap-4">
                  <div className="z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-300/50 bg-blue-500 text-xs">
                    A
                  </div>
                  <div className="pb-8">
                    <p className="text-xs text-slate-500">STARTING POINT</p>
                    <p className="mt-1 font-semibold">Your college</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Choose your location
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start gap-4">
                  <div className="z-10 mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-indigo-300/50 bg-indigo-500 text-xs">
                    B
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">DESTINATION</p>
                    <p className="mt-1 font-semibold">Your next opportunity</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Workshop · Hackathon · Conference
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">Route planning</p>
                  <p className="mt-2 font-bold text-blue-300">
                    <span aria-hidden="true">↗ </span>Distance & time
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">Smart journey check</p>
                  <p className="mt-2 font-bold text-emerald-300">
                    <span aria-hidden="true">◷ </span>Departure advice
                  </p>
                </div>
              </div>

              <Link
                href="/events"
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-white py-3 font-bold text-slate-950 transition hover:bg-blue-100"
              >
                Plan Your Journey <span className="ml-2">→</span>
              </Link>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden rounded-2xl border border-white/10 bg-slate-900 px-4 py-3 shadow-xl sm:block">
              <p className="text-xs text-slate-400">One simple goal</p>
              <p className="mt-1 text-sm font-bold text-white">
                Reach the right opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three-step overview */}
      <section className="border-y border-white/[0.08] bg-white/[0.02]">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 py-8 sm:grid-cols-3 sm:px-8">
          {highlights.map((item) => (
            <div key={item.value} className="flex items-center gap-4 py-2">
              <span className="text-sm font-bold tracking-widest text-blue-400">
                {item.value}
              </span>
              <span className="text-sm font-medium text-slate-300">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">
            Simple by design
          </p>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            From discovery to destination.
          </h2>
          <p className="mt-5 leading-7 text-slate-400">
            Spend less time figuring out the logistics and more time
            making the most of every opportunity.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.number}
              className="group rounded-3xl border border-white/10 bg-slate-900/60 p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-400/10 text-2xl text-blue-300 transition group-hover:bg-blue-400/20">
                  {feature.icon}
                </span>
                <span className="text-sm font-bold tracking-widest text-slate-600">
                  {feature.number}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-bold">{feature.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-5 pb-24 sm:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-indigo-600/10 to-slate-900 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[90px]"
          />

          <div className="relative">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-300">
              Your next opportunity awaits
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold tracking-tight sm:text-5xl">
              Don’t just find the event. Make it there.
            </h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-300">
              Discover what’s happening across colleges and plan
              your journey with confidence.
            </p>
            <Link
              href="/events"
              className="mt-8 inline-flex items-center rounded-xl bg-blue-500 px-7 py-3.5 font-bold transition hover:-translate-y-0.5 hover:bg-blue-400"
            >
              Find Your Next Event <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            <span className="font-bold text-slate-300">
              Event<span className="text-blue-400">Route</span>
            </span>{" "}
            — Navigate the Opportunity.
          </p>
          <p>Discover. Plan. Reach.</p>
        </div>
      </footer>
    </main>
  );
}
