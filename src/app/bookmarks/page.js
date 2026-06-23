"use client";

import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";

import { useBookmarks } from "@/hooks/bookmark_use";
import NewsCard from "@/components/NewsCard";

export default function BookmarksPage() {
  const { fetchBookmarks } =
    useBookmarks();

  const [loading, setLoading] =
    useState(true);

  const [bookmarks, setBookmarks] =
    useState([]);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks =
    async () => {
      try {
        const response =
          await fetchBookmarks();

        console.log(
          "BOOKMARK RESPONSE",
          response
        );

        const bookmarkData =
          response?.data || [];

        setBookmarks(
          Array.isArray(
            bookmarkData
          )
            ? bookmarkData
            : []
        );
      } catch (error) {
        console.log(error);
        setBookmarks([]);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="px-4 py-4 pb-28">

      <div className="flex items-center gap-3 mb-6">
        <Bookmark
          size={28}
          className="text-orange-500"
        />

        <h1 className="text-3xl font-bold">
          Saved Posts
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-10">
          Loading...
        </div>
      ) : bookmarks.length ===
        0 ? (
        <div className="bg-white rounded-3xl p-10 text-center shadow">

          <Bookmark
            size={50}
            className="mx-auto text-gray-300"
          />

          <h2 className="text-xl font-semibold mt-4">
            No Saved Posts
          </h2>

          <p className="text-gray-500 mt-2">
            Bookmark posts to see
            them here.
          </p>

        </div>
      ) : (
        <div className="space-y-5">

          {bookmarks.map((item, index) => (
  <NewsCard
    key={`${item.news_id}-${index}`}
    news={item.news || item}
  />
))}
        </div>
      )}

    </div>
  );
}