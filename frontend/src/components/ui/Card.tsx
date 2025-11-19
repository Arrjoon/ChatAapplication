
export const Card =({children,className=""}:{children:React.ReactNode; className?:string})=>{
    return (
        <div className="{`bg-white shadow p-6 rounded-2xl ${className}`}">
            {children}
        </div>
    )
}

export const CardTitle = ({children}:{children:React.ReactNode})=>(
    <h3 className="text-xl font-semibold mb-2">{children}</h3>
)

interface descriptionprops {
    children:React.ReactNode;
}
export const CardDescribtion:React.FC<descriptionprops>=({children})=>
    <p className="text-gray-600 mb-4">{children}</p>