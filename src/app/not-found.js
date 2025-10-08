import Link from 'next/link';

export default function NotFound() {
	return (
		<main className="min-h-dvh grid place-items-center p-8 text-center">
			<div>
				<h1 className="text-2xl font-semibold">Ups... coś poszło nie tak</h1>
				<p className="mt-2 text-muted-foreground">Ta strona nie istnieje.</p>
				<Link href="/" className="mt-4 inline-block underline">
					Wróć na stronę główną
				</Link>
			</div>
		</main>
	);
}