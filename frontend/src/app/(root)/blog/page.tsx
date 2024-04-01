"use client";
import Hero from "@/src/components/_Root/hero/hero";
import Posts from "@/src/components/_Root/posts/posts";
import { useBlogStore } from "@/src/store/blogStore";
import React from "react";

const Blog: React.FC = () => {
  return (
    <div className="flex flex-col gap-16">
      <Hero />
      <Posts />
    </div>
  );
};

export default Blog;
