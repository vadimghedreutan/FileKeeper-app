"use client"

import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase"
import { useAppState } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import toast from "react-hot-toast"

export function DeleteModal() {
	const { user } = useUser()

	const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] =
		useAppState((state) => [
			state.isDeleteModalOpen,
			state.setIsDeleteModalOpen,
			state.fileId,
			state.setFileId,
		])

	async function deleteFile() {
		if (!user || !fileId) return

		const toastId = toast.loading("Deleting file...")

		const fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

		try {
			deleteObject(fileRef).then(async () => {
				deleteDoc(doc(db, "users", user.id, "files", fileId))
					.then(() => {
						console.log("Document successfully deleted!")

						toast.success("File deleted successfully", {
							id: toastId,
						})
					})
					.finally(() => {
						setIsDeleteModalOpen(false)
					})
			})
		} catch (error) {
			console.error("Error deleting file", error)
			setIsDeleteModalOpen(false)

			toast.error("Error deleting file", { id: toastId })
		}

		setIsDeleteModalOpen(false)
	}

	return (
		<Dialog
			open={isDeleteModalOpen}
			onOpenChange={(isOpen) => setIsDeleteModalOpen(isOpen)}
		>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Are you sure you want to delete?</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently
						delete the file!
					</DialogDescription>
				</DialogHeader>
				<div className="flex space-x-2 py-2">
					<Button
						size="sm"
						variant={"ghost"}
						className="px-3 flex-1"
						onClick={() => setIsDeleteModalOpen(false)}
					>
						<span className="sr-only">Cancel</span>
						<span>Cancel</span>
					</Button>

					<Button
						type="submit"
						size="sm"
						variant={"destructive"}
						className="px-3 flex-1"
						onClick={() => deleteFile()}
					>
						<span className="sr-only">Delete</span>
						<span>Delete</span>
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
