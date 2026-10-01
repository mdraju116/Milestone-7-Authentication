"use client";
import { signIn } from "@/lib/auth-client";
import { Button, InputGroup, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";


const SignInPage = () => {

    //get data from the form
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        toast.success("Successfully Signed In.")
        // console.log("Data from the form:", data);

        //send data to mongodb
        const { data: responseData, error } = await signIn.email({
            email: String(data.email ?? ""),
            password: String(data.password ?? ""),
            rememberMe: true,
            callbackURL: "/"
        });

        console.log("After submit", responseData, error);
    };


    //google sign In
     const handleGoogleSignIn =async()=>{
        const resData =await signIn.social({
            provider : "google"

        })
        console.log("After google sign in", resData)
     }

     //github sign In
      const handleGithubSignIn =async()=>{
        const resData =await signIn.social({
            provider : "github"
        })
        console.log("After Github sign in", resData)
     }
     
    //discord sign In
     const handleDiscordSignIn =async()=>{
        const resData =await signIn.social({
            provider : "discord"
        })
        console.log("After Github sign in", resData)
     }


    //togglePassword-c38-8
    const [isVisible, setIsVisible] = useState(false);



    return (
        <div className="flex items-center justify-center mt-10">

            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>


                {/* password with toggle eye-c38-8 */}
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




                {/* buttons */}
                <div className="flex gap-2">
                    <Button type="submit">

                        Sign In
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>

                <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
                <Button onClick={handleGithubSignIn}>Sign In with Github</Button>
                <Button onClick={handleDiscordSignIn}>Sign In with Discord</Button>
            </Form>
        </div>
    );
};

export default SignInPage;