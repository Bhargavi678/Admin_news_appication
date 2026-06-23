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

  const handleSave = async () => {
    try {
      if (
        !stateName.trim() ||
        !district.trim() ||
        !mandal.trim()
      ) {
        alert(
          "Please enter State, District and Mandal"
        );
        return;
      }

      await changeLocation({
        state: stateName,
        district,
        mandal,
      });

      alert(
        "Location updated successfully"
      );

      router.push("/profile");
    } catch (error) {
      console.log(error);

      alert(
        error?.message ||
          "Location update failed"
      );
    }
  };

  return (
    <div className="px-4 py-4 pb-24">
      <h1 className="text-3xl font-bold mb-6">
        Update Location
      </h1>

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