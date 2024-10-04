"use client"
import React from 'react'
import EmptyItem from './empty-item'

interface BoardListProps {
    orgId?: string
    query: {
        search?: string
        favorite?: string
    }
}

const BoardList = ({ orgId, query }: BoardListProps) => {

    const data = []

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
        <div>
            {JSON.stringify(query)}
        </div>
    )
}

export default BoardList