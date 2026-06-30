"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import {
  Heart,
  MessageCircle,
  Bookmark,
  Share2,
  Send,
  X,
} from "lucide-react";

import { useLikes } from "@/hooks/like_use";
import { useBookmarks } from "@/hooks/bookmark_use";
import { useComments } from "@/hooks/comment_use";
import { useNews } from "@/hooks/news_use";

export default function NewsCard({ news }) {
  const { addLike, removeLike } =
    useLikes();

  const {
    saveBookmark,
    deleteBookmark,
  } = useBookmarks();

  const {
    createComment,
    fetchComments,
  } = useComments();

  const { sharePost } =
  useNews();

const [shares, setShares] = useState(
  news.share_count || 0
);

const [likes, setLikes] = useState(
  news.like_count || 0
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


  useEffect(() => {
  setLikes(news.like_count || 0);
  setShares(news.share_count || 0);

  const likedPosts = JSON.parse(
    localStorage.getItem("likedPosts") || "[]"
  );

  setLiked(
    likedPosts.includes(news.news_id) ||
    news.is_liked
  );

   const bookmarkedPosts = JSON.parse(
    localStorage.getItem("bookmarkedPosts") || "[]"
  );

  setBookmarked(
    bookmarkedPosts.includes(news.news_id) ||
    news.is_bookmarked
  );
}, [news]);
  // ====================
  // LIKE
  // ====================

const handleLike = async () => {
  try {
    let likedPosts = JSON.parse(
      localStorage.getItem("likedPosts") || "[]"
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
  } catch (error) {
    console.log(error);
  }
};

  // ====================
  // BOOKMARK
  // ====================

 const handleBookmark = async () => {
  try {
    let bookmarkedPosts = JSON.parse(
      localStorage.getItem("bookmarkedPosts") || "[]"
    );

    if (bookmarked) {
      await deleteBookmark(news.news_id);

      bookmarkedPosts = bookmarkedPosts.filter(
        (id) => id !== news.news_id
      );

      localStorage.setItem(
        "bookmarkedPosts",
        JSON.stringify(bookmarkedPosts)
      );

      setBookmarked(false);
    } else {
      await saveBookmark(news.news_id);

      bookmarkedPosts.push(news.news_id);

      localStorage.setItem(
        "bookmarkedPosts",
        JSON.stringify(bookmarkedPosts)
      );

      setBookmarked(true);
    }
  } catch (error) {
    console.log(error);
  }
};

  // ====================
  // COMMENTS
  // ====================

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
  } catch (error) {
    console.log(error);
  }
};

  const handleComment =
    async () => {
      if (
        !commentText.trim()
      )
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
      } catch (error) {
        console.log(error);
      }
    };

  // ====================
  // SHARE
  // ====================

 const handleShare = async () => {
  try {
    const response = await sharePost(news.news_id);

    console.log(response);

    if (response.success) {
      setShares(response.data.share_count);
    }

    if (navigator.share) {
      await navigator.share({
        title: response.data.title,
        text: news.summary,
        url: window.location.href,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

  return (
    <>
      <div className="bg-white rounded-3xl shadow-md overflow-hidden mb-5">

        {/* IMAGE */}

        <div className="relative h-56 w-full">

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

        <div className="p-4">

          <h2 className="text-xl font-bold text-gray-900 line-clamp-2">

            {news.title}

          </h2>

          <p className="text-gray-600 mt-3 line-clamp-3">

            {news.summary}

          </p>

          <p className="text-sm text-gray-400 mt-3">

            📍 {news.city},
            {" "}
            {news.state}

          </p>

          {/* ACTIONS */}

          <div className="flex justify-between items-center mt-5">

            <div className="flex gap-5">

              {/* LIKE */}

              
               <button
  onClick={handleLike}
  className="flex items-center gap-1"
>
  <Heart
  size={22}
  fill={liked ? "#ef4444" : "none"}
  className={
    liked
      ? "text-red-500"
      : "text-gray-500"
  }
/>
  <span>{likes}</span>
</button>

              {/* COMMENT */}

              <button
                onClick={
                  openComments
                }
                className="flex items-center gap-1"
              >

                <MessageCircle
                  size={22}
                  className="text-blue-500"
                />

                <span>
                  {
                    news.comment_count
                  }
                </span>

              </button>

            </div>

            <div className="flex gap-5">

              {/* BOOKMARK */}

             {/* BOOKMARK */}

<button onClick={handleBookmark}>
  <Bookmark
    size={22}
    fill={bookmarked ? "#f97316" : "none"}
    className={
      bookmarked
        ? "text-orange-500"
        : "text-gray-500"
    }
  />
</button>

              {/* SHARE */}

              <button
  onClick={handleShare}
  className="flex items-center gap-1"
>
  <Share2
    size={22}
  />

  <span>
    {shares}
  </span>
</button>

               

            </div>

          </div>

         <p className="text-xs text-gray-400 mt-4">
  {news.published_at}
</p>

{/* COMMENTS INSIDE CARD */}

{showComments && (
  <div className="mt-4 pt-4">

    <h3 className="font-semibold text-sm mb-3">
      Comments
    </h3>

    {/* ONLY 2 COMMENTS VISIBLE */}
    <div className="max-h-32 overflow-y-auto space-y-2">

      {comments.length === 0 ? (
        <p className="text-gray-500 text-sm">
          No comments yet
        </p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.comment_id}
            className="bg-gray-100 rounded-xl p-2"
          >
            <p className="font-semibold text-xs">
              {comment.user_name}
            </p>

            <p className="text-xs text-gray-700 mt-1">
              {comment.content}
            </p>
          </div>
        ))
      )}

    </div>

    {/* COMMENT INPUT */}

    <div className="flex items-center gap-2 mt-3">

      <input
        type="text"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) =>
          setCommentText(e.target.value)
        }
        className="flex-1 border rounded-full px-4 py-2 text-sm"
      />

      <button
        onClick={handleComment}
        className="bg-orange-500 text-white p-2 rounded-full"
      >
        <Send size={18} />
      </button>

    </div>

  </div>
)}

        </div>

      </div>

     
         </>
  );
}