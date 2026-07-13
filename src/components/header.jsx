"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

import {
  Search,
  Bell,
  MapPin,
  X,
  Moon,
  Sun,
} from "lucide-react";

import { useSettings } from "@/hooks/settings_use";
import { useNotifications } from "@/hooks/notification_use";
import axiosInstance from "@/lib/axios";

export default function Header() {
  const router = useRouter();

  const { handleSearchNews } = useSettings();
  const { fetchNotifications } = useNotifications();

  const [location, setLocation] = useState("Loading...");
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] =
    useState(false);
  

  const searchRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    loadLocation();
    loadNotifications();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setResults([]);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  // ==========================
  // LOAD LOCATION FROM API
  // ==========================

  const loadLocation = async () => {
  try {
    // 1. Check if user has manually updated location
    const updatedLocation = localStorage.getItem("updated_location");

    if (updatedLocation) {
      setLocation(updatedLocation);
      return;
    }

    // 2. Otherwise get current GPS location
    if (!navigator.geolocation) {
      setLocation("Unknown");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          const data = await response.json();

          const address = data.address;

const villageOrArea =
  address.village ||
  address.hamlet ||
  address.suburb ||
  address.neighbourhood ||
  address.quarter ||
  address.city_district ||
  "";

const city =
  address.city ||
  address.town ||
  address.municipality ||
  "";

const state =
  address.state || "";

const currentLocation = [
  villageOrArea,
  city,
  state,
]
  .filter(Boolean)
  .join(", ");

          setLocation(currentLocation || "Unknown");

          localStorage.setItem(
            "current_location",
            currentLocation
          );
        } catch (error) {
          console.log(error);
          setLocation("Unknown");
        }
      },
      (error) => {
        console.log(error);
        setLocation("Unknown");
      }
    );
  } catch (error) {
    console.log(error);
    setLocation("Unknown");
  }
};
  // ==========================
  // LOAD NOTIFICATIONS
  // ==========================

  const loadNotifications = async () => {
    try {
      const response =
        await fetchNotifications();

      console.log(
        "Notifications:",
        response
      );

      setNotifications(
        response.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };
    // ==========================
  // SEARCH
  // ==========================

  const searchHandler = async (value) => {
    setKeyword(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      const response = await handleSearchNews(value);

      console.log("Search Response:", response);

      setResults(response.data || []);
    } catch (error) {
      console.log(error);
      setResults([]);
    }
  };

  // ==========================
  // CLICK SEARCH RESULT
  // ==========================

  const handleNewsClick = (newsId) => {
    setKeyword("");
    setResults([]);

    router.push(`/news/${newsId}`);
  };

  // ==========================
  // NOTIFICATION POPUP
  // ==========================

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const handleNotificationClick = (notification) => {
    setShowNotifications(false);

    if (notification.news_id) {
      router.push(`/news/${notification.news_id}`);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 max-w-md mx-auto bg-white shadow-sm">

      {/* BREAKING NEWS */}

      <div className="bg-red-500 text-white px-4 py-2 overflow-hidden">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="bg-red-400 px-3 py-1 rounded-full text-xs font-semibold">
            ⚡ BREAKING
          </span>

          <div className="text-xs">
            Parliament approves new education policy
          </div>
        </div>
      </div>

      {/* HEADER */}

      <div className="flex items-center justify-between px-3 py-3 border-b">

        {/* LOGO */}

        <div className="flex items-center gap-2">

          <div className="w-11 h-11 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
            N
          </div>

          <div>
            <h1 className="text-2xl font-bold font-serif">
              Newsly
            </h1>

            <div className="flex items-center gap-1 text-gray-500 text-[11px]">

              <MapPin size={10} />

              {location}

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <div
          ref={searchRef}
          className="relative flex-1 mx-3"
        >

          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search News..."
            value={keyword}
            onChange={(e) =>
              searchHandler(e.target.value)
            }
            className="w-full border rounded-full pl-9 pr-3 py-2 text-sm"
          />

          {results.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-white border rounded-xl shadow-xl max-h-80 overflow-y-auto z-50">

              {results.map((item) => (
                <div
                  key={item.news_id}
                  onClick={() =>
                    handleNewsClick(item.news_id)
                  }
                  className="cursor-pointer p-3 border-b hover:bg-orange-50 transition"
                >
                  <h3 className="font-semibold text-sm">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.city}, {item.state}
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>
                {/* NOTIFICATION */}

        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            onClick={toggleNotifications}
            className="relative"
          >
            <Bell size={22} />

            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">
                {notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border z-50">

              <div className="flex items-center justify-between p-4 border-b">

                <h2 className="font-bold">
                  Notifications
                </h2>

                <button
                  onClick={() =>
                    setShowNotifications(false)
                  }
                >
                  <X size={18} />
                </button>

              </div>

              <div className="max-h-80 overflow-y-auto">

                {notifications.length === 0 ? (

                  <div className="p-6 text-center text-gray-500">
                    No Notifications
                  </div>

                ) : (

                  notifications.map((item, index) => (

                    <div
                      key={index}
                      onClick={() =>
                        handleNotificationClick(item)
                      }
                      className="cursor-pointer p-4 border-b hover:bg-orange-50 transition"
                    >
                      <h3 className="font-semibold text-sm">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.message}
                      </p>

                      {item.created_at && (
                        <p className="text-[10px] text-gray-400 mt-2">
                          {new Date(
                            item.created_at
                          ).toLocaleString()}
                        </p>
                      )}

                    </div>

                  ))

                )}

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}