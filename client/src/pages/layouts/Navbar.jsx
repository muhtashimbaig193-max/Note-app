import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Menu,
  Search,
  Settings,
  Sparkles,
  StickyNotes,
  UserRound,
} from "lucide-react";
import { useAuthStore } from "../../store/auth.store";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = useAuthStore((state) => state?.user);

  const logout = useAuthStore((state) => state?.logout);
  const initials = user?.fullname
    ?.split(" ")
    .map((item) => item[0])
    .join("")
    .toUpperCase();

  // TOGGLE FUNCTIONALITY
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-20 flex min-h-18 items-center gap-4 border-b border-violet-300/10 bg-ink/90 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
      <a
        className="flex shrink-0 items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-lilac-200"
        href="/"
      >
        <Sparkles
          size={16}
          className="text-neon shadow-neon"
          aria-hidden="true"
        />
        <span className="hidden sm:inline">NEXUS NOTES</span>
      </a>
      <button
        className="text-lilac-500 transition hover:text-white lg:hidden"
        aria-label="Open navigation"
        type="button"
      >
        <Menu size={18} />
      </button>

      <label className="relative hidden w-full max-w-md md:block">
        <Search
          size={16}
          className="absolute left-3 top-2.5 text-lilac-600"
          aria-hidden="true"
        />
        <input
          className="h-9 w-full border border-violet-300/10 bg-violet-950/20 pl-9 pr-14 text-xs text-lilac-200 outline-none placeholder:text-lilac-600 transition focus:border-violet-400/50 focus:bg-violet-950/40"
          placeholder="Search your notes"
          aria-label="Search your notes"
        />
        <span className="pointer-events-none absolute right-3 top-2 rounded border border-violet-300/10 px-1.5 py-0.5 text-[10px] text-lilac-600">
          ⌘ K
        </span>
      </label>

      <div className="ml-auto flex items-center gap-3 sm:gap-5">
        <button
          className="relative text-lilac-500 transition hover:text-white"
          aria-label="Notifications"
          type="button"
        >
          <Bell size={18} />
          <span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_#c774ff]" />
        </button>
        <span className="hidden h-5 w-px bg-violet-300/15 sm:block" />
        <div className="relative" ref={accountMenuRef}>
          <button
            className="flex items-center gap-2 text-xs text-lilac-300 transition hover:text-white"
            type="button"
            aria-haspopup="menu"
            aria-expanded={isAccountMenuOpen}
            onClick={() => setIsAccountMenuOpen((isOpen) => !isOpen)}
          >
            <span className="grid size-8 place-items-center rounded-full bg-violet-400 font-bold text-violet-950">
              {initials}
            </span>
            <span className="hidden sm:block">{user?.fullname}</span>
            <ChevronDown
              className={`transition-transform ${isAccountMenuOpen ? "rotate-180" : ""}`}
              size={14}
            />
          </button>

          {isAccountMenuOpen && (
            <div
              className="absolute right-0 top-12 z-30 w-56 border border-violet-300/15 bg-ink-900 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.45),0_0_28px_rgba(127,48,183,0.16)]"
              role="menu"
            >
              <div className="border-b border-violet-300/10 px-3 pb-3 pt-2">
                <p className="text-xs font-bold text-lilac-200">{user?.fullname}</p>
                <p className="mt-1 truncate text-[11px] text-lilac-600">
                  {user?.email}
                </p>
              </div>
              <Link
                className="mt-2 flex items-center gap-3 px-3 py-2.5 text-xs text-lilac-300 transition hover:bg-violet-400/10 hover:text-white"
                to="/settings/account"
                role="menuitem"
                onClick={() => setIsAccountMenuOpen(false)}
              >
                <UserRound size={15} /> Account settings
              </Link>
              <Link
                className="mt-2 flex items-center gap-3 px-3 py-2.5 text-xs text-lilac-300 transition hover:bg-violet-400/10 hover:text-white"
                to={'/notes/view-notes'}
                role="menuitem"
                onClick={() => setIsAccountMenuOpen(false)}
              >
                <StickyNotes size={15} /> View Your Notes
              </Link>
              <a
                className="flex items-center gap-3 px-3 py-2.5 text-xs text-lilac-300 transition hover:bg-violet-400/10 hover:text-white"
                href="#preferences"
                role="menuitem"
                onClick={() => setIsAccountMenuOpen(false)}
              >
                <Settings size={15} /> Preferences
              </a>
              <a
                className="flex items-center gap-3 px-3 py-2.5 text-xs text-lilac-300 transition hover:bg-violet-400/10 hover:text-white"
                href="#help"
                role="menuitem"
                onClick={() => setIsAccountMenuOpen(false)}
              >
                <CircleHelp size={15} /> Help center
              </a>
              <div className="my-2 border-t border-violet-300/10" />
              <button
                className="flex items-center gap-3 px-3 py-2.5 text-xs text-rose-300 transition hover:bg-rose-400/10"
                role="menuitem"
                onClick={logout}
              >
                <LogOut size={15} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
