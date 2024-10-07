"use client"
import React from 'react'
import EmptyItem from './empty-item'
import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { BoardCard } from './board-card'
import NewBoardBtn from './new-board-btn'

interface BoardListProps {
    orgId: string
    query: {
        search?: string
        favorite?: string
    }
}

const BoardList = ({ orgId, query }: BoardListProps) => {

    const data = useQuery(api.boards.get, { orgId })

    if (data === undefined) {
        return (
            <div>
                <h2 className='text-3xl font-bold'>
                    {query.favorite ? "Favorite Boards" : "Team Boards"}
                </h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 my-8'>
                    <NewBoardBtn orgId={orgId} disabled />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                    <BoardCard.Skeleton />
                </div>
            </div>
        )
    }

    if (!data?.length && query.search) {
        return (
            <div className='flex flex-col items-center justify-center h-full'>
                <div>
                    <EmptyItem />
                </div>
                <p className='text-xl text-muted-foreground mt-6'>
                    Try searching for something else
                </p>
            </div>
        )
    }

    if (!data?.length && query.favorite) {
        return (
            <div className='flex flex-col items-center justify-center h-full'>
                <div>
                    <EmptyItem />
                </div>
                <p className='text-xl text-muted-foreground mt-6'>
                    No favorite boards found
                </p>
            </div>
        )
    }

    if (!data?.length) {
        return (
            <div className='flex flex-col items-center justify-center h-full'>
                <div><EmptyItem /></div>
                <p className='text-xl text-muted-foreground mt-6'>
                    No boards found
                </p>
            </div>
        )
    }

    return (
        <>
            <h2 className='text-3xl font-bold'>
                {query.favorite ? "Favorite Boards" : "Team Boards"}
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 my-8'>
                <NewBoardBtn orgId={orgId} />
                {data?.map((board) => (
                    <BoardCard key={board._id} id={board._id} title={board.title} imageUrl={board.imageUrl} authorId={board.authorId} authorName={board.authorName} createdAt={board._creationTime} orgId={board.orgId} isFavorite={true} />
                ))}
            </div>
        </>
    )
}

export default BoardList