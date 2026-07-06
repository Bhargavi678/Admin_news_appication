"use client";

import { useEffect, useState } from "react";

import { useNews } from "@/hooks/news_use";
import NewsCard from "@/components/NewsCard";

export default function HomePage() {
  const { fetchNews, loading } = useNews();

  const [news, setNews] = useState([]);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const lang =
      localStorage.getItem("language") || "en";

    setLanguage(lang);

    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await fetchNews();

      console.log("NEWS RESPONSE", response);

      setNews(response.data.news || []);
    } catch (error) {
      console.log("NEWS ERROR", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading News...
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">
          {language === "te"
            ? "వార్తలు అందుబాటులో లేవు"
            : "No News Available"}
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        h-screen
        overflow-y-scroll
        snap-y
        snap-mandatory
        no-scrollbar
        bg-gray-100
      "
    >
      {news.map((item) => (
        <section
  key={item.news_id}
  className="
    snap-start
    h-screen
    flex
    items-start
    justify-center
    pt-0
  "
>
  <div className="w-full max-w-md h-screen">
    <NewsCard
      news={item}
      onRefresh={loadNews}
    />
  </div>
</section>
      ))}
    </div>
  );
}