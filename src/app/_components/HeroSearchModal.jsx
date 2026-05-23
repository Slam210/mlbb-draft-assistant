"use client";
import { useState, useEffect } from "react";
import style from "@/src/styles/DraftPage.module.css";

export default function HeroSearchModal({
  isModalOpen,
  closePopUp,
  heroes,
  handleHeroSelect,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!isModalOpen) {
      setQuery("");
    }
  }, [isModalOpen]);

  if (!isModalOpen) return null;

  const filteredHeroes = heroes.filter((hero) =>
    hero.name.toLowerCase().includes(query.toLowerCase()),
  );

  function handleKeyDown(e) {
    if (e.key === "Enter" && filteredHeroes.length > 0) {
      e.preventDefault();
      handleHeroSelect(filteredHeroes[0].id);
      closePopUp();
    }
  }

  return (
    <div className={style.overlay} onClick={closePopUp}>
      <div className={style.modal} onClick={(e) => e.stopPropagation()}>
        <button className={style.closeBtn} onClick={closePopUp}>
          x
        </button>
        <input
          type="text"
          className={style.inputSearch}
          placeholder="Search the hero..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
        <div className={style.heroSelectionSection}>
          {filteredHeroes.map((hero) => (
            <div
              className={style.heroItem}
              key={hero.id}
              onClick={() => {
                handleHeroSelect(hero.id);
                console.log(hero.id);
              }}
            >
              <img
                src={hero.icons.round}
                alt={hero.name}
                className={style.heroIcon}
              />
              <div className={style.heroName}>{hero.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
