import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { CreateOrganization } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const EmptyOrg = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Image src='/empty.png' alt='empty-org' width={200} height={200} />
      <h2 className='text-lg font-semibold'>Welcome to board</h2>
      <p className='text-sm text-muted-foreground'>
        Board is the center of your work and play.
      </p>
      <div className='mt-6'>
        <Dialog>
          <DialogTrigger>
            <Button>Create Organization</Button>
          </DialogTrigger>
          <DialogContent className='w-[500px] bg-transparent border-none'>
            <CreateOrganization routing="hash" />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default EmptyOrg