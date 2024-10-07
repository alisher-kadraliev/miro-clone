import React from 'react'

const Toolbar = () => {
  return (
      <div className='absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4'>
          <div className='bg-white rounded-md p-2 flex gap-1 flex-col items-center shadow-md'>
              <div>
                  Pensil
              </div>

          </div>
          <div className="bg-white rounded-lg p-2 flex flex-col items-center shadow-md">
              <div>Undo</div>
              <div>Redo</div>
          </div>
    </div>
  )
}

export default Toolbar