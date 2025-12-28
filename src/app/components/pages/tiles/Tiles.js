"use client"

import { motion } from "motion/react";
import { useMemo, useEffect, useState } from "react";

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
    const raw = (p["Naglowek"] ?? "").trim();
    const subjects = raw ? raw.split(/[;,/]/).map((s) => s.trim()).filter(Boolean) : [];
    keys.push(...subjects);

    if (keys.length === 0) keys.push("Inne");
    return Array.from(new Set(keys));
};

const sortPL = (a, b) => a.localeCompare(b, "pl", { sensitivity: "base" });

const Card = ({ profil }) => (
    <motion.div
        key={profil.id}
        className="bg-white w-full rounded-lg overflow-hidden shadow-sm ring-1 ring-black/5"
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
        <div className="p-3 sm:p-4">
            <h4 className="text-slate-900 text-base sm:text-[15px] font-[poppins] font-medium leading-tight">
                {profil["ImieNazwisko"]}
            </h4>
            {profil["Opis"] && (
                <p className="text-slate-600 text-xs mt-1 font-[poppins]">{profil["Opis"]}</p>
            )}
            {profil["przypinki"]?.[0] && (
                <span
                    className={`mt-2 inline-flex items-center rounded-md px-2 py-1 text-[11px] sm:text-xs font-medium`}
                    style={{color: profil["przypinki"][0]["KolorTekstu"],
                        backgroundColor: profil["przypinki"][0]["Kolor"],
                    }}
                >
          {profil["przypinki"][0]["Funkcja"]}
        </span>
            )}
        </div>
    </motion.div>
);

const Section = ({ title, items }) => (
    <section id={slug(title)} className="mb-10 sm:mb-12 scroll-mt-32 md:scroll-mt-36">
        <h2 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {items[0]["Kafeleki"].map((p) => {
                return <Card key={p.id} profil={p}/>
            })}
        </div>
    </section>
);

const RightRail = ({ items, activeId, onJump }) => (
    <aside className="hidden xl:block sticky top-28 self-start ml-20 w-60">
        <nav className="space-y-[0.5]" aria-label="Lista przedmiotów">
            {items.map(({ title, id }) => {
                const isActive = activeId === id;
                return (
                    <motion.button
                        key={id}
                        type="button"
                        onClick={() => onJump(id)}
                        aria-current={isActive ? "true" : "false"}
                        whileHover={{ scale: 1.03, x: 2 }}
                        whileTap={{ scale: 0.98 }}
                        className="group relative block w-full text-left px-2 py-[0.5] rounded-md outline-none"
                    >
            <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-[2px] transition-all ${
                    isActive
                        ? "w-6 bg-[#3077BA]"
                        : "w-3 bg-slate-300 group-hover:w-6 group-hover:bg-slate-400"
                }`}
            />
                        <span
                            className={`ml-4 text-sm font-[poppins] transition-colors ${
                                isActive ? "text-slate-900 font-medium" : "text-slate-600 group-hover:text-slate-800"
                            }`}
                        >
              {title}
            </span>
                    </motion.button>
                );
            })}
        </nav>
    </aside>
);

const TopChips = ({ items, activeId, onJump }) => (
    <div id="top-chips" className="xl:hidden sticky top-20 md:top-20 lg:top-25 z-30 -mt-2 mb-4 sm:mb-6">
        <div className="flex gap-2 overflow-x-auto px-1 py-1.5 scrollbar-none">
            {items.map(({ title, id }) => {
                const isActive = activeId === id;
                return (
                    <motion.button
                        key={id}
                        type="button"
                        onClick={() => onJump(id)}
                        aria-current={isActive ? "true" : "false"}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-sm font-[poppins] transition bg-[#f7f7f7] ${
                            isActive
                                ? "border-[#3077BA] text-[#3077BA]"
                                : "border-slate-300 text-slate-600 hover:border-slate-400 hover:text-slate-800"
                        }`}
                    >
                        {title}
                    </motion.button>
                );
            })}
        </div>
    </div>
);

const Tiles = ({dataKafelki}) => {

    const groups = useMemo(() => {
        const acc = {};
        for (const p of dataKafelki["Sekcja"]["Szablon"]) {
            const keys = getGroupKeys(p);
            for (const k of keys) {
                (acc[k] ??= []).push(p);
            }
        }
        for (const k of Object.keys(acc)) {
            acc[k].sort((a, b) => sortPL(a["ImieNazwisko"] ?? "", b["ImieNazwisko"] ?? ""));
        }
        return acc;
    }, [dataKafelki]);

    const sectionOrder = useMemo(() => {
        return Object.keys(groups).sort(sortPL);
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

    return (
        <div className="w-full min-h-screen pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center">
            <div className="w-[92%] sm:w-[90%] lg:w-[80%] grid grid-cols-1 xl:grid-cols-[1fr_18rem] gap-6 md:gap-8">
                <main>
                    <div className="w-full flex flex-col mb-4 sm:mb-6">
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight w-max">
                            {dataKafelki["Sekcja"]["Tytul"]}
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

export default Tiles;