
import React, { useRef } from 'react'

const UseRefExample = () => {
    const count = useRef(0)

  const increament = () =>{
    count.current +=1;
    console.log("Ref value:",count.current)
  }
  return (
    <div className='mb-10'>
        <p> Count (useRef): {count.current}</p>
        <button onClick={increament}>Increase (Ref)</button>
    </div>
  )
}

export default UseRefExample