import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="min-h-dvh grid place-items-center p-8 text-center">
			<div>
				<h1 className="text-2xl font-semibold">Ta strona jest w trakcie tworzenia.</h1>
				<Link href="/" className="mt-4 inline-block underline">
					Wróć na stronę główną
				</Link>
			</div>
		</main>
	);
}