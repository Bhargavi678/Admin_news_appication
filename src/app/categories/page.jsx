"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useCategories } from "@/hooks/category_use";

export default function CategoriesPage() {
  const router = useRouter();

  const { fetchCategories } = useCategories();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await fetchCategories();

      if (response.success) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryClick = (category) => {
    router.push(`/category-news/${category.category_id}`);
  };

  return (
    <div className="px-4 py-6 pb-24">
      {/* Heading */}

      <h1 className="text-4xl font-bold text-[#0f172a]">
        Explore
      </h1>

      <p className="text-gray-500 mt-2 mb-6">
        Pick a topic you love.
      </p>

      {/* Categories */}

      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <div
            key={category.category_id}
            onClick={() => handleCategoryClick(category)}
            className="relative h-64 rounded-[30px] overflow-hidden shadow-lg cursor-pointer group"
          >
            {/* Category Image from API */}

            <Image
              src={category.image_url}
              alt={category.name}
              fill
              unoptimized
              className="object-cover transition duration-500 group-hover:scale-110"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Text */}

            <div className="absolute bottom-5 left-5 right-5">
              <h2 className="text-white text-2xl font-bold">
                {category.name}
              </h2>

              <p className="text-white/80 text-sm mt-2 line-clamp-2">
                {category.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}