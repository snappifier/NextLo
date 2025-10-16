"use client"

import { useMemo, useEffect, useState } from "react";

const badges = {
    Dyrektor: "bg-red-100 text-red-700",
    Wicedyrektor: "bg-yellow-100 text-yellow-800",
    Nauczyciel: "bg-green-100 text-green-700",
    PedagogSpecjalny: "bg-blue-100 text-blue-700",
    PedagogSzkolny: "bg-blue-100 text-blue-700",
    PsychologSzkolny: "bg-blue-100 text-blue-700",
    Biblioteka: "bg-green-100 text-green-700",
};

const przedmioty = [
    "Język polski",
    "Język angielski",
    "Język francuski",
    "Język hiszpański",
    "Język niemiecki",
    "Język rosyjski",
    "Język łaciński",
    "Historia",
    "Edukacja obywatelska",
    "Wiedza o społeczeństwie",
    "Geografia",
    "Biologia",
    "Matematyka",
    "Fizyka",
    "Chemia",
    "Edukacja dla bezpieczeństwa",
    "Biznes i zarządzanie",
    "Informatyka",
    "Doradztwo zawodowe",
    "Wychowanie fizyczne",
    "Religia",
    "Muzyka",
    "Pedagog specjalny",
    "Pedagog szkolny",
    "Psycholog szkolny",
    "Edukacja zdrowotna",
    "Biblioteka",
];

const ORDER_EXTRA_FIRST = ["Dyrekcja"];
const ORDER_EXTRA_LAST = ["Inne"];

const slug = (s) =>
    String(s)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

const getGroupKeys = (p) => {
    const keys = [];
    const raw = (p["Przedmiot"] ?? "").trim();
    const subjects = raw ? raw.split(/[;,/]/).map((s) => s.trim()).filter(Boolean) : [];

    if (p["Funkcja"] === "Dyrektor" || p["Funkcja"] === "Wicedyrektor") {
        keys.push("Dyrekcja");
    }
    keys.push(...subjects);

    if (keys.length === 0) keys.push("Inne");
    return Array.from(new Set(keys));
};

const sortPL = (a, b) => a.localeCompare(b, "pl", { sensitivity: "base" });

const Card = ({ profil }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="bg-white w-full rounded-lg overflow-hidden shadow-sm ring-1 ring-black/5 transition-transform duration-200 cursor-pointer"
            style={{
                transform: isHovered ? "translateY(-4px)" : "translateY(0)"
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-3 sm:p-4">
                <h4 className="text-slate-900 text-base sm:text-[15px] font-[poppins] font-medium leading-tight ">
                    {profil["Tytul"] && `${profil["Tytul"]} `}
                    {profil["ImieNazwisko"]}
                </h4>
                {profil["Przedmiot"] && (
                    <p className="text-slate-600 text-xs mt-1 font-[poppins] line-clamp-2">{profil["Przedmiot"]}</p>
                )}
                {profil["Funkcja"] && (
                    <span
                        className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-[11px] sm:text-xs font-medium ${
                            badges[profil["Funkcja"]] ?? "bg-slate-100 text-slate-700"
                        }`}
                    >
                        {profil["Funkcja"]}
                    </span>
                )}
            </div>
        </div>
    );
};

const Section = ({ title, items }) => {
    if (!items || items.length === 0) return null;

    return (
        <section id={slug(title)} className="mb-10 sm:mb-12 scroll-mt-32 md:scroll-mt-36">
            <h2 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {items.map((p) => (
                    <Card key={p.id} profil={p} />
                ))}
            </div>
        </section>
    );
};

const RightRail = ({ items, activeId, onJump }) => {
    if (items.length === 0) return null;

    return (
        <aside className="hidden xl:block sticky top-28 self-start ml-20 w-60">
            <nav className="space-y-[0.5]" aria-label="Lista sekcji">
                {items.map(({ title, id }) => {
                    const isActive = activeId === id;
                    const [isHovered, setIsHovered] = useState(false);

                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => onJump(id)}
                            aria-current={isActive ? "page" : "false"}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className="group relative block w-full text-left px-2 py-[0.5] rounded-md outline-none transition-all duration-200"
                            style={{
                                transform: isHovered ? "scale(1.03) translateX(2px)" : "scale(1) translateX(0)"
                            }}
                        >
                            <span
                                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] transition-all duration-200 ${
                                    isActive
                                        ? "w-6 bg-[#3077BA]"
                                        : "w-3 bg-slate-300 group-hover:w-6 group-hover:bg-slate-400"
                                }`}
                            />
                            <span
                                className={`ml-4 text-sm font-[poppins] transition-colors duration-200 ${
                                    isActive ? "text-slate-900 font-medium" : "text-slate-600 group-hover:text-slate-800"
                                }`}
                            >
                                {title}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

const TopChips = ({ items, activeId, onJump }) => {
    if (items.length === 0) return null;

    return (
        <div id="top-chips" className="xl:hidden sticky top-20 md:top-20 z-30 -mt-2 mb-4 sm:mb-6 bg-white">
            <div className="flex gap-2 overflow-x-auto px-1 py-1.5 scrollbar-none">
                {items.map(({ title, id }) => {
                    const isActive = activeId === id;
                    const [isHovered, setIsHovered] = useState(false);

                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => onJump(id)}
                            aria-current={isActive ? "page" : "false"}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-[poppins] transition-all duration-200 bg-[#f7f7f7] ${
                                isActive
                                    ? "border-[#3077BA] text-[#3077BA]"
                                    : "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-800"
                            }`}
                            style={{
                                transform: isHovered ? "scale(1.05)" : "scale(1)"
                            }}
                        >
                            {title}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};



const Kadra = ({ kadra }) => {
    const [validKadra, setValidKadra] = useState([]);

    // Walidacja i oczyszczenie danych
    useEffect(() => {
        if (Array.isArray(kadra)) {
            const cleaned = kadra.filter(p => p && p.ImieNazwisko);
            setValidKadra(cleaned);
        }
    }, [kadra]);

    const groups = useMemo(() => {
        const acc = {};
        for (const p of validKadra) {
            const keys = getGroupKeys(p);
            for (const k of keys) {
                (acc[k] ??= []).push(p);
            }
        }
        for (const k of Object.keys(acc)) {
            acc[k].sort((a, b) => sortPL(a["ImieNazwisko"] ?? "", b["ImieNazwisko"] ?? ""));
        }
        return acc;
    }, [validKadra]);

    const sectionOrder = useMemo(() => {
        const existing = Object.keys(groups);
        const preferred = [...ORDER_EXTRA_FIRST, ...przedmioty, ...ORDER_EXTRA_LAST].filter((k) =>
            existing.includes(k)
        );
        const leftovers = existing.filter((k) => !preferred.includes(k)).sort(sortPL);
        return [
            ...ORDER_EXTRA_FIRST.filter((k) => preferred.includes(k)),
            ...przedmioty.filter((k) => preferred.includes(k)),
            ...leftovers,
            ...ORDER_EXTRA_LAST.filter((k) => preferred.includes(k)),
        ];
    }, [groups]);

    const sectionIds = useMemo(
        () => sectionOrder.map((title) => ({ title, id: slug(title) })),
        [sectionOrder]
    );

    const [active, setActive] = useState(null);

    useEffect(() => {
        if (!sectionIds.length) return;

        const getTopOffset = () => {
            let offset = 0;
            const header = document.querySelector("header.fixed");
            if (header) offset += header.getBoundingClientRect().height;
            const chips = document.getElementById("top-chips");
            if (chips && getComputedStyle(chips).position === "sticky") {
                offset += chips.getBoundingClientRect().height;
            }
            return Math.round(offset + 8);
        };

        const sections = sectionIds
            .map(({ id }) => document.getElementById(id))
            .filter(Boolean);

        let frame = 0;

        const updateActive = () => {
            const offset = getTopOffset();
            const vh = window.innerHeight || 0;

            let currentId = sections[0]?.id ?? null;
            let bestTop = -Infinity;

            for (const el of sections) {
                const r = el.getBoundingClientRect();
                if (r.bottom <= 0 || r.top >= vh) continue;

                if (r.top <= offset + 1 && r.top > bestTop) {
                    bestTop = r.top;
                    currentId = el.id;
                }
            }

            if (bestTop === -Infinity && sections[0]) {
                currentId = sections[0].id;
            }

            setActive((prev) => (prev === currentId ? prev : currentId));
        };

        const onScroll = () => {
            if (frame) cancelAnimationFrame(frame);
            frame = requestAnimationFrame(updateActive);
        };

        updateActive();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            if (frame) cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [sectionIds]);

    const handleJump = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    if (!validKadra.length) {
        return (
            <div className="w-full pt-36 text-center text-slate-500">
                Brak danych o kadrze nauczycielskiej
            </div>
        );
    }

    return (
        <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] grid grid-cols-1 xl:grid-cols-[1fr_18rem] gap-6 md:gap-8">
                <main>
                    <div className="w-full flex flex-col mb-4 sm:mb-6">
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight w-max">
                            Kadra nauczycielska
                        </p>
                    </div>

                    <TopChips items={sectionIds} activeId={active} onJump={handleJump} />

                    {sectionOrder.map((section) => (
                        <Section key={section} title={section} items={groups[section] ?? []} />
                    ))}
                </main>

                <RightRail items={sectionIds} activeId={active} onJump={handleJump} />
            </div>
        </div>
    );
};

export default Kadra;