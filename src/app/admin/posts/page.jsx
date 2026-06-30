"use client";

import { useEffect, useState } from "react";
import { useAdminNews } from "@/hooks/post_use";

export default function AdminPostsPage() {

  const { fetchMyPosts } = useAdminNews();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await fetchMyPosts();
      setPosts(response.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">
        My Posts
      </h1>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post.news_id}
            className="border rounded-xl p-4 mb-4"
          >
            <img
              src={post.thumbnail_url}
              className="w-full h-56 object-cover rounded-xl"
              alt={post.title}
            />

            <h2 className="font-bold text-xl mt-3">
              {post.title}
            </h2>

            <p className="mt-2">
              {post.summary}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              {post.news_type}
            </p>
          </div>
        ))
      )}
    </div>
  );
}