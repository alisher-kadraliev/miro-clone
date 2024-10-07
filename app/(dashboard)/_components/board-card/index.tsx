"use client"

import Image from "next/image"
import Link from "next/link"
import Overlay from "./overlay"
import { Skeleton } from "@/components/ui/skeleton"

interface BoardCardProps {
    id: string
    title: string
    imageUrl: string
    authorId: string
    authorName: string
    createdAt: number
    orgId: string
    isFavorite: boolean
}
import { formatDistanceToNow } from "date-fns"
import { useAuth } from "@clerk/nextjs"
import FooterCard from "./footer"
import Actions from "@/components/actions"
import { MoreHorizontal } from "lucide-react"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { api } from "@/convex/_generated/api"

export const BoardCard = ({ id, title, imageUrl, authorId, authorName, createdAt, orgId, isFavorite }: BoardCardProps) => {
    const { userId } = useAuth()
    const authorLabel = userId === authorId ? "You" : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })

    const { mutation: onFavorite, pending: favoritePending } = useApiMutation(api.board.favorite)
    const { mutation: onUnfavorite, pending: unfavoritePending } = useApiMutation(api.board.unfavorite)

    const toggleFavorite = () => {
        if (isFavorite) {
            onUnfavorite({ id })
        } else {
            onFavorite({ id, orgId })
        }
    }
    return (
        <Link href={`/board/${id}`}>
            <div className='border group aspect-[100/127] rounded-lg overflow-hidden flex flex-col justify-between'>
                <div className="relative bg-blue-100 w-full h-full flex items-center justify-center">
                    <Image src={imageUrl} alt={title} width={200} height={200} className='object-fit' />
                    <Overlay />
                    <Actions id={id} title={title} size='right' sizeOffset={10} >
                        <button className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-100 transition-all p-3 ourline-none">
                            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-100 transition-all" />
                        </button>
                    </Actions>
                </div>
                <FooterCard
                    favorite={isFavorite}
                    title={title}
                    authorLable={authorLabel}
                    createdAt={createdAtLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={toggleFavorite}
                    disabled={favoritePending || unfavoritePending}
                />
            </div>
        </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className='aspect-[100/127]'>
            <Skeleton className='w-full h-full' />
        </div>
    )
}