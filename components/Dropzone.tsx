"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"

import { cn } from "@/lib/utils"
import Dropzone from "react-dropzone"
import {
	addDoc,
	collection,
	doc,
	serverTimestamp,
	updateDoc,
} from "firebase/firestore"
import { db, storage } from "@/firebase"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import toast from "react-hot-toast"

export default function DropzoneComponent() {
	const [loading, setLoading] = useState(false)
	const { isLoaded, isSignedIn, user } = useUser()

	const onDrop = (acceptedFiles: File[]) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader()

			reader.onabort = () => console.log("file reading was aborted")
			reader.onerror = () => console.log("file reading has failed")
			reader.onload = async () => {
				await uploadPost(file)
			}
			reader.readAsArrayBuffer(file)
		})
	}

	const uploadPost = async (selectedFile: File) => {
		if (loading) return
		if (!user) return

		setLoading(true)
		const toastId = toast.loading("Uploading file...")

		const docRef = await addDoc(collection(db, "users", user.id, "files"), {
			userId: user.id,
			fileName: selectedFile.name,
			fullName: user.fullName,
			profileImage: user.imageUrl,
			timestamp: serverTimestamp(),
			type: selectedFile.type,
			size: selectedFile.size,
		})

		const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`)

		await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
			const downloadURL = await getDownloadURL(imageRef)
			await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
				downloadURL: downloadURL,
			})
		})

		toast.success("File uploaded successfully", { id: toastId })
		setLoading(false)
	}

	// max file size is 20MB
	const maxSize = 20971520

	return (
		<Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
			{({
				getRootProps,
				getInputProps,
				isDragActive,
				isDragReject,
				fileRejections,
			}) => {
				const isFileTooLarge =
					fileRejections.length > 0 &&
					fileRejections[0].file.size > maxSize
				return (
					<section className="m-4">
						<div
							{...getRootProps()}
							className={cn(
								"w-full h-52 flex justify-center items-center p-5 rounded-xl text-center",
								isDragActive
									? "bg-[#035FFE] text-white animate-pulse"
									: "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
							)}
						>
							<input {...getInputProps()} />
							{!isDragActive &&
								"Click here or drop a file to upload!"}
							{isDragActive && !isDragReject && "Drag to upload!"}
							{isDragReject &&
								"File type is not accepted, please upload a valid file type"}
							{isFileTooLarge && (
								<div className="text-denger mt-2">
									File is too large.
								</div>
							)}
						</div>
					</section>
				)
			}}
		</Dropzone>
	)
}
