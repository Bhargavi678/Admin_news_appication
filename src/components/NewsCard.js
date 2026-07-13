"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Send,
} from "lucide-react";

import { useLikes } from "@/hooks/like_use";
import { useBookmarks } from "@/hooks/bookmark_use";
import { useComments } from "@/hooks/comment_use";
import { useNews } from "@/hooks/news_use";

export default function NewsCard({ news }) {
  if (!news) return null;

  // ==========================
  // HOOKS
  // ==========================

  const { addLike, removeLike } = useLikes();

  const {
    saveBookmark,
    deleteBookmark,
  } = useBookmarks();

  const {
    createComment,
    fetchComments,
  } = useComments();

  const { sharePost } = useNews();

  // ==========================
  // STATES
  // ==========================

  const [likes, setLikes] = useState(
    news.like_count || 0
  );

  const [shares, setShares] = useState(
    news.share_count || 0
  );

  const [liked, setLiked] = useState(
    news.is_liked || false
  );

  const [bookmarked, setBookmarked] =
    useState(
      news.is_bookmarked || false
    );

  const [showComments, setShowComments] =
    useState(false);

  const [comments, setComments] =
    useState([]);

  const [commentText, setCommentText] =
    useState("");

  const [expanded, setExpanded] =
    useState(false);

  // ==========================
  // EFFECT
  // ==========================

  useEffect(() => {
    if (!news) return;

    setLikes(news.like_count || 0);
    setShares(news.share_count || 0);

    const likedPosts = JSON.parse(
      localStorage.getItem("likedPosts") ||
        "[]"
    );

    const bookmarkedPosts = JSON.parse(
      localStorage.getItem(
        "bookmarkedPosts"
      ) || "[]"
    );

    setLiked(
      likedPosts.includes(news.news_id) ||
        news.is_liked
    );

    setBookmarked(
      bookmarkedPosts.includes(
        news.news_id
      ) || news.is_bookmarked
    );
  }, [news]);

  // ==========================
  // LIKE
  // ==========================

  const handleLike = async () => {
    try {
      let likedPosts = JSON.parse(
        localStorage.getItem(
          "likedPosts"
        ) || "[]"
      );

      if (liked) {
        await removeLike(news.news_id);

        likedPosts = likedPosts.filter(
          (id) => id !== news.news_id
        );

        localStorage.setItem(
          "likedPosts",
          JSON.stringify(likedPosts)
        );

        setLiked(false);

        setLikes((prev) =>
          prev > 0 ? prev - 1 : 0
        );
      } else {
        await addLike(news.news_id);

        likedPosts.push(news.news_id);

        localStorage.setItem(
          "likedPosts",
          JSON.stringify(likedPosts)
        );

        setLiked(true);

        setLikes((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // BOOKMARK
  // ==========================

  const handleBookmark = async () => {
    try {
      let bookmarkedPosts =
        JSON.parse(
          localStorage.getItem(
            "bookmarkedPosts"
          ) || "[]"
        );

      if (bookmarked) {
        await deleteBookmark(
          news.news_id
        );

        bookmarkedPosts =
          bookmarkedPosts.filter(
            (id) =>
              id !== news.news_id
          );

        localStorage.setItem(
          "bookmarkedPosts",
          JSON.stringify(
            bookmarkedPosts
          )
        );

        setBookmarked(false);
      } else {
        await saveBookmark(
          news.news_id
        );

        bookmarkedPosts.push(
          news.news_id
        );

        localStorage.setItem(
          "bookmarkedPosts",
          JSON.stringify(
            bookmarkedPosts
          )
        );

        setBookmarked(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // COMMENTS
  // ==========================

  const openComments = async () => {
    try {
      if (showComments) {
        setShowComments(false);
        return;
      }

      const response =
        await fetchComments(
          news.news_id
        );

      setComments(
        response.data || []
      );

      setShowComments(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment =
    async () => {
      if (!commentText.trim())
        return;

      try {
        await createComment(
          news.news_id,
          commentText
        );

        setCommentText("");

        const response =
          await fetchComments(
            news.news_id
          );

        setComments(
          response.data || []
        );
      } catch (err) {
        console.log(err);
      }
    };

  // ==========================
  // SHARE
  // ==========================

  const handleShare = async () => {
    try {
      const response =
        await sharePost(news.news_id);

      if (!response.success)
        return;

      setShares(
        response.data.share_count
      );

      const shareUrl =
        response.data.share_url;

      if (navigator.share) {
        await navigator.share({
          title:
            response.data.title,
          text:
            response.data.summary,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(
          shareUrl
        );

        alert(
          "Share link copied successfully!"
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
  <>
    <motion.div
  className="w-full h-full bg-white flex flex-col justify-between"
      initial={{
        rotateX: -90,
        opacity: 0,
      }}
      animate={{
        rotateX: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      {/* IMAGE */}

      <div className="relative h-[30%] w-full overflow-hidden rounded-b-2xl">
        <img
          src={news.thumbnail_url}
          alt={news.title}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {news.news_type}
          </span>
        </div>
      </div>

      {/* CONTENT */}

      <div className="flex-1 flex flex-col justify-between px-4 py-3">

        {/* TITLE */}


        <h2 className="text-xl font-bold text-gray-900 leading-snug line-clamp-2 h-[52px]">
          {news.title}
        </h2>

        {/* SUMMARY */}

        <div className="mt-2 h-[72px] overflow-hidden">

          <p
            className={`text-gray-600 leading-6 text-[15px] ${
              expanded ? "" : "line-clamp-3"
            }`}
          >
            {news.summary}
          </p>

          {news.summary?.length > 180 && (
            <button
              onClick={() =>
                setExpanded(!expanded)
              }
              className="text-orange-500 font-medium text-sm mt-1"
            >
              {expanded
                ? "Show Less"
                : "Read More"}
            </button>
          )}

        </div>

        {/* LOCATION */}

        <div className="flex items-center justify-between mt-2">

          <p className="text-sm text-gray-500">
             {news.city},{" "}
            {news.state}
          </p>

          <p className="text-xs text-gray-400">
            {news.published_at}
          </p>

        </div>

        {/* ACTION BAR */}

{/* ACTION BAR */}

<div className=" pt-3 mt-3">

  <div className="flex justify-between items-center">

    <div className="flex items-center gap-4">

      <button
        onClick={handleLike}
        className="flex items-center gap-1"
      >
        <Heart
          size={20}
          fill={liked ? "#ef4444" : "none"}
          className={
            liked
              ? "text-red-500"
              : "text-gray-500"
          }
        />
        <span className="text-sm">{likes}</span>
      </button>

      <button
        onClick={openComments}
        className="flex items-center gap-1"
      >
        <MessageCircle
          size={20}
          className="text-blue-500"
        />
        <span className="text-sm">
          {news.comment_count}
        </span>
      </button>

    </div>

    <div className="flex items-center gap-4">

      <button onClick={handleBookmark}>
        <Bookmark
          size={20}
          fill={
            bookmarked ? "#f97316" : "none"
          }
          className={
            bookmarked
              ? "text-orange-500"
              : "text-gray-500"
          }
        />
      </button>

      <button
        onClick={handleShare}
        className="flex items-center gap-1"
      >
        <Share2 size={20} />
        <span className="text-sm">
          {shares}
        </span>
      </button>

    </div>

  </div>

</div>
                {/* COMMENTS */}

        {showComments && (
          <div className="mt-3 border-t pt-3">

            <h3 className="font-semibold text-sm mb-3">
              Comments
            </h3>

            <div className="max-h-40 overflow-y-auto no-scrollbar space-y-2">

              {comments.length === 0 ? (

                <p className="text-sm text-gray-500">
                  No comments yet
                </p>

              ) : (

                comments.map((comment) => (

                  <div
                    key={comment.comment_id}
                    className="bg-gray-100 rounded-xl p-3"
                  >

                    <p className="font-semibold text-xs">
                      {comment.user_name}
                    </p>

                    <p className="text-sm text-gray-700 mt-1">
                      {comment.content}
                    </p>

                  </div>

                ))

              )}

            </div>

            <div className="flex items-center gap-2 mt-3">

              <input
                type="text"
                value={commentText}
                placeholder="Write a comment..."
                onChange={(e) =>
                  setCommentText(e.target.value)
                }
                className="
                  flex-1
                  border
                  rounded-full
                  px-4
                  py-2
                  text-sm
                  outline-none
                  focus:border-orange-500
                "
              />

              <button
                onClick={handleComment}
                className="
                  h-10
                  w-10
                  rounded-full
                  bg-orange-500
                  text-white
                  flex
                  items-center
                  justify-center
                "
              >
                <Send size={18} />
              </button>

            </div>

          </div>
        )}

      </div>

    </motion.div>

  </>
);
}