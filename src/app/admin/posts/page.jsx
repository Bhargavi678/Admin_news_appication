"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  MapPin,
  Tag,
} from "lucide-react";

import { useAdminNews } from "@/hooks/posts_use";

export default function AdminPostsPage() {
  const { fetchMyPosts } = useAdminNews();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);

      const response = await fetchMyPosts();

      console.log("MY POSTS:", response);

      setPosts(response.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">

      <h1 className="text-3xl font-bold mb-6">
        My Posted News
      </h1>

      {posts.length === 0 ? (
        <div className="text-center mt-20 text-gray-500 text-lg">
          No News Posted Yet
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.news_id}
            className="bg-white rounded-2xl shadow-md overflow-hidden mb-6"
          >
            {/* IMAGE */}

            <img
              src={
                post.thumbnail_url &&
                post.thumbnail_url !== "[object File]"
                  ? post.thumbnail_url
                  : "/placeholder.png"
              }
              alt={post.title}
              className="w-full h-60 object-cover"
            />

            {/* CONTENT */}

            <div className="p-5">

              {/* STATUS */}

              <div className="flex justify-between items-center mb-3">

                <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  {post.news_type}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    post.status === "published"
                      ? "bg-green-100 text-green-700"
                      : post.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {post.status}
                </span>

              </div>

              {/* TITLE */}

              <h2 className="text-2xl font-bold">
                {post.title}
              </h2>

              {/* SUMMARY */}

              {post.summary && (
                <p className="text-gray-600 mt-3">
                  {post.summary}
                </p>
              )}

              {/* CONTENT */}

              <p className="text-gray-700 mt-4 line-clamp-4">
                {post.content}
              </p>

              {/* LOCATION */}

              <div className="flex items-center gap-2 mt-4 text-gray-500">

                <MapPin size={16} />

                <span>
                  {post.city}, {post.state}
                </span>

              </div>

              {/* CATEGORY */}

              <div className="flex items-center gap-2 mt-2 text-gray-500">

                <Tag size={16} />

                <span>
                  Category ID : {post.category_id}
                </span>

              </div>

              {/* DATE */}

              <div className="flex items-center gap-2 mt-2 text-gray-500">

                <Calendar size={16} />

                <span>
                  {new Date(post.published_at).toLocaleString()}
                </span>

              </div>

              {/* STATS */}

              <div className="grid grid-cols-4 gap-4 mt-6 border-t pt-4">

                <div className="flex flex-col items-center">

                  <Eye className="text-blue-500" />

                  <span className="font-semibold mt-1">
                    {post.view_count}
                  </span>

                  <p className="text-xs text-gray-500">
                    Views
                  </p>

                </div>

                <div className="flex flex-col items-center">

                  <Heart className="text-red-500" />

                  <span className="font-semibold mt-1">
                    {post.like_count}
                  </span>

                  <p className="text-xs text-gray-500">
                    Likes
                  </p>

                </div>

                <div className="flex flex-col items-center">

                  <MessageCircle className="text-green-500" />

                  <span className="font-semibold mt-1">
                    {post.comment_count}
                  </span>

                  <p className="text-xs text-gray-500">
                    Comments
                  </p>

                </div>

                <div className="flex flex-col items-center">

                  <Share2 className="text-orange-500" />

                  <span className="font-semibold mt-1">
                    {post.share_count}
                  </span>

                  <p className="text-xs text-gray-500">
                    Shares
                  </p>

                </div>

              </div>

            </div>

          </div>
        ))
      )}

    </div>
  );
}