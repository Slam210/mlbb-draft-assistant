"use client";

import { useState } from "react";
import HeroEditor from "./_components/hero-editor/heroEditor";
import DraftPage from './_components/draft/draftPage';

export default function Home() {
  const [activeTab, setActiveTab] = useState("editor");

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 sm:px-10 lg:px-24 py-10 flex flex-col gap-10">
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setActiveTab("editor")}
          className={`px-4 py-2 rounded-full font-semibold transition ${activeTab === "editor"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
            }`}
        >
          Hero Editor
        </button>
        <button
          onClick={() => setActiveTab("draft")}
          className={`px-4 py-2 rounded-full font-semibold transition ${activeTab === "draft"
            ? "bg-blue-600 text-white"
            : "bg-gray-700 text-gray-300"
            }`}
        >
          Draft
        </button>
      </div>
      {activeTab === "editor" ? (
        <HeroEditor />
      ) : (
        <DraftPage />
      )}
    </div >
  );
}