"use client";

import { useEffect, useState } from "react";

import {
  Search,
  Bell,
  MapPin,
} from "lucide-react";

import { useSettings } from "@/hooks/settings_use";
import { useNotifications } from "@/hooks/notification_use";

export default function Header() {
  const {
    handleSearchNews,
  } = useSettings();

  const {
    fetchNotifications,
  } = useNotifications();

  const [location, setLocation] =
    useState("Loading...");

  const [keyword, setKeyword] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [notifications,
    setNotifications] =
    useState([]);

  useEffect(() => {
    loadLocation();
    loadNotifications();
  }, []);

  // ==========================
  // LOCATION
  // ==========================

  const loadLocation = () => {
    const savedLocation =
      localStorage.getItem(
        "user_location"
      );

    if (savedLocation) {
      setLocation(
        savedLocation
      );

      return;
    }

    if (
      navigator.geolocation
    ) {
      navigator.geolocation.getCurrentPosition(
        async (
          position
        ) => {
          try {
            const {
              latitude,
              longitude,
            } =
              position.coords;

            const response =
              await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );

            const data =
              await response.json();

            const place =
              data.address
                ?.state ||
              data.address
                ?.city ||
              "Unknown";

            setLocation(
              place
            );

            localStorage.setItem(
              "user_location",
              place
            );
          } catch (error) {
            console.log(
              error
            );

            setLocation(
              "Unknown"
            );
          }
        }
      );
    }
  };

  // ==========================
  // NOTIFICATIONS
  // ==========================

  const loadNotifications =
    async () => {
      try {
        const response =
          await fetchNotifications();

        setNotifications(
          response.data || []
        );
      } catch (error) {
        console.log(
          error
        );
      }
    };

  // ==========================
  // SEARCH
  // ==========================

  const searchHandler =
    async (value) => {
      setKeyword(value);

      if (
        !value.trim()
      ) {
        setResults([]);
        return;
      }

      try {
        const response =
          await handleSearchNews(
            value
          );

        setResults(
          response.data || []
        );
      } catch (error) {
        console.log(
          error
        );

        setResults([]);
      }
    };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white max-w-md mx-auto shadow-sm">

      {/* BREAKING NEWS */}

      <div className="bg-red-500 text-white px-4 py-2 overflow-hidden">

        <div className="flex items-center gap-2 whitespace-nowrap">

          <span className="bg-red-400 px-3 py-1 rounded-full text-xs font-semibold">
            ⚡ BREAKING
          </span>

          <div className="text-xs">
            Parliament approves
            new education
            policy
          </div>

        </div>

      </div>

      {/* MAIN HEADER */}

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

              <MapPin
                size={10}
              />

              {location}

            </div>

          </div>

        </div>

        {/* SEARCH BOX */}

        <div className="relative flex-1 mx-3">

          <Search
            size={16}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={keyword}
            onChange={(e) =>
              searchHandler(
                e.target
                  .value
              )
            }
            className="w-full border rounded-full pl-9 pr-3 py-2 text-sm"
          />

          {/* SEARCH RESULTS */}

          {results.length >
            0 && (
            <div className="absolute top-12 left-0 right-0 bg-white border rounded-xl shadow-lg max-h-80 overflow-y-auto z-50">

              {results.map(
                (
                  item
                ) => (
                  <div
                    key={
                      item.news_id
                    }
                    className="p-3 border-b hover:bg-gray-50 cursor-pointer"
                  >

                    <h3 className="font-semibold text-sm">
                      {
                        item.title
                      }
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {
                        item.city
                      }
                      ,
                      {" "}
                      {
                        item.state
                      }
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>

        {/* NOTIFICATION */}

        <div className="relative">

          <Bell
            size={22}
          />

          {notifications.length >
            0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">

              {
                notifications.length
              }

            </span>
          )}

        </div>

      </div>

    </div>
  );
}