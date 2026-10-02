"use client";
import { requestPasswordReset } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "react-toastify";



const ForgotPasswordPage = () => {

    //get data from the form
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Data from the form:", data);

        //send data to mongodb
        const { data: responseData, error } = await requestPasswordReset({
            email: String(data.email ?? ""),
            redirectTo: "/reset-password",
        });

        if (error) {
            console.log(error);
            return;
        }
        toast.success("Successfully submitted .")

        console.log("After submit", responseData, error);
        //the response is like this=>( requestPasswordReset tells Mongodb)
        // message: "If this email exists in our system, check your email for the reset link"
        //and after checking this, the reset mail will send automatically to the gmail
    };



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

                {/* buttons */}
                <div className="flex gap-2">
                    <Button type="submit">
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Clear
                    </Button>
                </div>


            </Form>
        </div>
    );
};

export default ForgotPasswordPage;