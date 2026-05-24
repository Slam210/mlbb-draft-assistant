"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/src/lib/supabase/supabase";

const ROLES = ["Tank", "Fighter", "Assassin", "Mage", "Marksman", "Support"];
const LANES = ["Gold Lane", "Mid Lane", "Exp Lane", "Jungle", "Roam"];

/* ---------------- UI COMPONENTS ---------------- */

function Section({ title, children }) {
    return (
        <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            {children}
        </div>
    );
}

function CheckChip({ label, checked, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`px-3 py-1 rounded border text-sm transition ${checked ? "bg-blue-600 border-blue-600" : "bg-gray-900 border-gray-700"
                }`}
        >
            {label}
        </button>
    );
}

export default function HeroEditor() {
    const [index, setIndex] = useState(0);
    const [heroes, setHeroes] = useState([]);
    const hero = heroes[index];
    const [search, setSearch] = useState("");
    const [heroSearch, setheroSearch] = useState("");
    const [saving, setSaving] = useState(false);


    const loadHeroes = async () => {
        const { data, error } = await supabase
            .from("heroes")
            .select("*")
            .order("id", { ascending: true });

        if (error) {
            console.error("Supabase error:", error);
            return;
        }

        setHeroes(data);
    };

    useEffect(() => {
        loadHeroes();
    }, []);


    function updateHero(field, value) {
        const copy = [...heroes];
        copy[index] = { ...copy[index], [field]: value };
        setHeroes(copy);
    }

    function toggleArray(field, value) {
        const arr = hero[field] || [];
        const exists = arr.includes(value);

        const newArr = exists ? arr.filter((x) => x !== value) : [...arr, value];

        updateHero(field, newArr);
    }

    async function saveData() {
        try {
            setSaving(true);

            const { error } = await supabase
                .from("heroes")
                .upsert(heroes, {
                    onConflict: "id",
                });

            if (error) {
                console.error(error);
                alert("Failed to save.");
                return;
            }

            alert("Saved successfully.");
        } catch (err) {
            console.error(err);
            alert("Unexpected error.");
        } finally {
            setSaving(false);
        }
    }

    function nextHero() {
        setIndex((i) => Math.min(i + 1, heroes.length - 1));
    }

    function prevHero() {
        setIndex((i) => Math.max(i - 1, 0));
    }

    if (!Array.isArray(heroes) || heroes.length === 0) {
        return <div className="p-6 text-white">Loading your heroes...</div>;
    }

    function toggleRelationship(type, targetId) {
        const copy = [...heroes];

        const currentHero = copy[index];
        const targetHeroIndex = copy.findIndex((h) => h.id === targetId);

        if (targetHeroIndex === -1) return;

        const targetHero = copy[targetHeroIndex];

        // COUNTERS
        if (type === "counter") {
            const counters = currentHero.counters || [];
            const counteredBy = targetHero.countered_by || [];

            const exists = counters.includes(targetId);

            currentHero.counters = exists
                ? counters.filter((id) => id !== targetId)
                : [...counters, targetId];

            targetHero.countered_by = exists
                ? counteredBy.filter((id) => id !== currentHero.id)
                : [...counteredBy, currentHero.id];
        }

        // COUNTER_BY
        if (type === "counter_by") {
            const counters = targetHero.counters || [];
            const counteredBy = currentHero.countered_by || [];

            const exists = counters.includes(currentHero.id);

            targetHero.counters = exists
                ? counters.filter((id) => id !== currentHero.id)
                : [...counters, currentHero.id];

            currentHero.countered_by = exists
                ? counteredBy.filter((id) => id !== targetHero.id)
                : [...counteredBy, targetHero.id];
        }

        // SYNERGY
        if (type === "synergy") {
            const current = currentHero.synergy || [];
            const target = targetHero.synergy || [];

            const exists = current.includes(targetId);

            currentHero.synergy = exists
                ? current.filter((id) => id !== targetId)
                : [...current, targetId];

            targetHero.synergy = exists
                ? target.filter((id) => id !== currentHero.id)
                : [...target, currentHero.id];
        }

        // ANTI SYNERGY
        if (type === "anti") {
            const current = currentHero.anti_synergy || [];
            const target = targetHero.anti_synergy || [];

            const exists = current.includes(targetId);

            currentHero.anti_synergy = exists
                ? current.filter((id) => id !== targetId)
                : [...current, targetId];

            targetHero.anti_synergy = exists
                ? target.filter((id) => id !== currentHero.id)
                : [...target, currentHero.id];
        }

        setHeroes(copy);
    }

    return (
        <div className="flex h-screen bg-gray-950 text-white rounded p-4">
            {/* SIDEBAR */}
            <div className="w-64 border-r border-gray-800 overflow-y-auto scrollbar-none p-2">
                <div className="p-3 font-bold border-b border-gray-800 text-xl">Heroes</div>
                <input
                    type="text"
                    placeholder="Search heroes..."
                    value={heroSearch}
                    onChange={(e) => setheroSearch(e.target.value)}
                    className="w-full mb-4 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
                />
                {heroes.filter((h) =>
                    h.name.toLowerCase().includes(heroSearch.toLowerCase())).map((hero, i) => (
                        <div
                            key={hero.id}
                            onClick={() => setIndex(i)}
                            className={`p-3 cursor-pointer hover:bg-gray-800 ${i === index ? "bg-gray-800" : ""
                                }`}
                        >
                            <div className="font-semibold text-large">{hero.name}</div>
                        </div>
                    ))}
            </div>

            {/* MAIN */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-none">
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-6">
                    <img
                        src={hero.icons?.round}
                        alt={hero.name}
                        className="w-16 h-16 rounded-full"
                    />

                    <div>
                        <h1 className="text-2xl font-bold">{hero.name}</h1>
                        <p className="text-gray-400">ID: {hero.id}</p>
                    </div>
                </div>

                {/* ROLES */}
                <Section title="Role">
                    <div className="flex flex-wrap gap-3">
                        {ROLES.map((role) => (
                            <CheckChip
                                key={role}
                                label={role}
                                checked={hero.role?.includes(role)}
                                onClick={() => toggleArray("role", role)}
                            />
                        ))}
                    </div>
                </Section>

                {/* LANES */}
                <Section title="Lane">
                    <div className="flex flex-wrap gap-3">
                        {LANES.map((lane) => (
                            <CheckChip
                                key={lane}
                                label={lane}
                                checked={hero.lane?.includes(lane)}
                                onClick={() => toggleArray("lane", lane)}
                            />
                        ))}
                    </div>
                </Section>

                {/* NAV */}
                <div className="flex gap-3 mt-8">
                    <button onClick={prevHero} className="px-4 py-2 bg-gray-800 rounded">
                        Prev
                    </button>

                    <button onClick={nextHero} className="px-4 py-2 bg-gray-800 rounded">
                        Next
                    </button>

                    <button
                        onClick={saveData}
                        className="px-4 py-2 bg-blue-600 rounded"
                    >
                        Save
                    </button>
                </div>

                {/* RELATIONSHIPS */}
                <Section title="Relationships">
                    <input
                        type="text"
                        placeholder="Search heroes..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full mb-4 bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm"
                    />
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
                        {heroes
                            .filter((h) => h.id !== hero.id)
                            .filter((h) =>
                                h.name.toLowerCase().includes(search.toLowerCase())
                            ).map((targetHero) => {
                                const isCounter =
                                    hero.counters?.includes(targetHero.id);

                                const isCounteredBy =
                                    hero.countered_by?.includes(targetHero.id);

                                const isSynergy =
                                    hero.synergy?.includes(targetHero.id);

                                const isAnti =
                                    hero.anti_synergy?.includes(targetHero.id);

                                return (
                                    <div
                                        key={targetHero.id}
                                        className="bg-gray-900 rounded p-2 border border-gray-700"
                                    >
                                        <img
                                            src={targetHero.icons?.rectangle}
                                            alt={targetHero.name}
                                            className="w-96 rounded mb-2"
                                        />

                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                            <button
                                                onClick={() =>
                                                    toggleRelationship(
                                                        "counter",
                                                        targetHero.id
                                                    )
                                                }
                                                className={`p-1 rounded ${isCounter
                                                    ? "bg-red-600"
                                                    : "bg-gray-800"
                                                    }`}
                                            >
                                                Counter
                                            </button>

                                            <button
                                                onClick={() =>
                                                    toggleRelationship("counter_by", targetHero.id)
                                                }
                                                className={`p-1 rounded text-center ${isCounteredBy ? "bg-orange-600" : "bg-gray-800"
                                                    }`}
                                            >
                                                C.By
                                            </button>

                                            <button
                                                onClick={() =>
                                                    toggleRelationship(
                                                        "synergy",
                                                        targetHero.id
                                                    )
                                                }
                                                className={`p-1 rounded ${isSynergy
                                                    ? "bg-green-600"
                                                    : "bg-gray-800"
                                                    }`}
                                            >
                                                Synergy
                                            </button>

                                            <button
                                                onClick={() =>
                                                    toggleRelationship(
                                                        "anti",
                                                        targetHero.id
                                                    )
                                                }
                                                className={`p-1 rounded ${isAnti
                                                    ? "bg-purple-600"
                                                    : "bg-gray-800"
                                                    }`}
                                            >
                                                Anti
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </Section>
            </div>
            {saving && (
                <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                        <div className="text-white text-lg font-semibold">
                            Saving...
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}