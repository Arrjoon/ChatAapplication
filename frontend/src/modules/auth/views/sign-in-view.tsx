"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescribtion } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/auth/useLogin";
import { AxiosError } from "axios";

const SignInSchema  = z.object({
    identifier:z.string().min(1,"Username is required zod "),
    password:z.string().min(1,"password is required zod").min(5,"password must be at least 6 charactors"),
            
})

export const SignInView = () => {
   const [isPasswordVisible,setPasswordVisible ] = useState<boolean>(false)
   const router = useRouter();

   const { mutate: login, isPending, error } = useLogin();
   const { control, handleSubmit } = useForm(
    {
        resolver:zodResolver(SignInSchema),
        defaultValues: {
        identifier: '',
        password: ''
        }
    });

    const onSubmit = (data:z.infer<typeof SignInSchema>) =>
    {
      console.log("form data ",JSON.stringify(data))
      login(
      {
        identifier: data.identifier,
        password: data.password,
      },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  const errorMessage = error
    ? ((error as AxiosError<{ message: string[] }>)?.response?.data?.message?.[0] ??
      "An unexpected error occurred")
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <Card className="w-full max-w-md p-8">
        <CardTitle>Login to Your Account</CardTitle>
        <CardDescribtion>
          Welcome back! Please enter your credentials to sign in.
        </CardDescribtion>
        <Separator className="my-4" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Controller
                name="identifier"
                control = {control}
                // rules={{required:"Username is required"}}
                render={({field,fieldState }) =>(
                    <div>
                        <Label>Username or email</Label>
                        <Input {...field} placeholder="Enter here .. " />
                         {fieldState.error && (
                            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                    </div>
                )}
            />
            {/* password  */}
            <Controller
              name="password"
              control={control}
              // rules={{required:"Password is required"}} come from zod
              render={({field,fieldState})=>(
                <div className="relative" >
                    <Label>Password</Label>
                    <Input  
                    type={isPasswordVisible ? "text" : "password" }
                    required
                    placeholder="Enter your password"
                    {...field}/>
                    <div className="absolute right-4 top-1/2
                     cursor-pointer" onClick={()=>{setPasswordVisible((prev)=>!prev)}} >{isPasswordVisible ? <Eye size={20}/> : <EyeClosed size={20}/>} </div>
                 
                    
                    {fieldState.error && (<p className="text-red-500 text-sm">{fieldState.error.message}</p>)}
                </div>
              )}
              />
             {errorMessage && (
                <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
              )}


            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
              sign In
            </Button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </Card>
    </div>
  );
}
