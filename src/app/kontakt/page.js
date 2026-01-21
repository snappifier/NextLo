import {strapiFetch} from "@/app/lib/strapi"
import ContactClient from "./ContactClient"

async function getData() {
	const populateObj = {
		populate: "*",
	}

	return await strapiFetch("/api/kontakt", {
		query: populateObj,
	})
}

export default async function Page() {
	const data = await getData()
	const contactData = data.data

	return <ContactClient contactData={contactData} />
}