/* 
=>see the documentation : https://better-auth.com/docs/authentication/email-password

and=>See sign-up/page.tsx 

		-go to : https://heroui.com/en/docs/react/components/form
		-and copy the full form , 
		-paste to signup/page.tsx and
		-then modify as your need
		
		-install : react-toastify and gravity-ui/icons

NB: this code had changed after module-39, so this is primary sign-up,
		see main projects sign-up/page.tsx for update one

=>sign-up/page.tsx  
"use client";
import { signUp } from "@/lib/auth-client";
import { Button, Description,InputGroup, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import { Eye, EyeSlash } from "@gravity-ui/icons";
import { useState } from "react";


const SignUpPage = () => {


    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //get data from the form
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        toast.success("Successfully Signed Up.")
        console.log("Data from the form:", data);


        //send data to mongodb
        const { data: responseData, error } = await signUp.email({
            name: String(data.name ?? ""),
            email: String(data.email ?? ""),
            password: String(data.password ?? "")
        });

        console.log(responseData, error);


    };

 //togglePassword-c38-8
    const [isVisible, setIsVisible] = useState(false);

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
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
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
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>


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
                    <InputGroup className="w-full">
                        <InputGroup.Input
                            className="w-full "
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
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>




                <div className="flex gap-2">
                    <Button type="submit">

                        Sign Out
                    </Button>

                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>


            </Form>



        </div>
    );
};

export default SignUpPage;



*/