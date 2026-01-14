'use client'

import {useMemo} from "react"
import Section from "./Section"
import MobileNavigation from "./MobileNavigation"
import {DesktopNavAccordion, DesktopNavOthers} from "./DesktopNavigation"
import ActiveSectionScroll from "./ActiveSectionScroll"
import {slug, sortPL} from "./Utils"

const Tiles = ({dataKafelki}) => {
    const hasGroups = Boolean(dataKafelki?.Szablon?.Grupy?.length)

    const groupedData = useMemo(() => {
        if (!hasGroups) return []

        return dataKafelki?.Szablon?.Grupy || []
    }, [dataKafelki, hasGroups])

    const allSectionsFromGroups = useMemo(() => {
        if (!hasGroups) return []
        const sections = []
        groupedData.forEach((group) => {
            group.ElementGrupy?.forEach((element) => {
                sections.push({
                    title: element.Naglowek,
                    id: slug(element.Naglowek),
                    kafelki: element.Kafelki || [],
                })
            })
        })
        return sections
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
            return allSectionsFromGroups.map(({title, id}) => ({title, id}))
        }
        return legacySectionOrder.map((title) => ({title, id: slug(title)}))
    }, [hasGroups, allSectionsFromGroups, legacySectionOrder])

    const active = ActiveSectionScroll(sectionIds)

    const handleJump = (id) => {
        const el = document.getElementById(id)
        if (!el) return
        el.scrollIntoView({behavior: "smooth", block: "start"})
    }

    const pageTitle = hasGroups ? dataKafelki?.Szablon?.Tytul || "Tiles" : dataKafelki?.Sekcja?.Tytul || "Tiles"

    if (sectionIds.length === 0) {
        return (
          <div className="w-full pt-36 text-center text-slate-500">
              Brak danych do wyświetlenia
          </div>
        )
    }

    return (
      <div className="w-full min-h-screen pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center">
          <div className="w-[92%] sm:w-[90%] lg:w-[80%] grid grid-cols-1 xl:grid-cols-[1fr_18rem] gap-6 md:gap-8">
              <main>
                  <div className="w-full flex flex-col mb-4 sm:mb-6">
                      <p className="text-3xl sm:text-4xl lg:text-5xl font-extralight w-max">
                          {pageTitle}
                      </p>
                  </div>

                  <MobileNavigation items={sectionIds} active={active} onJump={handleJump}/>

                  {hasGroups ? (
                    allSectionsFromGroups.map((section) => (
                      <Section key={section.id} title={section.title} items={section.kafelki}/>
                    ))
                  ) : (
                    legacySectionOrder.map((title) => {
                        const items = legacyGroups[title] || []
                        const flatItems = items.flatMap((item) => item["Kafelki"] || [item])

                        return (
                          <Section key={title} title={title} items={flatItems} />
                        )
                    })
                  )}
              </main>

              {hasGroups ? ( <DesktopNavAccordion groupedData={groupedData} activeId={active} onJump={handleJump}/>
              ) : (
                <DesktopNavOthers items={sectionIds} activeId={active} onJump={handleJump}/>
              )}
          </div>
      </div>
    )
}

export default Tiles