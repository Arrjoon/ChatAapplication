"use client";
import React from "react";

type Article = { id: number; title_en: string; title_np: string };

const sampleCategories: { id: string; name_en: string; name_np: string; items: Article[] }[] = [
  {
    id: "politics",
    name_en: "Politics",
    name_np: "राजनीति",
    items: [
      { id: 1, title_en: "Parliament session concludes", title_np: "संसद् सत्र समापन" },
      { id: 2, title_en: "New bill introduced", title_np: "नयाँ विधेयक प्रस्तुत" },
    ],
  },
  {
    id: "sports",
    name_en: "Sports",
    name_np: "खेलकुद",
    items: [
      { id: 3, title_en: "Local team wins championship", title_np: "स्थानीय टोली च्याम्पियन" },
      { id: 4, title_en: "Player sets new record", title_np: "खेलेकले नयाँ रेकर्ड" },
    ],
  },
];

export default function NewsSection({ lang }: { lang: "en" | "np" }) {
  return (
    <section className="max-w-6xl mx-auto px-4 my-6 grid gap-6">
      {sampleCategories.map((cat) => (
        <div key={cat.id} className="bg-white rounded shadow p-4">
          <h4 className="font-semibold mb-2">{lang === "en" ? cat.name_en : cat.name_np}</h4>
          <ul className="space-y-1">
            {cat.items.map((it) => (
              <li key={it.id} className="text-sm text-gray-800">{lang === "en" ? it.title_en : it.title_np}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
