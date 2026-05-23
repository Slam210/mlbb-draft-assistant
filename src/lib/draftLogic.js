export function calculateSuggestion({ allies, enemies, bans, pickedLane }, heroes) {
    const results = []

    // ENEMIES
    for (let i = 0; i < enemies.length; i++) {
        if (enemies[i] === null) continue;

        const enemy = enemies[i];
        const enemyCounters = heroes[enemy - 1].counters;
        const enemyCounteredBy = heroes[enemy - 1].counteredBy;

        for (let j = 0; j < enemyCounters.length; j++) {
            const candidateId = enemyCounters[j];
            const candidate = heroes[candidateId - 1]

            if (candidate.lane.includes(pickedLane)) {
                addRelationship(
                    results,
                    candidateId,
                    -1,
                    `Countered by ${heroes[enemy - 1].name}`
                );
            }
        }
        for (let j = 0; j < enemyCounteredBy.length; j++) {
            const candidateId = enemyCounteredBy[j];
            const candidate = heroes[candidateId - 1];

            if (candidate.lane.includes(pickedLane)) {
                addRelationship(
                    results,
                    candidateId,
                    +1,
                    `Counters ${heroes[enemy - 1].name}`);
            }
        }
    }

    // ALLIES
    for (let i = 0; i < allies.length; i++) {
        if (allies[i] === null) continue;

        const ally = allies[i];
        const allySynergy = heroes[ally - 1].synergy;

        // Good picks: synergy with ally
        for (let j = 0; j < allySynergy.length; j++) {
            const candidateId = allySynergy[j];
            const candidate = heroes[candidateId - 1];

            if (candidate.lane.includes(pickedLane)) {
                addRelationship(
                    results,
                    candidateId,
                    +0.1,
                    `Synergy with ${heroes[ally - 1].name}`
                );
            }
        }
    }

    // --- Filter ---
    const pickedIds = [
        ...allies.filter(Boolean),
        ...enemies.filter(Boolean),
        ...bans.filter(Boolean),
    ];

    const filteredResults = results.filter(r => !pickedIds.includes(r.heroId));

    filteredResults.sort((a, b) => b.score - a.score);

    return filteredResults;
}

function addRelationship(results, heroId, score, reason) {
    // check if hero already exists in results
    const existing = results.find(r => r.heroId === heroId);

    if (existing) {
        // if found, update score
        existing.score += score;

        score > 0
            ? existing.pros.push(reason)
            : existing.cons.push(reason)

    } else {
        // if not found, create new entry
        results.push({
            heroId: heroId,
            score: score,
            pros: (score > 0 ? [reason] : []),
            cons: (score < 0 ? [reason] : [])
        })
    }

}
