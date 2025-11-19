import { HtmlHTMLAttributes } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLElement>{}



export const Input:React.FC<InputProps> = ({className="",...props})=>{
    return (
        <input className={`w-full p-2 border rounded-xl shadow-sm focus:outline-none focus:ring`}{...props}/>
    )
};