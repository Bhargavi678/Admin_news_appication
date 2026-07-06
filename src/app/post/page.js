"use client";

import { useEffect, useState } from "react";

import { useAdminNews } from "@/hooks/post_use";
import { useCategories } from "@/hooks/category_use";

import {
  getUserProfile,
  getAdminProfile,
} from "@/services/profile_service";

export default function PostPage() {
  const {
    addNews,
    publishNewsItem,
    loading,
  } = useAdminNews();

  const {
    fetchCategories,
  } = useCategories();

  const [categories, setCategories] =
    useState([]);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    summary: "",
    original_language: "en",
    category_id: "",
    news_type: "Local",
    country: "India",
    state: "",
    district: "",
    mandal: "",
    city: "",
    village: "",
    is_breaking: false,
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);


  useEffect(() => {
    loadCategories();
    loadLanguage();
  }, []);

  const loadCategories = async () => {
    try {
      const response =
        await fetchCategories();


      setCategories(
        response.data || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadLanguage = async () => {
    try {
      const role =
        localStorage.getItem("role");

      let response;

      if (role === "admin") {
        response =
          await getAdminProfile();
      } else {
        response =
          await getUserProfile();
      }

      const language =
        response.data.language ||
        "en";

      setFormData((prev) => ({
        ...prev,
        original_language:
          language,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("summary", formData.summary);
      data.append("original_language", formData.original_language);
      data.append("category_id", formData.category_id);
      data.append("news_type", "Local");
      data.append("country", formData.country);
      data.append("state", formData.state);
      data.append("district", formData.district);
      data.append("mandal", formData.mandal);
      data.append("city", formData.city);
      data.append("village", formData.village);
      data.append("is_breaking", formData.is_breaking);

      if (thumbnail) {
        data.append("thumbnail", thumbnail);
      }

      if (video) {
        data.append("video", video);
      }
      console.log("===== FORM DATA =====",data);

      for (const [key, value] of data.entries()) {
        console.log(key, value);
      }
      const createResponse = await addNews(data);

      const newsId = createResponse.data.news_id;

      if (!newsId) {
        throw new Error("News ID not found");
      }

      await publishNewsItem(newsId);

      alert("News Published Successfully");

      setFormData({
        title: "",
        content: "",
        summary: "",
        original_language: formData.original_language,
        category_id: "",
        news_type: "Local",
        country: "India",
        state: "",
        district: "",
        mandal: "",
        city: "",
        village: "",
        is_breaking: false,
      });

      setThumbnail(null);
      setVideo(null);
    } catch (error) {
      console.log(error.response?.data);

      if (error.response?.data?.detail) {
        error.response.data.detail.forEach((item) => {
          console.log(item.loc, item.msg);
        });
      }
      alert(error.message || "Failed to publish news");
    }
  };

  return (
    <div className="p-4 pb-24">

      <h1 className="text-3xl font-bold mb-6">
        Add News
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="title"
          placeholder="News Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
          required
        />

        <textarea
          name="summary"
          placeholder="Summary"
          value={formData.summary}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
          rows={3}
        />

        <textarea
          name="content"
          placeholder="News Content"
          value={formData.content}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl h-40"
          required
        />

        <select
          name="category_id"
          value={formData.category_id}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
          required
        >
          <option value="">
            Select Category
          </option>

          {categories.map(
            (category) => (
              <option
                key={
                  category.category_id
                }
                value={
                  category.category_id
                }
              >
                {category.name}
              </option>
            )
          )}
        </select>

        <input
          value={
            formData.original_language ===
              "te"
              ? "Telugu"
              : "English"
          }
          readOnly
          className="w-full border p-4 rounded-xl bg-gray-100"
        />

        <select
          name="news_type"
          value={formData.news_type}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        >
          <option value="Local">
            Local
          </option>

          <option value="State">
            State
          </option>

          <option value="National">
            National
          </option>

          <option value="International">
            International
          </option>
        </select>

        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="district"
          placeholder="District"
          value={formData.district}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="mandal"
          placeholder="Mandal"
          value={formData.mandal}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />

        <input
          name="village"
          placeholder="Village"
          value={formData.village}
          onChange={handleChange}
          className="w-full border p-4 rounded-xl"
        />
        <div>
          <label className="block mb-2 font-medium">
            Upload Thumbnail
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnail(e.target.files[0])}
            className="w-full border p-3 rounded-xl"
            required
          />
        </div>
        <div>
          <label className="block mb-2 font-medium">
            Upload Video
          </label>

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="w-full border p-3 rounded-xl"
          />
        </div>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_breaking"
            checked={formData.is_breaking}
            onChange={handleChange}
          />

          Breaking News
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white py-4 rounded-xl font-semibold"
        >
          {loading ? "Publishing..." : "Create & Publish News"}
        </button>

      </form>

    </div>
  );
}