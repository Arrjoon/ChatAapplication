import React from "react";
interface ChildProps{
    abc:string;
}
const Child:React.FC<ChildProps> = ({ abc },onButtonClick) => {
  return (
    <div>Child components {abc}</div>
  )
}
export default Child;