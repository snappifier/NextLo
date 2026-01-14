export const slug = (s) =>
	String(s)
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/[^a-z0-9\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-")

export const sortPL = (a, b) => a.localeCompare(b, "pl", {sensitivity: "base"})