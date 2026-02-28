"use client";
import React from "react";

type Props = {
  lang: "en" | "np";
  setLang: (l: "en" | "np") => void;
};

export default function LanguageToggle({ lang, setLang }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLang("en")}
        className={`px-3 py-1 rounded ${lang === "en" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
        aria-pressed={lang === "en"}
      >
        English
      </button>

      <button
        onClick={() => setLang("np")}
        className={`px-3 py-1 rounded ${lang === "np" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
        aria-pressed={lang === "np"}
      >
        नेपाली
      </button>
    </div>
  );
}
