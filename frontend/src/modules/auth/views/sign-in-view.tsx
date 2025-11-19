
import { Button } from "@/components/ui/Button"
import { Card, CardTitle } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/label"
import { Separator } from "@radix-ui/react-separator"

export  const SignInView =()=>{
    //  function 
    
    return(
        <Card>
            <CardTitle>Login form </CardTitle>
            <Separator/>
            <Label>User Name </Label>
            <Input></Input>
            <Label >Password</Label>
            <Input></Input>
            <Button>Sign In</Button>
        </Card>
    )
}