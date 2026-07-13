"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { useNews } from "@/hooks/news_use";
import NewsCard from "@/components/NewsCard";

export default function HomePage() {
  const { fetchNews, loading } = useNews();

  const [news, setNews] = useState([]);
  const [language, setLanguage] = useState("en");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [animating, setAnimating] = useState(false);

  const touchStartY = useRef(0);

  useEffect(() => {
    const lang =
      localStorage.getItem("language") || "en";

    setLanguage(lang);

    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      const response = await fetchNews();

      setNews(response.data.news || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ===========================
  // NEXT PAGE
  // ===========================

  const nextPage = () => {
    if (animating) return;

    if (currentIndex >= news.length - 1) return;

    setAnimating(true);

    setDirection(1);

    setCurrentIndex((prev) => prev + 1);

    setTimeout(() => {
      setAnimating(false);
    }, 700);
  };

  // ===========================
  // PREVIOUS PAGE
  // ===========================

  const previousPage = () => {
    if (animating) return;

    if (currentIndex <= 0) return;

    setAnimating(true);

    setDirection(-1);

    setCurrentIndex((prev) => prev - 1);

    setTimeout(() => {
      setAnimating(false);
    }, 700);
  };

  // ===========================
  // MOUSE WHEEL
  // ===========================

  useEffect(() => {
    const wheel = (e) => {
      e.preventDefault();

      if (animating) return;

      if (e.deltaY > 0) {
        nextPage();
      } else {
        previousPage();
      }
    };

    window.addEventListener("wheel", wheel, {
      passive: false,
    });

    return () =>
      window.removeEventListener(
        "wheel",
        wheel
      );
  });

  // ===========================
  // MOBILE SWIPE
  // ===========================

  const handleTouchStart = (e) => {
    touchStartY.current =
      e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const end =
      e.changedTouches[0].clientY;

    const diff =
      touchStartY.current - end;

    if (Math.abs(diff) < 70) return;

    if (diff > 0) {
      nextPage();
    } else {
      previousPage();
    }
  };

  // ===========================
  // LOADING
  // ===========================

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg font-semibold">
        Loading...
      </div>
    );
  }

  // ===========================
  // EMPTY
  // ===========================

  if (!news.length) {
    return (
      <div className="h-screen flex justify-center items-center">
        <p className="text-lg text-gray-500">
          {language === "te"
            ? "వార్తలు లేవు"
            : "No News Available"}
        </p>
      </div>
    );
  }

  // ===========================
  // UI
  // ===========================

  return (
    <div
      className="
        relative
        h-full
        w-full
        overflow-hidden
        bg-white
      "
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence
        mode="wait"
        initial={false}
      >
        <motion.div
          key={currentIndex}
          initial={{
            rotateX:
              direction === 1 ? -90 : 90,
            opacity: 0,
            transformOrigin:
              direction === 1
                ? "bottom"
                : "top",
          }}
          animate={{
            rotateX: 0,
            opacity: 1,
          }}
          exit={{
            rotateX:
              direction === 1 ? 90 : -90,
            opacity: 0,
            transformOrigin:
              direction === 1
                ? "top"
                : "bottom",
          }}
          transition={{
            duration: 0.65,
            ease: "easeInOut",
          }}
          style={{
            width: "100%",
            height: "100%",
            perspective: 2000,
          }}
        >
          <NewsCard
            news={news[currentIndex]}
            onRefresh={loadNews}
          />
        </motion.div>
      </AnimatePresence>

      {/* PAGE INDICATOR */}

      <div
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          flex
          flex-col
          gap-2
          z-50
        "
      >
        {news.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              i === currentIndex
                ? "bg-orange-500 scale-125"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}