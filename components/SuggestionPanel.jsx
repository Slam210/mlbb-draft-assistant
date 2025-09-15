"use client"
import style from "@/styles/DraftPage.module.css";
import { calculateSuggestion } from "@/lib/draftLogic";

export default function SuggestionPanel({ heroes, bans, allies, enemies, pickedLane }) {
    const suggestions = calculateSuggestion({ allies, enemies, bans, pickedLane }, heroes)

    if (!pickedLane) return <p>Please select your Lane first</p>
    if (!suggestions) return <p>No suggestion yet</p>

    return (
        <div className={style.suggestionPanel}>
            <p>Suggestions for <strong>{pickedLane}</strong></p>
            <div className={style.suggestedHeroes}>
                {suggestions.map(hero => {
                    const formattedScore = hero.score > 0 ? `+${hero.score}` : hero.score;
                    return (
                        <div key={hero.heroId} className={style.suggestedHero}>
                            <img src={heroes[hero.heroId - 1].icons.round} alt={heroes[hero.heroId - 1].name} />
                            <div className={style.heroDescription}>
                                <p>{heroes[hero.heroId - 1].name}</p>
                                <ul>
                                    {hero.reasons.map((reason, i) => (
                                        <li key={i}>{reason}</li>
                                    ))}
                                </ul>
                            </div>
                            <p className={style.heroScore}>{formattedScore}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}