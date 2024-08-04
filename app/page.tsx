"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import React from "react"
import { useUser } from "@clerk/nextjs"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"

export default function Home() {
	const { user } = useUser()
	return (
		// <div className="overflow-hidden sm:py-12 sm:px-3 max-w-7xl mx-auto">
		// 	<MacbookScroll
		// 		title={
		// 			<div className="space-y-8">
		// 				<span>Keep Your Digital Files with FileKeeper</span>
		// 				<p className=" text-gray-500">
		// 					FileKeeper is a user-friendly tool designed to help
		// 					you securely store and manage your digital files.
		// 					Keep your documents, photos, and more organized and
		// 					easily accessible with FileKeeper's reliable storage
		// 					solutions.
		// 				</p>
		// 				<Button>
		// 					<Link
		// 						href="/dashboard"
		// 						className="flex items-center text-white"
		// 					>
		// 						{user ? "Go to Dashboard" : "Try it out!"}
		// 					</Link>
		// 				</Button>
		// 			</div>
		// 		}
		// 		src={`/hero_keep.webp`}
		// 		showGradient={false}
		// 	/>
		// </div>

		<div className="flex flex-col">
			<ContainerScroll
				titleComponent={
					<>
						<h1 className="text-4xl md:text-[5rem] font-bold text-black dark:text-white leading-none">
							Store Digital Files
							<br />
						</h1>
						<p className="dark:text-gray-500 text-neutral-500 md:text-4xl text-lg font-semibold mb-20 text-pretty">
							FileKeeper is a user-friendly tool designed to help
							you securely store and manage your digital files.
							Keep your documents, photos, and more organized and
							easily accessible with FileKeeper's reliable storage
							solutions.
						</p>
						<Button>
							<Link
								href="/dashboard"
								className="flex items-center text-white"
							>
								{user ? "Go to Dashboard" : "Try it out!"}
							</Link>
						</Button>
					</>
				}
			>
				<Image
					src={`/hero_keep.webp`}
					alt="hero"
					height={720}
					width={1400}
					className="mx-auto rounded-2xl object-cover h-full object-left-top"
					draggable={false}
				/>
			</ContainerScroll>
		</div>
	)
}
