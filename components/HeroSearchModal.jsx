"use client";
import style from "@/styles/DraftPage.module.css";

export default function HeroSearchModal({ isModalOpen, closePopUp, heroes, handleHeroSelect }) {
    if (!isModalOpen) return null;

    return (
        <div className={style.overlay} onClick={closePopUp}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <button className={style.closeBtn} onClick={closePopUp}>x</button>
                <input
                    type="text"
                    className={style.inputSearch}
                    placeholder="Search the hero..."
                    // value={query}
                    // onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <div className={style.heroSelectionSection}>
                    {heroes.map(hero => (
                        <div
                            className={style.heroItem}
                            key={hero.id}
                            onClick={() => {
                                handleHeroSelect(hero.id);
                                console.log(hero.id)
                            }}
                        >
                            <img
                                src={hero.icons.round}
                                alt={hero.name}
                                className={style.heroIcon}
                            />
                            <div className={style.heroName}>
                                {hero.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}