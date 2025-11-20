"use client";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardDescribtion } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";
import { Controller, useForm } from "react-hook-form";

export const SignInView = () => {

   const { control, handleSubmit } = useForm({
        defaultValues: {
        username: '',
        select: {}
        }
    });
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <Card className="w-full max-w-md p-8">
        <CardTitle>Login to Your Account</CardTitle>
        <CardDescribtion>
          Welcome back! Please enter your credentials to sign in.
        </CardDescribtion>
        <Separator className="my-4" />
        <form className="flex flex-col gap-4">\
            <Controller
                name="username"
                control = {control}
                rules={{required:"Username is required"}}
                render={({field,fieldState }) =>(
                    <div>
                        <Label>User Name</Label>
                        <Input {...field} placeholder="Enter your username" />
                         {fieldState.error && (
                            <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                    </div>
                )}
            />

            <div >
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" />
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
            Sign In
            </Button>
        </form>

        <p className="mt-4 text-center text-gray-500 text-sm">
          Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
        </p>
      </Card>
    </div>
  );
};
