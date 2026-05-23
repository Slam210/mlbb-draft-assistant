"use client";

import { calculateSuggestion } from "@/src/lib/draftLogic";

export default function SuggestionPanel({
  heroes,
  bans,
  allies,
  enemies,
  pickedLane,
}) {
  const suggestions = calculateSuggestion(
    { allies, enemies, bans, pickedLane },
    heroes
  );

  if (!pickedLane)
    return (
      <p className="text-center text-gray-400 mt-4">
        Select your Lane first...
      </p>
    );

  if (!suggestions)
    return (
      <p className="text-center text-gray-400 mt-4">
        No suggestion yet
      </p>
    );

  return (
    <div className="w-full flex flex-col items-center gap-4 px-2 sm:px-4">
      {/* Header */}
      <p className="text-center text-sm sm:text-base text-gray-300">
        Suggestions for{" "}
        <strong className="text-white">{pickedLane}</strong>
      </p>

      {/* List container */}
      <div className="w-full flex flex-col gap-3">
        {suggestions.map((hero) => {
          const heroData = heroes[hero.heroId - 1];

          const formattedScore =
            hero.score > 0
              ? `+${hero.score.toFixed(1)}`
              : hero.score.toFixed(1);

          return (
            <div
              key={hero.heroId}
              className="
                relative flex items-start sm:items-center gap-3 sm:gap-5
                border border-gray-700 rounded-lg
                p-3 sm:p-4
                bg-[#111518]
                hover:bg-[#1a1f24] transition
              "
            >
              {/* Hero Image */}
              <img
                src={heroData.icons.round}
                alt={heroData.name}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
              />

              {/* Description */}
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-sm sm:text-base font-semibold text-white">
                  {heroData.name}
                </p>

                {/* Pros */}
                {hero.pros.length > 0 && (
                  <ul className="text-green-500 text-xs sm:text-sm space-y-1">
                    {hero.pros.map((reason, i) => (
                      <li key={i}>• {reason}</li>
                    ))}
                  </ul>
                )}

                {/* Cons */}
                {hero.cons.length > 0 && (
                  <ul className="text-red-500 text-xs sm:text-sm space-y-1">
                    {hero.cons.map((reason, i) => (
                      <li key={i}>• {reason}</li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Score */}
              <p
                className={`
                  absolute sm:static top-2 right-3 sm:right-auto
                  text-sm sm:text-base font-bold tracking-wide
                  ${hero.score >= 0 ? "text-green-500" : "text-red-500"
                  }
                `}
              >
                {formattedScore}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}