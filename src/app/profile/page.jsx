"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Globe,
  MapPin,
  Bell,
  Bookmark,
  FileText,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useProfile } from "@/hooks/profile_use";
import { useSettings } from "@/hooks/settings_use";
import { useNotifications } from "@/hooks/notification_use";
import { translations } from "@/constants/translations";

export default function ProfilePage() {
  const router = useRouter();

  const {
    fetchUserProfile,
    fetchAdminProfile,
  } = useProfile();

  const { changeLanguage } =
    useSettings();

  const { toggleNotifications } =
    useNotifications();

  const [profile, setProfile] =
    useState(null);

  const [role, setRole] =
    useState("");

  const [language, setLanguage] =
    useState("en");

  const [notifications, setNotifications] =
    useState(true);

  const t =
    translations?.[language] ||
    translations.en;

  useEffect(() => {
    loadProfile();
  }, []);

  const [message, setMessage] = useState("");
const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const userRole =
        localStorage.getItem("role");

      setRole(userRole);

      let response;

      if (userRole === "admin") {
        response =
          await fetchAdminProfile();
      } else {
        response =
          await fetchUserProfile();
      }

      const data =
        response.data;

      setProfile(data);

      const userLanguage =
        data.language || "en";

      setLanguage(userLanguage);

      localStorage.setItem(
        "language",
        userLanguage
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguageChange = async () => {
  try {
    const newLanguage = language === "en" ? "te" : "en";

    await changeLanguage(newLanguage);

    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);

    setMessage("Language updated successfully");
    setError("");

    setTimeout(() => {
      setMessage("");
      window.location.reload();
    }, 1500);
  } catch (err) {
    setError("Failed to update language");
    setMessage("");
  }
};

  const handleNotificationToggle = async () => {
  try {
    await toggleNotifications(!notifications);

    setNotifications(!notifications);

    setMessage(
      !notifications
        ? "Notifications Enabled"
        : "Notifications Disabled"
    );

    setError("");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  } catch (err) {
    setError("Failed to update notification settings");
    setMessage("");
  }
};

  const logout = () => {
    localStorage.clear();

    router.push("/login");
  };

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-28">

      {/* HEADER */}

      <div className="bg-orange-500 rounded-3xl p-6 text-white">

        <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold">
          {profile.name?.charAt(0)}
        </div>

        <h1 className="text-3xl font-bold mt-4">
          {profile.name}
        </h1>

        <p className="mt-1">
          {profile.email}
        </p>

        <div className="flex items-center gap-2 mt-3">
          <MapPin size={18} />

          <span>
            {typeof profile.location ===
            "object"
              ? profile.location
                  ?.city ||
                profile.location
                  ?.district ||
                profile.location
                  ?.state
              : profile.location ||
                "Location not set"}
          </span>
        </div>

      </div>
      {message && (
  <div className="mt-4 rounded-lg bg-green-100 border border-green-400 text-green-700 px-4 py-3">
    {message}
  </div>
)}

{error && (
  <div className="mt-4 rounded-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3">
    {error}
  </div>
)}

      {/* SETTINGS */}

      <div className="bg-white rounded-3xl mt-5 overflow-hidden shadow">

        {/* LANGUAGE */}

        <button
          onClick={
            handleLanguageChange
          }
          className="w-full flex items-center justify-between p-5 border-b"
        >
          <div className="flex items-center gap-4">
            <Globe />

            <span>
              {t.language ||
                "Language"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span>
              {language === "en"
                ? "English"
                : "తెలుగు"}
            </span>

            <ChevronRight />
          </div>
        </button>

        {/* LOCATION */}

        <button
          onClick={() =>
            router.push(
              "/location"
            )
          }
          className="w-full flex items-center justify-between p-5 border-b"
        >
          <div className="flex items-center gap-4">
            <MapPin />

            <span>
              {t.location ||
                "Location"}
            </span>
          </div>

          <ChevronRight />
        </button>

        {/* NOTIFICATIONS */}

        <button
          onClick={
            handleNotificationToggle
          }
          className="w-full flex items-center justify-between p-5 border-b"
        >
          <div className="flex items-center gap-4">
            <Bell />

            <span>
              {t.notifications ||
                "Notifications"}
            </span>
          </div>

          <span>
            {notifications
              ? "ON"
              : "OFF"}
          </span>
        </button>

        {/* SAVED POSTS */}

        <button
          onClick={() =>
            router.push(
              "/bookmarks"
            )
          }
          className="w-full flex items-center justify-between p-5 border-b"
        >
          <div className="flex items-center gap-4">
            <Bookmark />

            <span>
              {t.saved ||
                "Saved"}
            </span>
          </div>

          <span>
            {profile.bookmarks_count ||
              0}{" "}
            Stories
          </span>
        </button>

        {/* ADMIN POSTS */}

        {role === "admin" && (
          <button
            onClick={() =>
              router.push(
                "/admin/posts"
              )
            }
            className="w-full flex items-center justify-between p-5 border-b"
          >
            <div className="flex items-center gap-4">
              <FileText />

              <span>
                Posted News
              </span>
            </div>

            <ChevronRight />
          </button>
        )}

        {/* LOGOUT */}

        <button
          onClick={logout}
          className="w-full flex items-center justify-between p-5 text-red-500"
        >
          <div className="flex items-center gap-4">
            <LogOut />

            <span>
              {t.logout ||
                "Logout"}
            </span>
          </div>

          <ChevronRight />
        </button>

      </div>

    </div>
  );
}