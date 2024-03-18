import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<div className="py-12 px-3 max-w-7xl mx-auto">
				<div className="space-y-8 w-3/4">
					<h1 className="text-5xl sm:text-6xl font-bold">
						Keep Your Digital Files with FileKeeper
					</h1>
					<p className="text-balance text-gray-500">
						Welcome to FileKeeper: Your Fortress of Digital
						Security. Safeguard your files with confidence, knowing
						they're protected in our encrypted vault. Experience
						seamless storage and effortless access to your data,
						anytime, anywhere. Join us and take control of your
						digital world today.
					</p>
					<Button>
						<Link
							href="/dashboard"
							className="flex items-center text-white"
						>
							Try it out!
							<ArrowRight className="ml-2" />
						</Link>
					</Button>
				</div>
			</div>
			<div className="flex-grow bg-[#3B82F6]">
				<div className="relative h-screen">
					<Image
						src="/hero_keep.webp"
						alt="Vadim Ghedreutan"
						fill
						sizes="100vw"
						priority
						className="object-contain px-10 py-10"
					/>
				</div>
			</div>
		</div>
	)
}
