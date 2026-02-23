import React from 'react'
import {HashLoader} from 'react-spinners'
export default function Loading() {
  return (
    <div className='flex justify-center fixed top-0 bottom-0 start-0 end-0 bg-[rgba(0,0,0,.5)] z-50'>
      <HashLoader></HashLoader>
    </div>
  )
}
