"use client";
import style from "@/styles/DraftPage.module.css";

export default function HeroSearchModal({ isOpen, closePopUp }) {
    if (!isOpen) return null;

    return (
        <div className={style.overlay} onClick={closePopUp}>
            <div className={style.modal} onClick={(e) => e.stopPropagation()}>
                <button className={style.closeBtn} onClick={closePopUp}>x</button>
                <input
                    type="text"
                    // value={query}
                    className={style.inputSearch}
                    // onChange={(e) => setQuery(e.target.value)}
                    autoFocus
                />
                <h2>Hello pop up</h2>
            </div>
        </div>
    )
}