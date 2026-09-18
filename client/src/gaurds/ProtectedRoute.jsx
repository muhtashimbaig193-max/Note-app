import React from "react";
import { useAuthStore } from "../store/auth.store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { me } from "../api/auth.api";
import { useState } from "react";

const ProtectedRoute = ({ children }) => {
  const setUser = useAuthStore((state) => state?.setUser);
  const [loadingUser, setLoadingUser] = useState(false);
  const isAuthenticated = useAuthStore((state) => state?.isAuthenticated);
  const token = useAuthStore((state) => state?.token);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }

    async function fetchUser() {
      setLoadingUser(true);
      const user = await me();

      setUser(user);

      setLoadingUser(false);
    }

    fetchUser();

    // fetch me
  }, [isAuthenticated, token]);

  if (loadingUser) {
    // return a loader
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center">
          {/* Spinner */}
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-4 border-slate-800" />

            <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-indigo-500" />
          </div>

          {/* Text */}
          <p className="mt-5 text-sm text-slate-400">Loading your account...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
