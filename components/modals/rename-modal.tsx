"use client"

import { useRename } from "@/store/use-rename"
import { useEffect, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import toast from "react-hot-toast"

export const RenameModal = () => {
    const { mutation, pending } = useApiMutation(api.board.update)
    const { isOpen, initialValue, onClose } = useRename()
    const [title, setTitle] = useState(initialValue.title)


    useEffect(() => {
        setTitle(initialValue.title)
    }, [initialValue.title])

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        mutation({
            id: initialValue.id,
            title
        })
            .then(() => {
                toast.success("Board renamed successfully")
                onClose()
            })
            .catch(() => {
                toast.error("Failed to rename board try again later")
            })
    }
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Rename Board</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Enter new name for your board
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter new name for your board"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">Rename</Button>
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}