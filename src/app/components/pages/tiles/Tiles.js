'use client'

import {useMemo, useState} from "react"
import Section from "./Section"
import MobileNavigation from "./MobileNavigation"
import {DesktopNavAccordion, DesktopNavOthers} from "./DesktopNavigation"
import ActiveSectionScroll from "./ActiveSectionScroll"
import {slug, sortPL} from "./Utils"
import ExpandableGroup from "@/app/components/pages/tiles/ExpandableGroup";

const Tiles = ({dataKafelki}) => {

    const [openGroups, setOpenGroups] = useState({})
    const hasGroups = Boolean(dataKafelki?.Szablon?.Grupy?.length)

    const groupedData = useMemo(() => {
        if (!hasGroups) return []

        return dataKafelki?.Szablon?.Grupy || []
    }, [dataKafelki, hasGroups])

    const allSectionsFromGroups = useMemo(() => {
        if (!hasGroups) return []
        const showGroup = dataKafelki?.Szablon?.NazwaGrup;
        return groupedData.reduce((acc, group) => {
            const groupName = group.NaglowekGrupy;
            acc[groupName] = group.ElementGrupy?.map((element) => ({
                title: element.Naglowek,
                id: slug(`${groupName} ${element.Naglowek}`),
                kafelki: element.Kafelki || [],
                showGroup: showGroup,
            })) || [];

            return acc; // To mapa z ("Nazwa grupy") -> Elementy
        }, {});
    }, [groupedData, hasGroups])

    const legacyGroups = useMemo(() => {
        if (hasGroups) return {}
        const templates = dataKafelki?.Sekcja?.Szablon || []
        const acc = {}
        for (const p of templates) {
            const raw = (p["Naglowek"] ?? "").trim()
            const subjects = raw ? raw.split(/[;,/]/).map((s) => s.trim()).filter(Boolean) : ["Inne"]
            for (const k of subjects) {
                (acc[k] ??= []).push(p)
            }
        }
        return acc
    }, [dataKafelki, hasGroups])

    const legacySectionOrder = useMemo(() => {
        if (hasGroups) return []
        return Object.keys(legacyGroups).sort(sortPL)
    }, [legacyGroups, hasGroups])

    const sectionIds = useMemo(() => {
        if (hasGroups) {
            return Object.values(allSectionsFromGroups)
                .flat()
                .map(({title, id}) => ({title, id}));
        }
        return legacySectionOrder.map((title) => ({title, id: slug(title)}))
    }, [hasGroups, allSectionsFromGroups, legacySectionOrder])

    const active = ActiveSectionScroll(sectionIds)

    const mobileNavItems = useMemo(() => {
        if (!hasGroups) return sectionIds;

        return Object.entries(allSectionsFromGroups).map(([groupName, sections]) => ({
            title: groupName,
            id: sections[0]?.id
        }));
    }, [hasGroups, sectionIds, allSectionsFromGroups]);

    const activeMobileId = useMemo(() => {
        if (!hasGroups) return active;
        if (!active) return null;

        for (const sections of Object.values(allSectionsFromGroups)) {
            const isElementInThisGroup = sections.some(s => s.id === active);

            if (isElementInThisGroup) {
                return sections[0]?.id;
            }
        }
        return null;
    }, [active, hasGroups, allSectionsFromGroups]);

    const toggleGroup = (groupName) => {
        setOpenGroups(prev => ({
            ...prev,
            [groupName]: !prev[groupName]
        }))
    }
    const handleJump = (id) => {
        let targetGroupName = null;

        if (hasGroups) {
            for (const [groupName, sections] of Object.entries(allSectionsFromGroups)) {
                if (sections.some(s => s.id === id)) {
                    targetGroupName = groupName;
                    break;
                }
            }
        }
        if (targetGroupName && !openGroups[targetGroupName]) {
            setOpenGroups(prev => ({ ...prev, [targetGroupName]: true }));
            setTimeout(() => {
                const el = document.getElementById(id)
                if (el) el.scrollIntoView({behavior: "smooth", block: "start"})
            }, 100)
        } else {
            const el = document.getElementById(id)
            if (el) el.scrollIntoView({behavior: "smooth", block: "start"})
        }
    }

    // const handleJump = (id) => {
    //     const el = document.getElementById(id)
    //     if (!el) return
    //     el.scrollIntoView({behavior: "smooth", block: "start"})
    // }

    const pageTitle = hasGroups ? dataKafelki?.Szablon?.Tytul || "Tiles" : dataKafelki?.Sekcja?.Tytul || "Tiles"

    if (sectionIds.length === 0) {
        return (
          <div className="w-full pt-36 text-center text-slate-500">
              Brak danych do wyświetlenia
          </div>
        )
    }

    const showGroup = dataKafelki?.Szablon?.NazwaGrup;

    return (
      <div className="w-full min-h-screen pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center">
          <div className="w-[92%] sm:w-[90%] lg:w-[80%] grid grid-cols-1 xl:grid-cols-[1fr_18rem] gap-6 md:gap-8">
              <main>
                  <div className="w-full flex flex-col mb-4 sm:mb-6">
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight w-max">
                          {pageTitle}
                      </p>
                  </div>

                  <MobileNavigation items={mobileNavItems} active={activeMobileId} onJump={handleJump}/>

                  {hasGroups ? (
                      Object.entries(allSectionsFromGroups).map(([groupName, sections]) => (
                          <ExpandableGroup
                              key={groupName}
                              groupName={groupName}
                              sections={sections}
                              isOpen={!!openGroups[groupName]}
                              onToggle={() => toggleGroup(groupName)}
                          />
                      ))
                  ) : (
                    legacySectionOrder.map((title) => {
                        const items = legacyGroups[title] || []
                        const flatItems = items.flatMap((item) => item["Kafelki"] || [item])

                        return (
                          <Section key={title} title={title} items={flatItems} id={slug(title)} />
                        )
                    })
                  )}
              </main>
              {!showGroup && (
              (hasGroups) ? ( <DesktopNavAccordion groupedData={groupedData} activeId={active} onJump={handleJump}/>
              ) : (
                <DesktopNavOthers items={sectionIds} activeId={active} onJump={handleJump}/>
              )
              )}
          </div>
      </div>
    )
}

export default Tiles