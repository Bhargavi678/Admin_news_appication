"use client";

import { useState } from "react";

import {
  getBookmarks,
  addBookmark,
  removeBookmark,
} from "@/services/bookmark_service";

export const useBookmarks =
  () => {
    const [
      loading,
      setLoading,
    ] = useState(false);

    const fetchBookmarks =
      async () => {
        setLoading(true);

        try {
          return await getBookmarks();
        } finally {
          setLoading(false);
        }
      };

    const saveBookmark =
      async (newsId) => {
        setLoading(true);

        try {
          return await addBookmark(
            newsId
          );
        } finally {
          setLoading(false);
        }
      };

    const deleteBookmark =
      async (newsId) => {
        setLoading(true);

        try {
          return await removeBookmark(
            newsId
          );
        } finally {
          setLoading(false);
        }
      };

    return {
      loading,
      fetchBookmarks,
      saveBookmark,
      deleteBookmark,
    };
  };