"use client"

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from "@tanstack/react-table"

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { DivideSquare, Edit, PencilIcon, Trash } from "lucide-react"
import { FileType } from "@/typings"
import { Button } from "../ui/button"
import { useAppState } from "@/store/store"
import { DeleteModal } from "../DeleteModal"
import EditModal from "../EditModal"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	const [setIsDeleteModalOpen, setFileId, setFilename, setIsEditModalOpen] =
		useAppState((state) => [
			state.setIsDeleteModalOpen,
			state.setFileId,
			state.setFilename,
			state.setIsEditModalOpen,
		])

	const openDeleteModal = (fileId: string) => {
		// Code to open delete modal goes here
		setFileId(fileId)
		setIsDeleteModalOpen(true)
	}

	const openEditModal = (fileId: string, filename: string) => {
		// Code to open edit modal goes here
		setFileId(fileId)
		setFilename(filename)
		setIsEditModalOpen(true)
	}

	return (
		<div className="rounded-xl border">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef
														.header,
													header.getContext()
											  )}
									</TableHead>
								)
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && "selected"}
							>
								<DeleteModal />
								<EditModal />
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{cell.column.id === "timestamp" ? (
											<div className="flex flex-col">
												<div className="text-sm">
													{(
														cell.getValue() as Date
													).toLocaleDateString()}
												</div>

												<div className="text-xs text-gray-500">
													{(
														cell.getValue() as Date
													).toLocaleTimeString()}
												</div>
											</div>
										) : cell.column.id === "filename" ? (
											<p
												onClick={() => {
													openEditModal(
														(
															row.original as FileType
														).id,
														(
															row.original as FileType
														).filename
													)
												}}
												className="underline flex items-center text-blue-500 hover:cursor-pointer"
											>
												{cell.getValue() as string}{" "}
												<PencilIcon
													size={15}
													className="ml-2"
												/>
											</p>
										) : (
											flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)
										)}
									</TableCell>
								))}
								<TableCell key={(row.original as FileType).id}>
									<Button
										variant={"outline"}
										onClick={() => {
											openDeleteModal(
												(row.original as FileType).id
											)
										}}
									>
										<Trash size={20} />
									</Button>
								</TableCell>
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell
								colSpan={columns.length}
								className="h-24 text-center"
							>
								No Files.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	)
}
