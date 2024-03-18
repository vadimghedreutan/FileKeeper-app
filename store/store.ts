import {create} from 'zustand';

interface AppState {
    isDeleteModalOpen: boolean;
    setIsDeleteModalOpen: (open: boolean) => void;

    isEditModalOpen: boolean
    setIsEditModalOpen: (open: boolean) => void;

    fileId: string | null;
    setFileId: (fileId: string) => void;

    filename: string;
    setFilename: (filename: string) => void;

}

export const useAppState = create<AppState>((set) => ({
   fileId: null,
   setFileId: (fileId: string) => set((state) => ({fileId})),

   filename: '',
    setFilename: (filename: string) => set((state) => ({filename})),

    isDeleteModalOpen: false,
    setIsDeleteModalOpen: (open) => set((state) => ({isDeleteModalOpen: open})),

    isEditModalOpen: false,
    setIsEditModalOpen: (open) => set((state) => ({isEditModalOpen: open})),

}));