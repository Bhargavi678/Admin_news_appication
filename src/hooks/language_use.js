"use client";

import { useEffect, useState } from "react";

export const useLanguage = () => {
  const [language, setLanguage] =
    useState("en");

  useEffect(() => {
    const lang =
      localStorage.getItem(
        "language"
      ) || "en";

    setLanguage(lang);
  }, []);

  const changeLanguage = (
    lang
  ) => {
    localStorage.setItem(
      "language",
      lang
    );

    setLanguage(lang);

    window.location.reload();
  };

  return {
    language,
    changeLanguage,
  };
};