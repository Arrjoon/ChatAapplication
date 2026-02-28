"use client";
import React, { useState } from "react";
import LanguageToggle from "@/components/news/LanguageToggle";
import TopHeadlines from "@/components/news/TopHeadlines";
import NewsSection from "@/components/news/NewsSection";

export default function NewsHome() {
  const [lang, setLang] = useState<"en" | "np">("en");

  return (
    <div className="bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">{lang === "en" ? "Daily News" : "डेली न्युज"}</h1>
        <LanguageToggle lang={lang} setLang={setLang} />
      </div>

      <TopHeadlines lang={lang} />
      <NewsSection lang={lang} />

      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-500">
        <p>{lang === "en" ? "Latest updates across categories." : "विभागहरूमा नयाँ अपडेटहरू।"}</p>
      </div>
    </div>
  );
}
