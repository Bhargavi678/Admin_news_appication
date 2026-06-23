"use client";

import { useEffect, useState } from "react";

import { useNews } from "@/hooks/news_use";

import NewsCard from "@/components/NewsCard";

export default function HomePage() {
  const {
    fetchNews,
    loading,
  } = useNews();

  const [news, setNews] =
    useState([]);

  const [language, setLanguage] =
    useState("en");

  useEffect(() => {
    const lang =
      localStorage.getItem(
        "language"
      ) || "en";

    setLanguage(lang);

    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response =
        await fetchNews();

      console.log(
        "NEWS RESPONSE",
        response
      );

      setNews(
        response.data.news || []
      );
    } catch (error) {
      console.log(
        "NEWS ERROR",
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading News...
      </div>
    );
  }

  return (
    <div className="px-4 py-4 pb-28">

      <h1 className="text-3xl font-bold mb-2">
        {language === "te"
          ? "తాజా వార్తలు"
          : "Latest News"}
      </h1>

      <p className="text-gray-500 mb-5">
        {language === "te"
          ? "మీ ప్రాంతానికి సంబంధించిన వార్తలు"
          : "News from your location"}
      </p>

      {news.length === 0 ? (
        <div className="flex justify-center mt-20">
          <p className="text-gray-500">
            {language === "te"
              ? "వార్తలు అందుబాటులో లేవు"
              : "No News Available"}
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {news.map((item) => (
            <NewsCard
              key={item.news_id}
              news={item}
              onRefresh={
                loadNews
              }
            />
          ))}
        </div>
      )}

    </div>
  );
}