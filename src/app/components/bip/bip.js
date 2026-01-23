import Image from "next/image"
import Link from "next/link"

export default function Bip() {
	return (
		<Link href="http://bip.1lo.com.pl/" target="_blank" rel="noreferrer">
			<div className="fixed size-11 md:size-15 left-4.5 md:left-5 bottom-20 md:bottom-25 z-999 hover:scale-110 ease-out transition-all duration-300">
				<Image src="/bip.png" alt="BIP" width={250} height={290}/>
			</div>
		</Link>
	)
}