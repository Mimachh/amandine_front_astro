import React from 'react'
import { ColorRing } from  'react-loader-spinner'
export default function Loader() {
  return (
    <div className='w-full h-fit flex items-center justify-center'>
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#e15b64', '#f47e60', 'rgb(23, 136, 251)', 'hsl(45, 6%, 92%)', 'hsl(0 84.2% 60.2%)']}
      />
    </div>
  )
}
