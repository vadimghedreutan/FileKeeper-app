"use client"

import { useAppState } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { Input } from "./ui/input"
import toast from "react-hot-toast"

function EditModal() {
	const { user } = useUser()
	const [input, setInput] = useState("")

	const [isEditModalOpen, setIsEditModalOpen, fileId, filename] = useAppState(
		(state) => [
			state.isEditModalOpen,
			state.setIsEditModalOpen,
			state.fileId,
			state.filename,
		]
	)

	async function editFile() {
		if (!user || !fileId) return

		const toastId = toast.loading("Editing file...")

		try {
			await updateDoc(doc(db, "users", user.id, "files", fileId), {
				filename: input,
			})
		} catch (error) {
			console.error("Error updating file", error)
		}

		toast.success("File edited successfully", { id: toastId })

		setInput("")

		setIsEditModalOpen(false)
	}

	return (
		<Dialog
			open={isEditModalOpen}
			onOpenChange={(isOpen) => setIsEditModalOpen(isOpen)}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit File</DialogTitle>

					<Input
						id="link"
						defaultValue={filename}
						onChange={(e) => setInput(e.target.value)}
						onKeyDownCapture={(e) => {
							if (e.key === "Enter") {
								editFile()
							}
						}}
					/>

					<div className="flex justify-end space-x-2 py-2">
						<Button
							size={"sm"}
							className="px-3"
							variant={"ghost"}
							onClick={() => setIsEditModalOpen(false)}
						>
							<span className="sr-only">Cancel</span>
							<span>Cancel</span>
						</Button>

						<Button
							type="submit"
							size={"sm"}
							className="px-3"
							onClick={() => editFile()}
						>
							<span className="sr-only">Edit</span>
							<span>Edit</span>
						</Button>
					</div>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}

export default EditModal
