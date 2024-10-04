"use client"
import React from 'react'
import EmptyOrg from './_components/empty-org'
import { useOrganization } from '@clerk/nextjs'
import BoardList from './_components/board-list'

interface DashboardPageProps {
  searchParams: {
    search?: string
    favorite?: string
  }
}
const DashboardPage = ({ searchParams }: DashboardPageProps) => {
  const { organization } = useOrganization()
  return (
    <div className='flex-1 h-[calc(100%-70px)] p-6'>
      {organization ? (
        <BoardList orgId={organization.id} query={searchParams} />
      ) : (
        <EmptyOrg />
      )}
    </div>
  )
}

export default DashboardPage