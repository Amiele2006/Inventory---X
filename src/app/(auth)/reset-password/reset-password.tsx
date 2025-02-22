"use client";

import type React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef, useEffect, useState } from "react";
import { Check } from "lucide-react";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import {Link} from "nextjs13-progress"
import { Poppins } from "next/font/google";

type ResetStep = "verify" | "create" | "success";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

const otpValidationSchema = Yup.object({
    otp: Yup.array()
        .of(Yup.string().required().length(1))
        .length(4)
        .required("Please enter the verification code"),
});

const passwordValidationSchema = Yup.object({
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
});

export default function ResetPassword() {
    const [showPassword, setShowPassword] = useState(true);
    const [currentStep, setCurrentStep] = useState<ResetStep>("verify");
    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const otpFormik = useFormik({
        initialValues: {
            otp: ["", "", "", ""],
        },
        validationSchema: otpValidationSchema,
        onSubmit: async (values) => {
            console.log("Verification code:", values.otp.join(""));
            setCurrentStep("create");
        },
    });

    const passwordFormik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: passwordValidationSchema,
        onSubmit: async (values) => {
            console.log("New password:", values.password);
            setCurrentStep("success");
        },
    });

    const handleInput = (index: number, value: string) => {
        const newOtp = [...otpFormik.values.otp];
        newOtp[index] = value;
        otpFormik.setFieldValue("otp", newOtp);
        if (value && index < 3) {
            inputRefs[index + 1].current?.focus();
        }
    };

    const handleKeyDown = (
        index: number,
        e: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Backspace" && !otpFormik.values.otp[index] && index > 0) {
            inputRefs[index - 1].current?.focus();
        }
    };

    useEffect(() => {
        if (currentStep === "verify") {
            inputRefs[0]?.current?.focus();
        }
    }, [currentStep, inputRefs]);


    const renderVerifyStep = () => (
        <div className="w-full max-w-md mx-auto space-y-9 p-1">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Password Reset</h1>
                <p className="text-gray-500">
                    We sent a code to emily@projectx.com. Didn&apos;t receive the email?
                    <button className="text-gray-900 font-medium hover:underline">
                        Resend
                    </button>
                </p>

            </div>

            <form onSubmit={otpFormik.handleSubmit} className="space-y-6">
                <div>
                    <div className="flex gap-3 justify-between">
                        {[0, 1, 2, 3].map((index) => (
                            <input
                                key={index}
                                ref={inputRefs[index]}
                                type="text"
                                maxLength={1}
                                style={{ borderRadius: "8px" }}
                                className="w-14 h-14 text-center text-2xl font-semibold border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                                value={otpFormik.values.otp[index]}
                                onChange={(e) => handleInput(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onBlur={otpFormik.handleBlur}
                                inputMode="numeric"
                                pattern="[0-9]*"
                            />
                        ))}
                    </div>
                    {otpFormik.touched.otp && otpFormik.errors.otp && (
                        <div className="text-red-500 text-sm mt-2">
                            {otpFormik.errors.otp}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    style={{ borderRadius: "10px" }}
                    className="w-full bg-gray-900 text-white py-5 rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50"
                    disabled={
                        otpFormik.isSubmitting || !otpFormik.values.otp.every(Boolean)
                    }
                >
                    Continue
                </button>
            </form>

            <div className="text-start">
                <span className="text-gray-500">Remember Password? </span>
                <Link href="/login" className="font-bold text-gray-900 hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );

    const renderCreateStep = () => (
        <div className="w-full max-w-md mx-auto space-y-9 p-1">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Create New Password
                </h1>
                <p className="text-gray-500">
                    Must be at least 8 characters.
                </p>
            </div>

            <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="password"
                            className={`block text-1xl text-gray-700 mb-1 ${poppins.className}`}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "password" : "text"}
                                style={{ borderRadius: "8px" }}
                                {...passwordFormik.getFieldProps("password")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                                <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                </span>
                            </button>
                        </div>
                        {passwordFormik.touched.password &&
                            passwordFormik.errors.password && (
                                <div className="text-red-500 text-sm mt-1">
                                    {passwordFormik.errors.password}
                                </div>
                            )}
                    </div>

                    <div>
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showPassword ? "password" : "text"}
                                style={{ borderRadius: "8px" }}
                                {...passwordFormik.getFieldProps("confirmPassword")}
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                            >
                                {showPassword ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="h-5 w-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                    </svg>
                                )}
                                <span className="sr-only">
                                    {showPassword ? "Hide password" : "Show password"}
                                </span>
                            </button>
                        </div>
                        {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
                            <div className="text-red-500 text-sm mt-1">
                                {passwordFormik.errors.confirmPassword}
                            </div>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    style={{ borderRadius: "10px" }}
                    className="w-full bg-gray-900 text-white py-6 rounded-md hover:bg-gray-800 transition-colors duration-200"
                >
                    Create Password
                </button>
            </form>

            <div className="text-start">
                <span className="text-gray-500">Remember Password? </span>
                <Link href="/login" className="font-bold text-gray-900 hover:underline">
                    Login
                </Link>
            </div>
        </div>
    );

    const renderSuccessStep = () => (
        <div className="w-full max-w-md mx-auto space-y-9 p-1">
            <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-gray-900" />
                </div>
                <h1 className="text-3xl font-bold mb-2">All Done!</h1>
                <p className="text-gray-500 mb-6">
                    Your password has been changed successfully
                </p>
                <Link
                    href="/login"
                    className="inline-block w-full bg-gray-900 text-white py-6 rounded-md hover:bg-gray-800 transition-colors duration-200 text-center"
                    style={{ borderRadius: "10px" }}
                >
                    Back to Login
                </Link>
            </div>
        </div>
    );

    return (
        <AuthLayout
            screenType={
                currentStep === "verify"
                    ? "reset-password"
                    : currentStep === "create"
                        ? "create-password"
                        : "success"
            }
        >
            {currentStep === "verify" && renderVerifyStep()}
            {currentStep === "create" && renderCreateStep()}
            {currentStep === "success" && renderSuccessStep()}
        </AuthLayout>
    );
}
