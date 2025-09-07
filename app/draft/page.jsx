"use client"
import { useState, useEffect } from "react";
import style from "@/styles/DraftPage.module.css";
import DraftPanel from "@/components/DraftPanel";
import SuggestionPanel from "@/components/SuggestionPanel";
import HeroSearchModal from "@/components/HeroSearchModal";

export default function DraftPage() {
    const [lane, setLane] = useState("");
    const [heroes, setHeroes] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [banSlots, setBanSlots] = useState(Array(10).fill(null));
    const [allySlots, setAllySlots] = useState(Array(5).fill(null));
    const [enemySlots, setEnemySlots] = useState(Array(5).fill(null));
    const setters = {
        bans: setBanSlots,
        allies: setAllySlots,
        enemies: setEnemySlots
    }

    const [selectedSlot, setSelectedSlot] = useState({ panel: null, index: null });

    useEffect(() => {
        fetch("/data/heroes_draft_data.json")
            .then(res => res.json())
            .then(data => setHeroes(data))
            .catch(err => console.error(err))
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
        if (!setter) {
            console.error("Unknown panel selected");
            return;
        }
        setter(prev => {
            const updated = [...prev];
            updated[index] = null;
            return updated;
        })
    }

    function handleSlotClick(panel, index) {
        setSelectedSlot({ panel, index })
        openPopUp();
    }

    function handleHeroSelect(heroId) {
        const { panel, index } = selectedSlot;
        const setter = setters[panel];
        if (!setter) return;

        setter(prev => {
            const updated = [...prev];
            updated[index] = heroId;
            return updated;
        });

        closePopUp();
    }

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
                <DraftPanel
                    title="bans"
                    handleSlotClick={handleSlotClick}
                    handleNullSlotClick={handleNullSlotClick}
                    slots={banSlots}
                    heroes={heroes}
                />
                <DraftPanel
                    title="allies"
                    handleSlotClick={handleSlotClick}
                    handleNullSlotClick={handleNullSlotClick}
                    slots={allySlots}
                    heroes={heroes}
                />
                <DraftPanel
                    title="enemies"
                    handleSlotClick={handleSlotClick}
                    handleNullSlotClick={handleNullSlotClick}
                    slots={enemySlots}
                    heroes={heroes}
                />
                <button className="btn" onClick={resetDraft}>Reset Draft</button>
            </section>

            {/* Suggestions */}
            <section>
                <SuggestionPanel />
            </section>

            {/* HeroSearchModal component */}
            <HeroSearchModal
                isModalOpen={isModalOpen}
                closePopUp={closePopUp}
                heroes={heroes}
                handleHeroSelect={handleHeroSelect}
            />
        </main >
    )
}