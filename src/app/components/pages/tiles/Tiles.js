'use client'

import {useMemo} from "react"
import Section from "./Section"
import MobileNavigation from "./MobileNavigation"
import {DesktopNavAccordion} from "./DesktopNavigation"
import ActiveSectionScroll from "./ActiveSectionScroll"
import {slug} from "./Utils"

const Tiles = ({dataKafelki}) => {
    const groupedData = useMemo(() => {
        return dataKafelki?.Szablon?.Grupy || []
    }, [dataKafelki])

    const allSections = useMemo(() => {
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
    }, [groupedData])

    const sectionIds = useMemo(() => {
        return allSections.map(({title, id}) => ({title, id}))
    }, [allSections])

    const active = ActiveSectionScroll(sectionIds)

    const handleJump = (id) => {
        const el = document.getElementById(id)
        if (!el) return
        el.scrollIntoView({behavior: "smooth", block: "start"})
    }

    const pageTitle = dataKafelki?.Szablon?.Tytul || "Tiles"

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

                    <MobileNavigation items={sectionIds} activeId={active} onJump={handleJump} />

                    {allSections.map((section) => (<Section key={section.id} title={section.title} items={section.kafelki} />))}
              </main>

                <DesktopNavAccordion groupedData={groupedData} activeId={active} onJump={handleJump} />
          </div>
      </div>
    )
}

export default Tiles