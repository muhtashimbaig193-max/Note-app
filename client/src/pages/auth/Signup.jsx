import { useState } from "react";
import {
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import Button from "../../components/ui/Button.jsx";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom"

import { register } from "../../api/auth.api.js";

const Signup = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register(formData);
      setFormData({
        fullname: "",
        email: "",
        password: "",
      });
      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: response.message,
        confirmButtonText: "Continue",
      });

      navigate('/login')

    } catch (error) {
      console.error("ERROR:", error);
      if (error.response?.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Email Already Exists",
          text:
            error.response.data?.message || "This email is already registered.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text:
            error.response?.data?.message ||
            "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <main className="relative isolate grid min-h-screen overflow-hidden bg-ink text-lilac-50 font-sans before:absolute before:inset-0 before:-z-10 before:bg-[linear-gradient(rgba(173,96,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(173,96,255,0.045)_1px,transparent_1px)] before:bg-size-[56px_56px] before:mask-[linear-gradient(to_bottom,black,transparent_82%)]">
      <div className="pointer-events-none absolute -right-12 -top-44 -z-10 size-107.5 rounded-full bg-violet-600/20 shadow-[0_0_140px_70px_rgba(122,38,255,0.12)]" />
      <div className="pointer-events-none absolute -bottom-60 -left-32 -z-10 size-97.5unded-full bg-violet-950/30 shadow-[0_0_120px_55px_rgba(83,32,170,0.16)]" />
      <section
        className="mx-auto grid w-[calc(100%-3rem)] max-w-270 grid-cols-1 items-center gap-10 py-9 sm:gap-14 sm:py-14 md:grid-cols-[minmax(280px,0.82fr)_minmax(360px,440px)] md:gap-[9vw]"
        aria-label="Create your account"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.2em] text-lilac-200">
            <Sparkles
              size={16}
              className="text-neon shadow-neon"
              aria-hidden="true"
            />{" "}
            NEXUS
          </div>
          <p className="mt-16 mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300 md:mt-24">
            Your next chapter starts here
          </p>
          <h1 className="m-0 max-w-125 text-[clamp(3rem,7vw,5.5rem)] font-extrabold leading-[0.92] tracking-[-0.06em] text-white">
            Build your
            <br />
            <span className="text-neon [text-shadow:0_0_28px_rgba(180,74,255,0.55)]">
              boldest
            </span>{" "}
            self.
          </h1>
          <p className="mt-5 max-w-86.25 text-base leading-[1.65] text-lilac-400 md:mt-7">
            A focused space for people turning good ideas into something real.
          </p>
          <div className="mt-6 flex items-center gap-2.5 text-xs text-lilac-500 md:mt-11">
            <span className="size-1.5 rounded-full bg-violet-400 shadow-[0_0_12px_#c774ff]" />{" "}
            Private by design. Ready when you are.
          </div>
        </div>

        <div className="rounded border border-violet-400/20 bg-violet-950/30 p-7 shadow-[0_24px_90px_rgba(0,0,0,0.4),0_0_42px_rgba(127,48,183,0.12)] backdrop-blur-lg sm:p-10">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-violet-300">
                New account
              </p>
              <h2 className="m-0 text-3xl font-bold tracking-[-0.03em] text-white">
                Join the signal.
              </h2>
            </div>
            <ShieldCheck
              className="text-violet-400 drop-shadow-[0_0_10px_rgba(199,116,255,0.55)]"
              size={26}
              aria-hidden="true"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <label
              className="mb-2 mt-5 block text-xs font-bold text-lilac-200 first:mt-0"
              htmlFor="fullname"
            >
              Full name
            </label>
            <div className="flex items-center gap-3 border border-violet-950 bg-ink-900 px-3.5 transition focus-within:border-violet-400 focus-within:shadow-[0_0_0_3px_rgba(173,89,238,0.12),0_0_18px_rgba(173,89,238,0.13)]">
              <UserRound
                className="shrink-0 text-violet-300/60"
                size={18}
                aria-hidden="true"
              />
              <input
                className="h-12 w-full min-w-0 border-0 bg-transparent text-sm text-lilac-50 outline-none placeholder:text-lilac-600"
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="name"
                placeholder="Alex Morgan"
                value={formData?.fullname}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullname: e.target.value,
                  })
                }
                required
              />
            </div>
            <label
              className="mb-2 mt-5 block text-xs font-bold text-lilac-200"
              htmlFor="email"
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
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={formData?.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <label
              className="mb-2 mt-5 block text-xs font-bold text-lilac-200"
              htmlFor="password"
            >
              Create password
            </label>
            <div className="flex items-center gap-3 border border-violet-950 bg-ink-900 px-3.5 transition focus-within:border-violet-400 focus-within:shadow-[0_0_0_3px_rgba(173,89,238,0.12),0_0_18px_rgba(173,89,238,0.13)]">
              <LockKeyhole
                className="shrink-0 text-violet-300/60"
                size={18}
                aria-hidden="true"
              />
              <input
                className="h-12 w-full min-w-0 border-0 bg-transparent text-sm text-lilac-50 outline-none placeholder:text-lilac-600"
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                minLength="8"
                value={formData?.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <p className="my-5 text-[11px] leading-relaxed text-lilac-500">
              By continuing, you agree to our{" "}
              <a
                className="text-violet-300 hover:text-violet-100"
                href="#terms"
              >
                Terms
              </a>{" "}
              and{" "}
              <a
                className="text-violet-300 hover:text-violet-100"
                href="#privacy"
              >
                Privacy Policy
              </a>
              .
            </p>

            <Button className="w-full" variant="primary" type="submit">
              SUBMIT
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-lilac-500">
            Already have an account?{" "}
            <Link to={'/login'} >Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
