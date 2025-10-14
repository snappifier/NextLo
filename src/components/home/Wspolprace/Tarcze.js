import {strapiFetch} from "@/app/lib/strapi";
import TarczeClient from "@/components/home/Wspolprace/TarczeClient";

async function getTarcze() {
	const json = await strapiFetch("/api/strona-glowna-szablon?populate[Kolejnosc][on][home.osiagniecia][populate][Tarcze][populate]=*&populate[Kolejnosc][on][home.osiagniecia][populate][Wspolprace][populate]=*");
	return json?.data ?? {};
}

export default async function Tarcze() {
	const data = await getTarcze()

	const osiagniecia = data["Kolejnosc"][0]

	console.log(osiagniecia)
	return <TarczeClient data={osiagniecia} />
}