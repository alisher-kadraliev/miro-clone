"use client"

import { api } from '@/convex/_generated/api'

import Image from 'next/image'
import { useOrganization } from '@clerk/nextjs'
import { Button } from '@/components/ui/button'
import { useApiMutation } from '@/hooks/use-api-mutation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const EmptyItem = () => {
  const { organization } = useOrganization()
  const { mutation, pending } = useApiMutation(api.board.create)
  const router = useRouter()
  const onClick = () => {

    if (!organization) {
      return
    }
    mutation({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created successfully")
        router.push(`/board/${id}`)
      })
      .catch(() => toast.error("Failed to create board"))
  }
  return (
    <div className='flex items-center justify-center h-full'>
      <div className='flex flex-col items-center gap-y-2'>
        <Image src="/empty-item.png" alt="empty" className='w-60 h-auto' width={100} height={100} />

        <Button disabled={pending} onClick={onClick} className='mt-4'>
          Create
        </Button>
      </div>
    </div>
  )
}

export default EmptyItem