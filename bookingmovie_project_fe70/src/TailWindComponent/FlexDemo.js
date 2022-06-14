import React from 'react'

export default function FlexDemo() {
  return (
    <div className='w-screen h-screen bg-purple-400'>
        <div className='flex flex-row items-center justify-center w-full h-1/2 bg-green-500'>
            {/* items-center = align-items-center */}
            <div className="fItem h-10 w-10 bg-black"></div>
            <div className="fItem h-10 w-10 bg-blue-400"></div>
            <div className="fItem h-10 w-10 bg-red-400"></div>
        </div>
    </div>
  )
}
