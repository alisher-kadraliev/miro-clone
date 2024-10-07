"use client"
import { api } from '@/convex/_generated/api'
import { useApiMutation } from '@/hooks/use-api-mutation'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'

interface NewBoardBtnProps {
    orgId: string
    disabled?: boolean
}
const NewBoardBtn = ({ orgId, disabled }: NewBoardBtnProps) => {
    const { mutation, pending } = useApiMutation(api.board.create)

    const onClick = () => {
        mutation({
            title: "New Board",
            orgId
        })
            .then((id) => {
                toast.success("Board created")
            })
            .catch((err) => {
                toast.error("Failed to create board")
            })
    }

    return (
        <button
            disabled={disabled || pending}
            onClick={onClick}
            className={cn('col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col justify-center items-center py-6', disabled || pending && 'opacity-50 cursor-not-allowed')}
        >
            <Plus className='w-6 h-6 text-white' />
            <p className='text-white text-sm'>New Board</p>
        </button>
    )
}

export default NewBoardBtn

