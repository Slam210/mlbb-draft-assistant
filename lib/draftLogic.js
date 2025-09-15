export function calculateSuggestion({ allies, enemies, bans, pickedLane }, heroes) {
    const results = []

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


    results.sort((a, b) => b.score - a.score);

    return results;
}

function addRelationship(results, heroId, score, reason) {
    // check if hero already exists in results
    const existing = results.find(r => r.heroId === heroId);

    if (existing) {
        // if found, update score
        existing.score += score;
        existing.reasons.push(reason);
    } else {
        // if not found, create new entry
        results.push({
            heroId: heroId,
            score: score,
            reasons: [reason]
        })
    }

}
