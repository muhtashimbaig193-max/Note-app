import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  LoaderCircle,
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import { useState } from "react";
import Swal from "sweetalert2";
import { login } from "../../api/auth.api.js";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store.js";

const Login = () => {

  const setAuth = useAuthStore((state) => state.setAuth);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate requests
    if (loading) return;

    setLoading(true);

    try {
      const response = await login(formData);

      console.log("LOGIN RESPONSE:", response);

      setAuth(response?.accessToken)

      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back!",
        confirmButtonText: "Continue",
      });

      navigate("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      const status = error.response?.status;

      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      if (status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "Invalid Request",
          text: message,
        });
      } else if (status === 404) {
        await Swal.fire({
          icon: "error",
          title: "User Not Found",
          text: message,
        });
      } else if (status === 401) {
        await Swal.fire({
          icon: "error",
          title: "Invalid Credentials",
          text: message,
        });
      } else {
        await Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative isolate grid min-h-screen overflow-hidden bg-ink font-sans text-lilac-50 before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(rgba(173,96,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(173,96,255,0.045)_1px,transparent_1px)] before:bg-size-[56px_56px] before:mask-[linear-gradient(to_bottom,black,transparent_82%)]">
      <div className="pointer-events-none absolute -right-12 -top-44 -z-10 size-107.5 rounded-full bg-violet-600/20 shadow-[0_0_140px_70px_rgba(122,38,255,0.12)]" />

      <div className="pointer-events-none absolute -bottom-60 -left-32 -z-10 size-97.5 rounded-full bg-violet-950/30 shadow-[0_0_120px_55px_rgba(83,32,170,0.16)]" />

      <section
        className="mx-auto grid w-[calc(100%-3rem)] max-w-270 grid-cols-1 items-center gap-10 py-9 sm:gap-14 sm:py-14 md:grid-cols-[minmax(280px,0.82fr)_minmax(360px,440px)] md:gap-[9vw]"
        aria-label="Log in to your account"
      >
        {/* LEFT SIDE */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-lilac-200">
            <Sparkles
              size={16}
              className="text-neon shadow-neon"
              aria-hidden="true"
            />
            NEXUS
          </div>

          <p className="mt-16 mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300 md:mt-24">
            Good to see you again
          </p>

          <h1 className="m-0 max-w-125 text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.06em] text-white">
            Pick up
            <br />
            <span className="text-neon [text-shadow:0_0_28px_rgba(180,74,255,0.55)]">
              where
            </span>{" "}
            you left off.
          </h1>

          <p className="mt-5 max-w-86.25 text-base leading-[1.65] text-lilac-400 md:mt-7">
            Your ideas are waiting. Sign in and keep the momentum moving.
          </p>
        </div>

        {/* LOGIN CARD */}
        <div className="rounded border border-violet-400/20 bg-violet-950/30 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.4),0_0_42px_rgba(127,48,183,0.12)] backdrop-blur-lg sm:p-10">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300">
                Returning member
              </p>

              <h2 className="m-0 text-3xl font-bold tracking-[-0.03em] text-white">
                Welcome back.
              </h2>
            </div>

            <ShieldCheck
              className="text-violet-400 drop-shadow-[0_0_10px_rgba(199,116,255,0.55)]"
              size={26}
              aria-hidden="true"
            />
          </div>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <label
              className="mb-2 block text-xs font-bold text-lilac-200"
              htmlFor="login-email"
            >
              Email address
            </label>

            <div className="flex items-center gap-3 border border-violet-950 bg-ink-900 px-3.5 transition focus-within:border-violet-400 focus-within:shadow-[0_0_0_3px_rgba(173,89,238,0.12),0_0_18px_rgba(173,89,238,0.13)]">
              <Mail
                className="shrink-0 text-violet-300/60"
                size={18}
                aria-hidden="true"
              />

              <input
                className="h-12 w-full min-w-0 border-0 bg-transparent text-sm text-lilac-50 outline-none placeholder:text-lilac-600"
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                required
                disabled={loading}
              />
            </div>

            {/* PASSWORD LABEL */}
            <div className="mb-2 mt-5 flex items-center justify-between">
              <label
                className="text-xs font-bold text-lilac-200"
                htmlFor="login-password"
              >
                Password
              </label>

              <a
                className="text-[11px] text-violet-300 hover:text-violet-100"
                href="#forgot-password"
              >
                Forgot password?
              </a>
            </div>

            {/* PASSWORD */}
            <div className="flex items-center gap-3 border border-violet-950 bg-ink-900 px-3.5 transition focus-within:border-violet-400 focus-within:shadow-[0_0_0_3px_rgba(173,89,238,0.12),0_0_18px_rgba(173,89,238,0.13)]">
              <LockKeyhole
                className="shrink-0 text-violet-300/60"
                size={18}
                aria-hidden="true"
              />

              <input
                className="h-12 w-full min-w-0 border-0 bg-transparent text-sm text-lilac-50 outline-none placeholder:text-lilac-600"
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                required
                disabled={loading}
              />
            </div>

            {/* SUBMIT BUTTON */}
            <Button
              className="mt-6 w-full"
              type="submit"
              variant="primary"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoaderCircle
                    size={18}
                    className="animate-spin"
                  />
                  Signing In...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight size={18} />
                </span>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-lilac-500">
            New to Nexus?{" "}
            <a
              className="text-violet-300 hover:text-violet-100"
              href="#signup"
            >
              Create an account
            </a>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;