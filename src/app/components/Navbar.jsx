import React from 'react'

function Navbar() {
  return (
    <div className='flex justify-center p-5 items-center bg-gray-200'>
      <div className='flex gap-120'>
        <h1 className='font-bold text-2xl text-blue-900'>Code Snippet</h1>
        <h1>Log Out</h1>
      </div>
    </div>
  )
}

export default Navbar