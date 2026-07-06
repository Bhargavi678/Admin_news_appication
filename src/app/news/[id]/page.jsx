"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useNews } from "@/hooks/news_use";

export default function NewsDetailsPage() {
  const { id } = useParams();

  const { fetchNewsDetails } = useNews();

  const [news, setNews] = useState(null);

  useEffect(() => {
  if (id) {
    loadNews();
  }
}, [id]);
  const loadNews = async () => {
    try {
      const response = await fetchNewsDetails(id);

      console.log(response);

      setNews(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!news) {
    return (
      <div className="p-5">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4">

      <img
        src={news.thumbnail_url}
        alt={news.title}
        className="w-full h-60 object-cover rounded-xl"
      />

      <h1 className="text-2xl font-bold mt-4">
        {news.title}
      </h1>

      <p className="text-gray-500 mt-2">
        {news.state} • {news.city}
      </p>

      <p className="mt-4 font-semibold">
        {news.summary}
      </p>

      <p className="mt-5 leading-7">
        {news.content}
      </p>

    </div>
  );
}