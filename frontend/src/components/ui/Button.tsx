import React from "react";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLElement>{
    children:React.ReactNode;
}


export const Button:React.FC<ButtonProps> = ({children,className="",...props})=>{
    return(
        <button className={`px-8 py-2 my-4 bg-blue-200 text-white rounded-xl shadow hover:bg-amber-700 ${className}`} {...props} >
            {children}
        </button>
    );
}
