"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useNews } from "@/hooks/news_use";
import NewsCard from "@/components/NewsCard";

export default function CategoryNewsPage() {
  const { id } = useParams();

  const { fetchNews } = useNews();

  const [news, setNews] = useState([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response =
        await fetchNews();

      const allNews =
        response.data.news || [];

      const filteredNews =
        allNews.filter(
          (item) =>
            item.category_id ===
            Number(id)
        );

      console.log(
        "FILTERED:",
        filteredNews
      );

      setNews(filteredNews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-4 py-4 pb-28">

      <h1 className="text-3xl font-bold mb-5">
        Category News
      </h1>

      {news.length === 0 ? (
        <p>No News Found</p>
      ) : (
        news.map((item) => (
          <NewsCard
            key={item.news_id}
            news={item}
          />
        ))
      )}

    </div>
  );
}