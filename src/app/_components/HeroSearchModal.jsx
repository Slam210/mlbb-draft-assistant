"use client";

import { useState, useEffect } from "react";

export default function HeroSearchModal({
  isModalOpen,
  closePopUp,
  heroes,
  handleHeroSelect,
  bans,
  allySlots,
  enemySlots
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isModalOpen) setQuery("");
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const excludedSet = new Set([
    ...bans.filter(Boolean),
    ...allySlots.filter(Boolean),
    ...enemySlots.filter(Boolean),
  ]);

  const filteredHeroes = heroes.filter((hero) => {
    const matchesSearch = hero.name
      .toLowerCase()
      .includes(query.toLowerCase());

    const isExcluded = excludedSet.has(hero.id);

    return matchesSearch && !isExcluded;
  });

  function handleKeyDown(e) {
    if (e.key === "Enter" && filteredHeroes.length > 0) {
      e.preventDefault();
      handleHeroSelect(filteredHeroes[0].id);
      closePopUp();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={closePopUp}
    >
      <div
        className="w-full max-w-2xl bg-gray-950 border border-gray-800 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <button
            onClick={closePopUp}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-gray-700 active:scale-95 transition"
          >
            ✕
          </button>

          <input
            type="text"
            placeholder="Search heroes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 h-10 px-3 rounded-md bg-gray-900 text-white placeholder-gray-500 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
          />
        </div>

        {/* List */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-1 hide-scrollbar">
          {filteredHeroes.map((hero) => (
            <div
              key={hero.id}
              onClick={() => {
                handleHeroSelect(hero.id);
                closePopUp();
              }}
              className="flex items-center gap-4 px-4 py-3 rounded-md cursor-pointer hover:bg-white/10 active:bg-white/5 transition"
            >
              <img
                src={hero.icons.round}
                alt={hero.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-700"
              />

              <span className="text-white text-base truncate font-medium">
                {hero.name}
              </span>
            </div>
          ))}

          {filteredHeroes.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-gray-400 text-sm">No heroes found</p>
              <p className="text-gray-600 text-xs mt-1">
                Try a different search term
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}