import DropzoneComponent from "@/components/Dropzone"
import TableWrapper from "@/components/table/TableWrapper"
import { db } from "@/firebase"
import { FileType } from "@/typings"
import { auth } from "@clerk/nextjs"
import { collection, getDocs } from "firebase/firestore"

async function Dashboard() {
	const { userId } = auth()

	const docsResults = await getDocs(collection(db, "users", userId!, "files"))
	const skeletonFiles: FileType[] = docsResults.docs.map((doc) => ({
		id: doc.id,
		filename: doc.data().fileName || doc.id,
		timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
		type: doc.data().type,
		size: doc.data().size,
		downloadURL: doc.data().downloadURL,
		fullName: doc.data().fullName,
	}))

	console.log(skeletonFiles)

	return (
		<div className="border-t">
			<DropzoneComponent />

			<section className="container space-y-5">
				<h2 className="font-bold">All files</h2>

				<div>
					<TableWrapper skeletonFiles={skeletonFiles} />
				</div>
			</section>
		</div>
	)
}
export default Dashboard
