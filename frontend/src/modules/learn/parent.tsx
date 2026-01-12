"use client"
import { useCallback, useState } from "react";
import Child from "./child";


export default function Parent() {
  const [count, setCount] = useState(0);

//   // ❌ new function created on every render
//   const sayHello = () => {
//     console.log("Hello");
//   };

    const sayHello = useCallback(() => {
        console.log("Hello");
    }, []); // no dependencies, so never recreated

  console.log("parent render")
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    

      <Child onHello={sayHello} />
    </div>
  );
}
