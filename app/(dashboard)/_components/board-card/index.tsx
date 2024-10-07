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

export const BoardCard = ({ id, title, imageUrl, authorId, authorName, createdAt, orgId, isFavorite }: BoardCardProps) => {
    const {userId} = useAuth()
    const authorLabel = userId === authorId ? "You" : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true })
    return (
        <Link href={`/board/${id}`}>
            <div className='border group aspect-[100/127] rounded-lg overflow-hidden flex flex-col justify-between'>
                <div className="relative bg-blue-100 w-full h-full flex items-center justify-center">
                    <Image src={imageUrl} alt={title} width={200} height={200} className='object-fit' />
                    <Overlay />
                </div>
                <FooterCard
                    favorite={isFavorite}
                    title={title}
                    authorLable={authorLabel}
                    createdAt={createdAtLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={() => {
                        console.log("clicked")
                    }}
                    disabled={false}
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