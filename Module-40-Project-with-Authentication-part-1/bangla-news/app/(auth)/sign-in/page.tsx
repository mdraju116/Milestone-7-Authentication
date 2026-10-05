"use client";
import { signIn } from "@/lib/auth-client";
import { Button, InputGroup, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import Link from "next/link";


const SignInPage = () => {

    //get data from the form
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());


        // console.log("Data from the form:", data);

        //send data to mongodb
        const { data: responseData, error } = await signIn.email({
            email: String(data.email ?? ""),
            password: String(data.password ?? ""),
            rememberMe: true,
            callbackURL: "/"
        });

        if (error) {
            console.log(error);
            toast.error("Failed to sign in.")
            return;
        }
        toast.success("Successfully Signed In.")

        console.log("After submit", responseData, error);
    };


    //google sign In
    const handleGoogleSignIn = async () => {
        const resData = await signIn.social({
            provider: "google"

        })
        console.log("After google sign in", resData)
    }

    //github sign In
    const handleGithubSignIn = async () => {
        const resData = await signIn.social({
            provider: "github"
        })
        console.log("After Github sign in", resData)
    }

  

    //togglePassword-c38-8
    const [isVisible, setIsVisible] = useState(false);



    return (
        <div className="flex items-center justify-center mt-10">

            <Form className="flex w-88 flex-col gap-4" onSubmit={onSubmit}>
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
                    <Label>ইমেইল</Label>
                    <Input placeholder="আপনার ইমেইল লিখুন" />
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
                    <Label>পাসওয়ার্ড</Label>
                    <InputGroup className="w-full">
                        <InputGroup.Input
                            className="w-full "
                            type={isVisible ? "text" : "password"}
                            placeholder="পাসওয়ার্ড লিখুন"
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




                <div className="flex justify-center gap-2">
                    <Button type="submit">
                        সাইন ইন করুন
                    </Button>


                </div>

                <h2 className="text-center">পাসওয়ার্ড ভুলে গেছেন ?
                    <Link href="/forgot-password" className="text-blue-600 font-medium">CLICK HERE</Link>
                </h2>

                <div className="flex">
                    <button onClick={handleGoogleSignIn} className="btn">Sign In with Google</button>
                    <button onClick={handleGithubSignIn} className="btn">Sign In with Github</button>
                   

                </div>


            </Form>
        </div>
    );
};

export default SignInPage;