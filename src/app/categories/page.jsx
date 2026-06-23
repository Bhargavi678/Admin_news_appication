"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useCategories } from "@/hooks/category_use";

const categoryImages = {
  Politics: "/assets/politics.jpg",
  Technology: "/assets/technology.jpg",
  Sports: "/assets/sports.jpg",
  Entertainment: "/assets/entertainment.jpg",
  Business: "/assets/business.jpg",
  Health: "/assets/health.jpg",
  Education: "/assets/education.jpg",
  Weather: "/assets/weather.jpg",
};

export default function CategoriesPage() {
  const router = useRouter();

  const { fetchCategories } =
    useCategories();

  const [categories, setCategories] =
    useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response =
        await fetchCategories();

      setCategories(
        response.data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (
    category
  ) => {
    router.push(
      `/category-news/${category.category_id}`
    );
  };

  return (
    <div className="px-4 py-6 pb-24">

      <h1 className="text-4xl font-bold text-[#0f172a]">
        Explore
      </h1>

      <p className="text-gray-500 mt-2 mb-6">
        Pick a topic you love.
      </p>

      <div className="grid grid-cols-2 gap-4">

        {categories.map(
          (category) => (
            <div
              key={
                category.category_id
              }
              onClick={() =>
                handleCategoryClick(
                  category
                )
              }
              className="relative h-64 rounded-[30px] overflow-hidden shadow-lg cursor-pointer group"
            >
              <Image
                src={
                  categoryImages[
                    category.name
                  ] ||
                  "/assets/politics.jpg"
                }
                alt={
                  category.name
                }
                fill
                className="object-cover group-hover:scale-105 transition duration-300"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute bottom-4 left-4">

                <h2 className="text-white text-2xl font-bold">
                  {
                    category.name
                  }
                </h2>

                <p className="text-white/80 text-sm">
                  {
                    category.description
                  }
                </p>

              </div>

            </div>
          )
        )}

      </div>

    </div>
  );
}