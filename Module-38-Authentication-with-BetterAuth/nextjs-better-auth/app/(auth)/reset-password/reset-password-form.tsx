
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
        {/* New Password */}
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

          {/* Better Auth/server error */}
          {passwordError && (
            <FieldError>{passwordError}</FieldError>
          )}
        </TextField>

        {/* Confirm Password */}
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

          {/* Password mismatch error */}
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

        {/* Buttons */}
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

