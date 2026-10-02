/* 
✅✅✅Reset Password

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


    import ResetPasswordForm from "./reset-password-form";
    const ResetPasswordPage = () => {
        return (
            <div>
                <h2 className="text-center">Reset Your Password Here</h2>

                <ResetPasswordForm></ResetPasswordForm>
            </div>
        );
    };

    export default ResetPasswordPage;



➡️➡️-Create a component reset-password-from.tsx
-go to :https://nextjs.org/docs/app/api-reference/functions/use-search-params
-copy this :

    'use client'
    import { useSearchParams } from 'next/navigation'
 
    export default function SearchBar() {
        const searchParams = useSearchParams()
        const search = searchParams.get('search')
    
        // URL -> `/dashboard?search=my-project`
        // `search` -> 'my-project'
        return <>Search: {search}</>
    }

-paste to reset-password-from.tsx
-modify like this:

    const ResetPasswordForm = () => {
        const searchParams=useSearchParams();
        const token = searchParams.get("token") ?? undefined;

    }
    return (...)


-Create a form using Hero ui fieldset
-and implement the onSubmit like login page






#####################################✅✅✅ Full code #########################


 */