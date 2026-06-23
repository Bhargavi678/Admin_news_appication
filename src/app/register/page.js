"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth_use";

export default function RegisterPage() {
  const router = useRouter();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await register(formData);

    alert("Registration Successful");

    router.push("/login");
  } catch (error) {
    console.log("Register Error:", error);
    console.log("Response:", error.response?.data);

    alert(
      error.response?.data?.detail ||
      error.response?.data?.message ||
      JSON.stringify(error.response?.data) ||
      error.message
    );
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center p-5">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            N
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Create Account
          </h1>

          <p className="text-gray-500 mt-2">
            Join Newsly today
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-4 border rounded-2xl"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-4 border rounded-2xl"
            required
          />

          <input
            type="text"
            name="mobile_number"
            placeholder="Mobile Number"
            value={formData.mobile_number}
            onChange={handleChange}
            className="w-full p-4 border rounded-2xl"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-4 border rounded-2xl"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-4 rounded-2xl font-semibold"
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">
            Already have an account?
          </p>

          <button
            onClick={() => router.push("/login")}
            className="text-orange-500 font-semibold mt-2"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}