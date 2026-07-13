"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSettings } from "@/hooks/settings_use";

export default function LocationPage() {
  const router = useRouter();

  const { changeLocation, loading } =
    useSettings();

  const [stateName, setStateName] =
    useState("");

  const [district, setDistrict] =
    useState("");

  const [mandal, setMandal] =
    useState("");

    const [message, setMessage] = useState("");
const [error, setError] = useState("");


  const handleSave = async () => {
  if (
    !stateName.trim() ||
    !district.trim() ||
    !mandal.trim()
  ) {
    setError("Please enter State, District and Mandal");
    setMessage("");
    return;
  }

  try {
    await changeLocation({
      state: stateName,
      district,
      mandal,
    });

    const location = `${mandal}, ${district}, ${stateName}`;

    localStorage.setItem("user_location", location);
    localStorage.setItem("updated_location", location);

    setMessage("Location updated successfully");
    setError("");

    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  } catch (err) {
    console.log(err);

    setError(
      err?.message || "Location update failed"
    );
    setMessage("");
  }
};

  return (
    <div className="px-4 py-4 pb-24">
      <h1 className="text-3xl font-bold mb-6">
        Update Location
      </h1>
{message && (
  <div className="mb-4 rounded-xl border border-green-300 bg-green-100 px-4 py-3 text-green-700">
    {message}
  </div>
)}

{error && (
  <div className="mb-4 rounded-xl border border-red-300 bg-red-100 px-4 py-3 text-red-700">
    {error}
  </div>
)}
      <div className="bg-white rounded-3xl shadow p-5">

        {/* STATE */}

        <label className="font-semibold block mb-2">
          State
        </label>

        <input
          type="text"
          placeholder="Enter State"
          value={stateName}
          onChange={(e) =>
            setStateName(
              e.target.value
            )
          }
          className="w-full border rounded-2xl p-4 mb-5"
        />

        {/* DISTRICT */}

        <label className="font-semibold block mb-2">
          District
        </label>

        <input
          type="text"
          placeholder="Enter District"
          value={district}
          onChange={(e) =>
            setDistrict(
              e.target.value
            )
          }
          className="w-full border rounded-2xl p-4 mb-5"
        />

        {/* MANDAL */}

        <label className="font-semibold block mb-2">
          Mandal
        </label>

        <input
          type="text"
          placeholder="Enter Mandal"
          value={mandal}
          onChange={(e) =>
            setMandal(
              e.target.value
            )
          }
          className="w-full border rounded-2xl p-4"
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full mt-6 bg-orange-500 text-white py-4 rounded-2xl font-semibold"
        >
          {loading
            ? "Saving..."
            : "Save Location"}
        </button>
      </div>
    </div>
  );
}