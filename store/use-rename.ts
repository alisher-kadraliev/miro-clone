import { create } from "zustand"

const deafultValue = {
    id: "",
    title:""
}

interface IRename {
    isOpen: boolean
    initialValue: typeof deafultValue
    onOpen: (id: string, title: string) => void
    onClose: () => void
}

export const useRename = create<IRename>((set) => ({
    isOpen: false,
    onOpen: (id, title) => set({
        isOpen: true,
        initialValue: {
            id,
            title
        }
    }),
    onClose: () => set({
        isOpen: false,
        initialValue: deafultValue
    }),
    initialValue: deafultValue
}))