import { strapiFetch } from "@/app/lib/strapi";
import ShieldsNew from "@/app/home/collaborations/ShieldsNew";

async function getTarcze() {
	const json = await strapiFetch("/api/strona-glowna-szablon?populate[Kolejnosc][on][home.osiagniecia][populate][Tarcza][populate]=*&populate[Kolejnosc][on][home.osiagniecia][populate][Wspolprace][populate]=*");
	return json?.data ?? {};
}

export default async function Shields() {
	const data = await getTarcze()
	const osiagniecia = data["Kolejnosc"][0]

	return <ShieldsNew data={osiagniecia} />
}