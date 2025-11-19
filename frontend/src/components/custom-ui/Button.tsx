import React from "react";

interface ButtonProps  extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  variant?: "primary" | "outline" | "danger";

}



const Button:React.FC<ButtonProps> = ({children,className,variant="primary",...props})=>{

    const baseStyle = "m-4 px-4 py-2 rounded-xl font-medium";
    const variants ={
        primary : "bg-blue-600  hover:bg-blue-700",
        outline : "bg-gray-100",
        danger  : "bg-red-500",

    };
    return(
        <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    )
}

export default Button;