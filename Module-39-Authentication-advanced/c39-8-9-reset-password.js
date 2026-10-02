/* 
✅✅✅Reset Password

=>see: fogot-password/page.tsx, reset-password/page.tsx, reset-password-form.tsx
     auth.ts, auth-client.ts

⚠️⚠️NB: As it is an testing/local domain, not real. So the reset mail will only send to the account (md980)
         which is signed-inat the https://resend.com/onboarding . Any ohter email will not receive the reset mail.

        -So create an account with that email first,verify, then go to forgot password page to send
        the reset mail

        -To send email at others gmail, first provide the actual domain (paid).

➡️-Go to : https://better-auth.com/docs/authentication/email-password
-See thd docs of : Request Password Reset

-copy this :
        import { betterAuth } from "better-auth";
        import { sendEmail } from "./email"; // your email sending function

        export const auth = betterAuth({
        emailAndPassword: {
            enabled: true,
            sendResetPassword: async ({user, url, token}, request) => {
            void sendEmail({
                to: user.email,
                subject: "Reset your password",
                text: `Click the link to reset your password: ${url}`,
            });
            },
            onPasswordReset: async ({ user }, request) => {
            // your logic here
            console.log(`Password for user ${user.email} has been reset.`);
            },
        },
        });

➡️paste in auth.ts (inside  emailAndPassword: {... })
-modify like this:
        // c39-8
            sendResetPassword: async ({ user, url, token }, request) => {
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: user.email,
                subject: "Reset your password",
                html: ` <h4>Reset Password</h4>
                Click the link to reset your password: ${url}
                <p>Ignore this message, if you haven't request a  password reset.</p>`,


            });
            },


➡️-Create two authClient named: requestPasswordReset, resetPassword
=>auth-client.ts
        export const {
            signIn,
            signUp,
            signOut,
            updateUser,
            requestPasswordReset,
            resetPassword,
            useSession
        } = createAuthClient()



➡️➡️-Create a page forgot-password/page.tsx
-create an email form like sign-in page (copy and paste the full sign in page, then modify)

-copy this from site and replace with data function 

    const { data, error } = await authClient.requestPasswordReset({
        email: "john.doe@example.com", // required, The email address of the user to send a password reset email to
        redirectTo: "https://example.com/reset-password", // The URL to redirect the user to reset their password. If the token isn't valid or expired, it'll be redirected with a query parameter `?error=INVALID_TOKEN`. If the token is valid, it'll be redirected with a query parameter `?token=VALID_TOKEN
    });

-then modify  like this:
        //send data to mongodb
        const { data: responseData, error } = await requestPasswordReset({
            email: String(data.email ?? ""),
            redirectTo: "/reset-password",
        });



➡️➡️-Create a page reset-password/page.tsx
-as we need to use state, need a client component
-so just call it here <ResetPasswordForm></ResetPasswordForm> 
-and we will do everything in the component
-NB: use suspense to  be prerendered 


        import { Suspense } from "react";
        import ResetPasswordForm from "./reset-password-form";


        const ResetPasswordPage = () => {
            return (
                <div>
                    <h2 className="text-center">Reset Your Password Here</h2>
                    <Suspense fallback="loading...">
                        <ResetPasswordForm></ResetPasswordForm>
                    </Suspense>
                    
                </div>
            );
        };

        export default ResetPasswordPage;



➡️➡️-Create a component reset-password-from.tsx
-Create a form using Hero ui fieldset
-and implement the onSubmit like login page

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


➡️-go to :https://nextjs.org/docs/app/api-reference/functions/use-search-params
-copy this :

    'use client'
    import { useSearchParams } from 'next/navigation'
 
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    
     
  

-paste to reset-password-from.tsx
-modify like this:

    const ResetPasswordForm = () => {
        const searchParams=useSearchParams();
        const token = searchParams.get("token") ?? undefined;

    }
    return (...)

--implement errors using gpt


############################## Full reset-password-from.tsx #########################



"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { resetPassword } from "@/lib/auth-client";

import {
  Button,
  InputGroup,
  Description,
  FieldError,
  Form,
  Label,
  TextField,
} from "@heroui/react";

import { toast } from "react-toastify";
import { useState } from "react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const router = useRouter();

  // Toggle password visibility
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  // Custom errors
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Get data from the form
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newPassword = String(data.newPassword ?? "");
    const confirmPassword = String(data.confirmPassword ?? "");

    // Clear old custom errors
    setPasswordError("");
    setConfirmPasswordError("");

    // Check whether both passwords match
    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    // Send data to Better Auth
    const { data: responseData, error } = await resetPassword({
      newPassword,
      token,
    });

    if (error) {
      console.log(error);

      setPasswordError(
        error.message || "Failed to reset password."
      );

      return;
    }

    toast.success("You have reset your password successfully.");
    router.push("/sign-in");

    console.log("After submit", responseData);

  };

  return (
    <div className="flex items-center justify-center mt-10">
      <Form
        className="flex w-96 flex-col gap-4"
        onSubmit={onSubmit}
      >
        {/* New Password /}
        <TextField
          isRequired
          name="newPassword"
          minLength={8}
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
          <Label>New Password</Label>

          <InputGroup>
            <InputGroup.Input
              name="newPassword"
              type={isNewVisible ? "text" : "password"}
              placeholder="Enter your new password"
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={
                  isNewVisible
                    ? "Hide password"
                    : "Show password"
                }
                size="sm"
                variant="ghost"
                onPress={() =>
                  setIsNewVisible(!isNewVisible)
                }
              >
                {isNewVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          {/* Better Auth/server error /}
          {passwordError && (
            <FieldError>{passwordError}</FieldError>
          )}
        </TextField>

        {/* Confirm Password /}
        <TextField
          isRequired
          name="confirmPassword"
          isInvalid={!!confirmPasswordError}
        >
          <Label>Confirm Password</Label>

          <InputGroup>
            <InputGroup.Input
              name="confirmPassword"
              type={
                isConfirmVisible ? "text" : "password"
              }
              placeholder="Confirm your new password"

              // Clear mismatch error when user changes password
              onChange={() => {
                setConfirmPasswordError("");
              }}
            />

            <InputGroup.Suffix className="pe-0">
              <Button
                isIconOnly
                aria-label={
                  isConfirmVisible
                    ? "Hide password"
                    : "Show password"
                }
                size="sm"
                variant="ghost"
                onPress={() =>
                  setIsConfirmVisible(!isConfirmVisible)
                }
              >
                {isConfirmVisible ? (
                  <Eye className="size-4" />
                ) : (
                  <EyeSlash className="size-4" />
                )}
              </Button>
            </InputGroup.Suffix>
          </InputGroup>

          {/* Password mismatch error /}
          {confirmPasswordError && (
            <FieldError>
              {confirmPasswordError}
            </FieldError>
          )}

          <Description>
            Must be at least 8 characters with 1 uppercase and
            1 number
          </Description>
        </TextField>

        {/* Buttons /}
        <div className="flex gap-2">
          <Button type="submit">
            Set Password
          </Button>

          <Button
            type="reset"
            variant="secondary"
          >
            Clear
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;











 */