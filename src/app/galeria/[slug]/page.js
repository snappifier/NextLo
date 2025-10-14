import {strapiFetch} from "@/app/lib/strapi";
import Link from "next/link";
import GalleryAutoMasonry from "./galeria"

async function getEvents() {
    const json = await strapiFetch("/api/galeria?populate[Zakladki][populate][Wydarzenia][populate]=*");
    return json?.data ?? {};
}

export default async function Page() {
    const data = await getEvents();
    console.log(data)
    const events = data["Zakladki"][0]["Wydarzenia"];
    console.log(events);

    return <div className="w-full pt-36 md:pt-40 pb-16 md:pb-20 flex flex-col items-center min-h-[80vh]">
        <div className="w-[92%] sm:w-[90%] lg:w-[80%] flex ">
            <div className="w-max h-max flex flex-col">
                {/*{events.map((item) => {*/}
                {/*    const slug = item["TytulWydarzenia"];*/}
                {/*    return <Link href={`/galeria/${slug}`}>*/}
                {/*        <p>{item["TytulWydarzenia"]}</p>*/}
                {/*    </Link>*/}
                {/*})}*/}
                <GalleryAutoMasonry items={events[0]["Zdjecia"]} />
            </div>
        </div>
    </div>
}