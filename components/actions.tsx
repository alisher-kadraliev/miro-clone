"use client"
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Link, Pencil, Trash } from "lucide-react"
import { toast } from "react-hot-toast"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"
import { useRename } from "@/store/use-rename"
interface ActionsProps {
    children: React.ReactNode
    size?: DropdownMenuContentProps["side"]
    sizeOffset?: DropdownMenuContentProps["sideOffset"]
    id: string
    title: string
}

export default function Actions({ children, size, sizeOffset, id, title }: ActionsProps) {

    const { onOpen } = useRename()
    const { mutation, pending } = useApiMutation(api.board.remove)
    const onDeleteBoard = () => {
        mutation({ id }).then(() => {
            toast.error("Board deleted")
        }).catch((error) => {
            toast.error("Failed to delete board", error)
        })
    }
    const onCopyLink = () => {
        navigator.clipboard.writeText(`${window.location.origin}/board/${id}`).then(() => {
            toast.success("Link copied to clipboard")
        })
    }
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => {
                    e.stopPropagation()
                }}
                side={size}
                sideOffset={sizeOffset}
                className="w-60"
            >
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2" onClick={onCopyLink}>
                    <Link />
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2" onClick={() => onOpen(id,title)}>
                    <Pencil />
                    Rename Board
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2" onClick={onDeleteBoard}>
                    <Trash />
                    Delete Board
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}