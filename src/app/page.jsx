"use client";

import { useState, useEffect } from "react";
import DraftPanel from "@/src/app/_components/DraftPanel";
import SuggestionPanel from "@/src/app/_components/SuggestionPanel";
import HeroSearchModal from "@/src/app/_components/HeroSearchModal";

export default function Home() {
  const [lane, setLane] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [banSlots, setBanSlots] = useState(Array(10).fill(null));
  const [allySlots, setAllySlots] = useState(Array(5).fill(null));
  const [enemySlots, setEnemySlots] = useState(Array(5).fill(null));

  const setters = {
    Banned: setBanSlots,
    Allies: setAllySlots,
    Enemies: setEnemySlots,
  };

  const [selectedSlot, setSelectedSlot] = useState({
    panel: null,
    index: null,
  });

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/data/heroes_draft_data.json")
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error(err));
  }, []);

  function closePopUp() {
    setIsModalOpen(false);
  }

  function openPopUp() {
    setIsModalOpen(true);
  }

  function resetDraft() {
    setBanSlots(Array(10).fill(null));
    setAllySlots(Array(5).fill(null));
    setEnemySlots(Array(5).fill(null));
  }

  function handleNullSlotClick(panel, index) {
    const setter = setters[panel];
    if (!setter) return;

    setter((prev) => {
      const updated = [...prev];
      updated[index] = null;
      return updated;
    });
  }

  function handleSlotClick(panel, index) {
    setSelectedSlot({ panel, index });
    openPopUp();
  }

  function handleHeroSelect(heroId) {
    const { panel, index } = selectedSlot;
    const setter = setters[panel];
    if (!setter) return;

    const isTaken =
      banSlots.includes(heroId) ||
      allySlots.includes(heroId) ||
      enemySlots.includes(heroId);

    if (isTaken) {
      setErrorMessage(`${heroes[heroId - 1].name} is already picked!`);
      setTimeout(() => setErrorMessage(""), 3000);
      closePopUp();
      return;
    }

    setter((prev) => {
      const updated = [...prev];
      updated[index] = heroId;
      return updated;
    });

    closePopUp();
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 sm:px-10 lg:px-24 py-10 flex flex-col gap-10">
      {/* Error Banner */}
      {errorMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-base sm:text-lg">
          {errorMessage}
        </div>
      )}

      {/* Lane Selection */}
      <section className="flex flex-col sm:flex-row sm:items-center gap-6 justify-center">
        <h3 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">
          Select Your Lane:
        </h3>

        <select
          value={lane}
          onChange={(e) => setLane(e.target.value)}
          className="
        bg-gray-800
        border-2 border-gray-700
        text-white

        px-6 py-4

        rounded-xl

        text-lg sm:text-xl

        outline-none
        focus:border-blue-500
        focus:ring-1 focus:ring-blue-500
      "
        >
          <option value="">--- ---</option>
          <option value="Gold Lane">Gold Lane</option>
          <option value="Exp Lane">Exp Lane</option>
          <option value="Mid Lane">Mid Lane</option>
          <option value="Jungle">Jungle</option>
          <option value="Roam">Roam</option>
        </select>
      </section>

      {/* Draft Panels */}
      <section className="flex flex-col gap-8 items-center">
        <DraftPanel
          title="Banned"
          handleSlotClick={handleSlotClick}
          handleNullSlotClick={handleNullSlotClick}
          slots={banSlots}
          heroes={heroes}
        />

        <DraftPanel
          title="Allies"
          handleSlotClick={handleSlotClick}
          handleNullSlotClick={handleNullSlotClick}
          slots={allySlots}
          heroes={heroes}
        />

        <DraftPanel
          title="Enemies"
          handleSlotClick={handleSlotClick}
          handleNullSlotClick={handleNullSlotClick}
          slots={enemySlots}
          heroes={heroes}
        />

        <button
          onClick={resetDraft}
          className="
            mt-2
            bg-gray-700 hover:bg-gray-600
            text-white font-semibold
            px-5 py-2
            rounded-full
            transition active:scale-95
          "
        >
          Reset Draft
        </button>
      </section>

      {/* Suggestions */}
      <section className="w-full flex justify-center">
        <SuggestionPanel
          heroes={heroes}
          bans={banSlots}
          allies={allySlots}
          enemies={enemySlots}
          pickedLane={lane}
        />
      </section>

      {/* Modal */}
      <HeroSearchModal
        isModalOpen={isModalOpen}
        closePopUp={closePopUp}
        heroes={heroes}
        handleHeroSelect={handleHeroSelect}
      />
    </div >
  );
}