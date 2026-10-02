import { Suspense } from "react";
import ResetPasswordForm from "./reset-password-form";


const ResetPasswordPage = () => {
    return (
        <div>
            <h2 className="text-center mt-10">Reset Your Password Here</h2>
            <Suspense fallback="loading...">
                <ResetPasswordForm></ResetPasswordForm>
            </Suspense>
            
        </div>
    );
};



export default ResetPasswordPage;