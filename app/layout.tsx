import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import Header from "@/components/Header"
import { ThemeProvider } from "@/components/ThemeProvider"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "FileKeeper",
	description: "Keep Your Digital Files with FileKeeper",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang="en" className={inter.className}>
				<body>
					<div className="w-full flex flex-col min-h-screen">
						<ThemeProvider
							attribute="class"
							defaultTheme="system"
							enableSystem
							disableTransitionOnChange
						>
							<Header />
							<main className="flex-grow">{children}</main>

							<Toaster />
						</ThemeProvider>
					</div>
				</body>
			</html>
		</ClerkProvider>
	)
}
