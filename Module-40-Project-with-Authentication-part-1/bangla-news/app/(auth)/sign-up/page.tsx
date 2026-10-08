"use client";
import { signUp } from "@/lib/auth-client";
import { Button, Description, InputGroup, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth-client";

const SignUpPage = () => {

    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //get data from the form
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log("Data from the form:", data);


        //send data to mongodb
        const { data: responseData, error } = await signUp.email({
            name: String(data.name ?? ""),
            email: String(data.email ?? ""),
            password: String(data.password ?? ""),
            image:String(data.image ?? ""),
            //callbackURL: "/sign-in"   //not working ,that's why using router
            //redirectTo: "/sign-in",   //we can use this too
        });


        if (error) {
            console.log(error);
            toast.error(`Error: ${error}`);
            return;
        }
        toast.success("Successfully Signed Up.");
        toast.info("Verify Your Email first");
        router.push("/sign-in"); //to move from sign-up page


        console.log("After signed-up", responseData, error);
    };

    //togglePassword-c38-8
    const [isVisible, setIsVisible] = useState(false);


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
    
      
    return (
        <div className="flex items-center justify-center mt-10">
            <Form className="flex w-88 flex-col gap-4" onSubmit={onSubmit}>

                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>নাম</Label>
                    <Input placeholder="আপনার নাম লিখুন" />
                    <FieldError />
                </TextField>

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

                {/* Image Field*/}
                <TextField
                    isRequired
                    name="image"
                    type="url"
                    
                >
                    <Label>ছবি</Label>
                    <Input placeholder=" আপনার ছবির লিংক দিন" />
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
                            className=" w-full"
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
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>





                <div className="flex justify-center gap-2">
                    <Button type="submit">
                        সাইন আপ করুন
                    </Button>             
                </div>

                <div className="flex">
                    <button onClick={handleGoogleSignIn} className="btn">Sign In with Google</button>
                    <button onClick={handleGithubSignIn} className="btn">Sign In with Github</button>
                
                </div>


            </Form>



        </div>
    );
};

export default SignUpPage;