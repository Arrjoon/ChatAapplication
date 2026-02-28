"use client";
import React from "react";

type Article = {
  id: number;
  title_en: string;
  title_np: string;
  excerpt_en?: string;
  excerpt_np?: string;
};

const sample: Article[] = [
  {
    id: 1,
    title_en: "Government announces new economic package",
    title_np: "सरकारले नयाँ आर्थिक प्याकेज घोषणा गर्‍यो",
    excerpt_en: "Measures to support small businesses and recovery.",
    excerpt_np: "सानो व्यवसायलाई सहयोग र आर्थिक पुनरुत्थानका उपायहरू।",
  },
  {
    id: 2,
    title_en: "Severe weather expected in the hills",
    title_np: "पहाड क्षेत्रमा भारी मौसमको सम्भावना",
    excerpt_en: "Citizens urged to remain cautious and follow updates.",
    excerpt_np: "नागरिकहरूलाई सतर्क हुन र अपडेटहरू अनुगमन गर्न आग्रह।",
  },
];

export default function TopHeadlines({ lang }: { lang: "en" | "np" }) {
  const lead = sample[0];
  const others = sample.slice(1);

  return (
    <section className="max-w-6xl mx-auto my-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article className="md:col-span-2 bg-white rounded shadow p-4">
          <h2 className="text-2xl font-bold mb-2">{lang === "en" ? lead.title_en : lead.title_np}</h2>
          <p className="text-sm text-gray-600">{lang === "en" ? lead.excerpt_en : lead.excerpt_np}</p>
        </article>

        <aside className="bg-white rounded shadow p-4">
          <h3 className="font-semibold mb-2">{lang === "en" ? "More headlines" : "थप समाचार"}</h3>
          <ul className="space-y-2">
            {others.map((a) => (
              <li key={a.id} className="text-sm text-gray-800">{lang === "en" ? a.title_en : a.title_np}</li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
