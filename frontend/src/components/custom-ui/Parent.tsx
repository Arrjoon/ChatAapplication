import React from 'react'
import Child from './Child'

const Parent = () => {
  return (

    <div className='p-5 flex justify-center items-center'>
        <h2>Parent Components </h2>
        <Child abc = "hello world" />
    </div>
  )
}

export default Parent