"use client";
import React, { useState } from "react";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LanguageToggle from "@/components/news/LanguageToggle";

const categories = [
  { key: "home", en: "Home", np: "गृह" },
  { key: "politics", en: "Politics", np: "राजनीति" },
  { key: "business", en: "Business", np: "वाणिज्य" },
  { key: "sports", en: "Sports", np: "खेलकुद" },
  { key: "entertainment", en: "Entertainment", np: "मनोरञ्जन" },
  { key: "world", en: "World", np: "बिश्व" },
  { key: "technology", en: "Tech", np: "प्रविधि" },
  { key: "opinion", en: "Opinion", np: "विचार" },
];

const Header = () => {
  const [lang, setLang] = useState<"en" | "np">("en");
  const [mobileOpen, setMobileOpen] = useState(false);

  const today = new Date();
  const dateStr = today.toLocaleDateString(lang === "en" ? "en-US" : "ne-NP", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="w-full border-b border-gray-200 bg-white z-50">
      {/* Top info bar */}
      <div className="bg-gray-900 text-gray-100 text-sm">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="opacity-90">{dateStr}</span>
            <span className="hidden sm:inline">|</span>
            <nav className="hidden sm:flex gap-3 text-xs text-gray-200">
              <a href="#" className="hover:underline">{lang === "en" ? "Election 2025" : "निर्वाचन २०८२"}</a>
              <a href="#" className="hover:underline">{lang === "en" ? "Covid-19" : "कोभिड-१९"}</a>
              <a href="#" className="hover:underline">{lang === "en" ? "Live" : "प्रत्यक्ष"}</a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle lang={lang} setLang={setLang} />
            <a href="#" className="text-xs text-gray-200 hover:underline hidden sm:inline">{lang === "en" ? "Subscribe" : "सदस्यता"}</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-red-600 text-white font-bold text-2xl shadow">
              N
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-extrabold text-gray-900">{lang === "en" ? "NewsPulse" : "न्युजपल्स"}</span>
              <span className="text-xs text-gray-500">{lang === "en" ? "Breaking Nepal & World" : "नेपाल र संसारका ताजा खबर"}</span>
            </div>
          </Link>

          <div className="flex-1 px-4 hidden md:block">
            <div className="flex items-center bg-gray-100 rounded-md px-3 py-2 shadow-sm">
              <Search className="w-5 h-5 text-gray-500" />
              <input
                placeholder={lang === "en" ? "Search news, topics or people" : "समाचार, विषय वा व्यक्ति खोज्नुहोस्"}
                className="bg-transparent flex-1 outline-none text-sm px-3"
              />
              <Button className="ml-2 bg-red-600 text-white px-4 py-1 text-sm">{lang === "en" ? "Search" : "खोज"}</Button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden md:inline text-sm">{lang === "en" ? "Login" : "लग - इन"}</Button>
            <Button className="hidden md:inline bg-red-600 text-white px-4 py-1 text-sm">{lang === "en" ? "Subscribe" : "सदस्यता"}</Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Category navigation with breaking ticker */}
      <div className="border-t border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-6">
          <nav className="hidden lg:flex items-center gap-4 text-sm font-medium overflow-x-auto">
            {categories.map((c) => (
              <a key={c.key} href={`/${c.key}`} className="py-2 hover:text-red-600">
                {lang === "en" ? c.en : c.np}
              </a>
            ))}
          </nav>

          <div className="flex-1 ml-4">
            <div className="overflow-hidden text-sm text-gray-700">
              <div className="whitespace-nowrap animate-marquee">
                <span className="mr-6 font-semibold text-red-600">{lang === "en" ? "BREAKING" : "ताजा"}:</span>
                <span className="mr-8">Major quake hits remote region, rescue operations underway — updates coming in.</span>
                <span className="mr-8">Parliament passes new investment bill amid debate.</span>
                <span className="mr-8">Local elections: key races to watch this week.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-red-600 text-white rounded flex items-center justify-center">N</div>
                <div>
                  <div className="font-bold">{lang === "en" ? "NewsPulse" : "न्युजपल्स"}</div>
                  <div className="text-xs text-gray-500">{lang === "en" ? "Breaking Nepal & World" : "नेपाल र संसारका ताजा खबर"}</div>
                </div>
              </div>
              <LanguageToggle lang={lang} setLang={setLang} />
            </div>

            <div className="pt-2 border-t">
              <nav className="flex flex-col gap-2">
                {categories.map((c) => (
                  <a key={c.key} href={`/${c.key}`} className="py-2 px-2 rounded hover:bg-gray-100">{lang === "en" ? c.en : c.np}</a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
