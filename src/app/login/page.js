"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/hooks/auth_use";
import { updateLocation } from "@/services/settings_service";

export default function LoginPage() {
  const router = useRouter();

  const {
    login,
    adminLogin,
    loading,
  } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // GET LOCATION & UPDATE API
  // ==========================
  const updateUserLocation = async () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.log(
          "Geolocation not supported"
        );
        resolve();
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const payload = {
              latitude:
                position.coords.latitude,
              longitude:
                position.coords.longitude,
            };

            console.log(
              "LOCATION PAYLOAD:",
              payload
            );

            const response =
              await updateLocation(
                payload
              );

            console.log(
              "LOCATION RESPONSE:",
              response
            );
          } catch (error) {
            console.log(
              "LOCATION UPDATE ERROR:",
              error
            );
          }

          resolve();
        },

        (error) => {
          console.log(
            "LOCATION PERMISSION DENIED:",
            error
          );

          resolve();
        },

        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  };

  // ==========================
  // LOGIN
  // ==========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // USER LOGIN
      await login(formData);

      // UPDATE LOCATION
      await updateUserLocation();

      router.push("/home");
    } catch (userError) {
      try {
        // ADMIN LOGIN
        await adminLogin(formData);

        // UPDATE LOCATION
        await updateUserLocation();

        router.push("/home");
      } catch (adminError) {
        console.log(adminError);

        alert(
          "Invalid Email or Password"
        );
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-5">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-orange-100">

        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto rounded-full bg-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl font-bold">
              N
            </span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-5">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Sign in to continue reading news
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
          >
            {loading
              ? "Signing In..."
              : "Login"}
          </button>

        </form>

        <div className="text-center mt-8">

          <p className="text-gray-500">
            Don't have an account?
          </p>

          <button
            onClick={() =>
              router.push("/register")
            }
            className="text-orange-500 font-semibold mt-2 hover:text-orange-600"
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
}