import React, { useState } from 'react'

const StateExample = () => {
    
    const [count,setCount] = useState(0);
    console.log("StateExample RENDERED!",{count});

    const increament =()=>{
        setCount(count+1);
    };
    return (
        <div className="bg-amber-300 p-8 flex items-center justify-center">
            <div>
                <p>Count (UseState) :{count}</p>
                <button className='text-blue-500' onClick={increament}>Increase (state)</button>
            </div>
        </div>
    )
}

export default StateExample