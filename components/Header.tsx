import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { ThemeToggler } from "./ThemeToggler"

function Header() {
	return (
		<header className="max-w-7xl mx-auto w-full">
			<div className="flex items-center justify-between px-5 py-10">
				<Link href="/">
					<h1 className="text-lg font-bold">FileKeeper</h1>
				</Link>

				<div className="px-5 flex space-x-2 items-center">
					<ThemeToggler />
					<UserButton afterSignOutUrl="/" />

					<SignedOut>
						<SignInButton
							afterSignInUrl="/dashboard"
							mode="modal"
						/>
					</SignedOut>
				</div>
			</div>
		</header>
	)
}
export default Header
