"use client"

import { useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";
import { Button, InputGroup, FieldError, Form,  Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";


const ResetPasswordForm = () => {
    const searchParams=useSearchParams();
    const token = searchParams.get("token") ?? undefined;

    //togglePassword-c38-8
    const [isVisible, setIsVisible] = useState(false);

    //get data from the form
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        // console.log("Data from the form:", data);


        //send data to mongodb
        const { data: responseData, error } = await resetPassword({
            newPassword: String(data.password ?? ""),
            token
        });

        if (error) {
            console.log(error);
            return;
        }
        toast.success("You have reset password Successfully .")
        console.log("After submit", responseData, error);
    };



    
    return (
        <div className="flex items-center justify-center mt-10">

            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
              
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

                        Set Password
                    </Button>
                    <Button type="reset" variant="secondary">
                        Clear
                    </Button>
                </div>

              
            </Form>
        </div>
    );





};

export default ResetPasswordForm;