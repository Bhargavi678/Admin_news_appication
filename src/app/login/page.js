"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth_use";

export default function LoginPage() {
  const router = useRouter();

  const { login, loading } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData);

      console.log("Login Response:", response);

      if (response.role === "admin") {
        router.push("/home");
      } else if (response.role === "user") {
        router.push("/home");
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      alert(error.message || "Invalid Email or Password");
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
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-semibold transition-all duration-300"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="text-center mt-8">
          <p className="text-gray-500">
            Don't have an account?
          </p>

          <button
            onClick={() => router.push("/register")}
            className="text-orange-500 font-semibold mt-2 hover:text-orange-600"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}