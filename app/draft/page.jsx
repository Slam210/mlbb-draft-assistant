"use client"
import { useState, useEffect } from "react";
import style from "@/styles/DraftPage.module.css";
import DraftPanel from "@/components/DraftPanel";
import SuggestionPanel from "@/components/SuggestionPanel";
import HeroSearchModal from "@/components/HeroSearchModal";

export default function DraftPage() {
    const [heroName, setHeroName] = useState("");
    const [lane, setLane] = useState("");
    const [heroes, setHeroes] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    function closePopUp() {
        setIsOpen(false);
    }
    function openPopUp() {
        setIsOpen(true);
    }

    useEffect(() => {
        fetch("/data/heroes_draft_data.json")
            .then(res => res.json())
            .then(data => setHeroes(data))
            .catch(err => console.error(err))
    }, []);

    return (
        <main>
            {/* Lane Selection */}
            <section className={style.laneSection}>
                <h3>Your Lane:</h3>
                <select
                    value={lane}
                    onChange={(e) => { setLane(e.target.value); console.log(lane) }}
                    className={style.laneSelect}
                >
                    <option value="">---  ---</option>
                    <option value="Gold Lane">Gold Lane</option>
                    <option value="Exp Lane">Exp Lane</option>
                    <option value="Mid Lane">Mid Lane</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Roam">Roam</option>
                </select>
            </section>

            {/* Draft Panels */}
            <section>
                <DraftPanel title="Bans" slots={10} openPopUp={openPopUp} />
                <DraftPanel title="Allies" slots={5} openPopUp={openPopUp} />
                <DraftPanel title="Enemies" slots={5} openPopUp={openPopUp} />
            </section>

            {/* Suggestions */}
            <section>
                <SuggestionPanel />
                <button className="btn" onClick={openPopUp}>Apri Modal</button>
            </section>

            {/* HeroSearchModal component */}
            <HeroSearchModal
                isOpen={isOpen}
                closePopUp={closePopUp}
            />
        </main >
    )
}