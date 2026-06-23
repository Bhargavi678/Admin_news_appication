"use client";

import { useState } from "react";

import {
  addComment,
  getComments,
} from "@/services/comment_service";

export const useComments =
  () => {
    const [
      loading,
      setLoading,
    ] = useState(false);

    const createComment =
      async (
        newsId,
        content
      ) => {
        setLoading(true);

        try {
          return await addComment(
            newsId,
            content
          );
        } finally {
          setLoading(false);
        }
      };

    const fetchComments =
      async (newsId) => {
        setLoading(true);

        try {
          return await getComments(
            newsId
          );
        } finally {
          setLoading(false);
        }
      };

    return {
      loading,
      createComment,
      fetchComments,
    };
  };