import Image from "next/image";
import React from 'react'

const Loading = () => {
  return (
      <div className="h-full w-full flex flex-col gap-4 justify-center items-center">
          <Image src="/logo.png" className="animate-bounce duration-700 w-60 h-auto" alt="logo" width={240} height={135} />
      </div>
  )
}

export default Loading