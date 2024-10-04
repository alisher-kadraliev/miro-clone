import Image from 'next/image'
import React from 'react'

const EmptyItem = () => {
  return (
    <div className='flex items-center justify-center h-full'>
        <div className='flex flex-col items-center gap-y-2'>
            <Image src="/empty-item.png" alt="empty" className='w-60 h-auto' width={100} height={100} />
        </div>
    </div>
  )
}

export default EmptyItem