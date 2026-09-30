import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Check,
  LockKeyhole,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";

const Accounts = () => {
  const user = useAuthStore((state) => state?.user);
  const [profile, setProfile] = useState({
    fullname: user?.fullname || "Alex Morgan",
    email: user?.email || "alex.morgan@example.com",
    role: "Creative strategist",
    location: "Lisbon, Portugal",
    timezone: "Europe/Lisbon",
    language: "English (US)",
    bio: "Collecting clear thoughts, useful systems, and small sparks of inspiration.",
  });

  const updateField = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  return (
    <main className="min-h-[calc(100vh-72px)] bg-ink font-sans text-lilac-50">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(122,38,255,0.18),transparent_34%),linear-gradient(rgba(173,96,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(173,96,255,0.035)_1px,transparent_1px)] bg-size-[auto,56px_56px,56px_56px]" />

      <div className="relative mx-auto max-w-300 px-5 py-7 sm:px-8 sm:py-10 lg:px-12">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-lilac-400 transition hover:text-white"
          >
            <ArrowLeft size={16} /> Back to home
          </Link>
          <span className="hidden items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-lilac-600 sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />{" "}
            Account overview
          </span>
        </div>

        <header className="mb-8 max-w-175">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
            Personal space
          </p>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
            Account settings
          </h1>
          <p className="mt-4 text-sm leading-6 text-lilac-400">
            Shape the details around your workspace and make NEXUS feel like
            yours.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
          <div className="space-y-6">
            <section className="border border-violet-300/15 bg-violet-950/25 p-5 shadow-[0_0_42px_rgba(127,48,183,0.08)] sm:p-8">
              <div className="mb-7 flex items-center justify-between gap-4 border-b border-violet-300/10 pb-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-300">
                    Profile
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-white">
                    Your identity
                  </h2>
                </div>
                <div className="grid size-14 place-items-center rounded-full bg-violet-400 text-xl font-extrabold text-violet-950 shadow-[0_0_24px_rgba(199,116,255,0.3)]">
                  {profile.fullname
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label
                  className="text-xs font-bold text-lilac-300"
                  htmlFor="account-name"
                >
                  Full name
                  <span className="mt-2 flex items-center gap-3 border border-violet-300/15 bg-ink-900 px-3 focus-within:border-violet-400/60">
                    <UserRound size={16} className="text-violet-300/60" />
                    <input
                      id="account-name"
                      value={profile.fullname}
                      onChange={(event) =>
                        updateField("fullname", event.target.value)
                      }
                      className="h-11 w-full bg-transparent text-sm font-normal text-lilac-50 outline-none"
                    />
                  </span>
                </label>
                <label
                  className="text-xs font-bold text-lilac-300"
                  htmlFor="account-role"
                >
                  Professional role
                  <span className="mt-2 flex items-center gap-3 border border-violet-300/15 bg-ink-900 px-3 focus-within:border-violet-400/60">
                    <Sparkles size={16} className="text-violet-300/60" />
                    <input
                      id="account-role"
                      value={profile.role}
                      onChange={(event) =>
                        updateField("role", event.target.value)
                      }
                      className="h-11 w-full bg-transparent text-sm font-normal text-lilac-50 outline-none"
                    />
                  </span>
                </label>
                <label
                  className="text-xs font-bold text-lilac-300"
                  htmlFor="account-email"
                >
                  Email address
                  <span className="mt-2 flex items-center gap-3 border border-violet-300/15 bg-ink-900 px-3 focus-within:border-violet-400/60">
                    <Mail size={16} className="text-violet-300/60" />
                    <input
                      id="account-email"
                      type="email"
                      value={profile.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      className="h-11 w-full bg-transparent text-sm font-normal text-lilac-50 outline-none"
                    />
                  </span>
                </label>
                <label
                  className="text-xs font-bold text-lilac-300"
                  htmlFor="account-location"
                >
                  Location
                  <span className="mt-2 flex items-center gap-3 border border-violet-300/15 bg-ink-900 px-3 focus-within:border-violet-400/60">
                    <MapPin size={16} className="text-violet-300/60" />
                    <input
                      id="account-location"
                      value={profile.location}
                      onChange={(event) =>
                        updateField("location", event.target.value)
                      }
                      className="h-11 w-full bg-transparent text-sm font-normal text-lilac-50 outline-none"
                    />
                  </span>
                </label>
              </div>

              <label
                className="mt-5 block text-xs font-bold text-lilac-300"
                htmlFor="account-bio"
              >
                About you
                <textarea
                  id="account-bio"
                  rows="4"
                  value={profile.bio}
                  onChange={(event) => updateField("bio", event.target.value)}
                  className="mt-2 w-full resize-none border border-violet-300/15 bg-ink-900 p-3 text-sm font-normal leading-6 text-lilac-50 outline-none focus:border-violet-400/60"
                />
              </label>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="border border-violet-300/15 bg-violet-950/25 p-5">
              <div className="mb-5 flex items-center gap-3">
                <ShieldCheck size={19} className="text-emerald-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-lilac-600">
                    Security
                  </p>
                  <h2 className="mt-1 font-bold text-white">
                    Account protected
                  </h2>
                </div>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between text-lilac-300">
                  <span className="flex items-center gap-2">
                    <LockKeyhole size={14} /> Password
                  </span>
                  <span className="text-emerald-400">Strong</span>
                </div>
                <div className="flex items-center justify-between text-lilac-300">
                  <span className="flex items-center gap-2">
                    <Mail size={14} /> Email verified
                  </span>
                  <Check size={15} className="text-emerald-400" />
                </div>
              </div>
              <button
                type="button"
                className="mt-5 w-full border border-violet-300/15 px-3 py-2.5 text-xs font-bold text-lilac-300 transition hover:border-violet-300/40 hover:text-white"
              >
                Review security
              </button>
            </section>
            <section className="border border-violet-300/15 bg-violet-950/25 p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-lilac-600">
                Account activity
              </p>
              <div className="mt-5 space-y-4">
                <div className="flex gap-3">
                  <CalendarDays size={15} className="mt-0.5 text-violet-300" />
                  <div>
                    <p className="text-xs text-lilac-200">Member since</p>
                    <p className="mt-1 text-[11px] text-lilac-600">
                      September 2026
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sparkles size={15} className="mt-0.5 text-violet-300" />
                  <div>
                    <p className="text-xs text-lilac-200">Last active</p>
                    <p className="mt-1 text-[11px] text-lilac-600">
                      Today, 09:42 AM
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-2 border border-violet-400/50 bg-violet-400/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] text-violet-200 transition hover:bg-violet-400/20"
            >
              <Check size={15} /> Save appearance
            </button>
            <p className="text-center text-[10px] leading-5 text-lilac-600">
              Preview mode. Account details are displayed for your workspace.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Accounts;
