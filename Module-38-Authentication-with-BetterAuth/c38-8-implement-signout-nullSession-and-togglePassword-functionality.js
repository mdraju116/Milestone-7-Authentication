/* 
=>See Navbar.tsx and Sign-in/page.tsx and Sign-up/page.tsx 


1.=>Navbar.tsx 

"use client"

import { useState } from "react";
import { Link, Button, Spinner } from "@heroui/react";
import { signOut, useSession } from "@/lib/auth-client";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const {data:session,isPending} =useSession();
  console.log("User session in Navbar",session)

  //manage null/pending session
  if(isPending){
    return <div className="flex flex-col items-center gap-2">
        <Spinner color="success" />
        <span className="text-xs text-muted">Loading...</span>
      </div>
  }

  const links =<>
      <li> <Link href="#">Features</Link> </li>
      <li> <Link href="#" className="font-medium text-accent" aria-current="page"> Dashboard </Link> </li>
      <li> <Link href="#">Pricing</Link> </li>
  </>


  //implement sign-out function
  const authLinks =<>
    {
        session?.user ? <> 
            <span>Welcome, {session.user.name}</span>
            <Button onClick={()=>{signOut()}}>Sign Out</Button>

        </>:<>
            <Link href="/sign-in">Sign In</Link>
            <Link href="/sign-up"> <Button>Sign Up</Button></Link>
            
        </>
    }
  </>

 return (
    .....everything is from previous class
)



2.sign-in/sign-up/page.tsx

const SignInPage = () => {
    
 //togglePassword-c38-8
    const [isVisible, setIsVisible] = useState(false);

   return ( 
     {/* password with toggle eye-c38-8 /}
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <InputGroup>
                        <InputGroup.Input
                            className="w-full max-w-70"
                            type={isVisible ? "text" : "password"}
                            placeholder="Enter your password" 
                        />
                        <InputGroup.Suffix className="pe-0">
                            <Button
                                isIconOnly
                                aria-label={isVisible ? "Hide password" : "Show password"}
                                size="sm"
                                variant="ghost"
                                onPress={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
                            </Button>
                            
                        </InputGroup.Suffix>
                    </InputGroup>  
                    <FieldError />
                </TextField>

)
}




*/