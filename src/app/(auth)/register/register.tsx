"use client";
import { useState } from "react";
import {Link} from "nextjs13-progress";
import { Poppins } from "next/font/google";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Loader } from "lucide-react";

// Load the font
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is Required... "),
    password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is Required... "),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Confirm Password is Required"),
});

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: any, { setSubmitting }: any) => {
        setIsLoading(true);
        try {
            // Your registration logic here
            console.log(values);
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        } catch (error) {
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <AuthLayout screenType="register">
            <div className={`w-full max-w-md ${poppins.className} space-y-8 px-4 sm:px-6`}>
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Create an Account!
                    </h1>
                    <p className="text-sm text-gray-500">
                        Sign up to gain real-time control over your stock
                    </p>
                </div>

                <Formik
                    initialValues={{ email: "", password: "", confirmPassword: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className={`block ${poppins.className} text-sm font-medium text-gray-700`}
                                >
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        style={{borderRadius:"8px"}}
                                        placeholder="Enter your email"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1C2331] focus:outline-none focus:ring-2 focus:ring-[#1C2331]/20"
                                    />
                                    <svg
                                        className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="password"
                                    className={`block ${poppins.className} text-sm font-medium text-gray-700`}
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Field
                                        id="password"
                                        name="password"
                                        style={{borderRadius:"8px"}}
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1C2331] focus:outline-none focus:ring-2 focus:ring-[#1C2331]/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                                    </button>
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div className="space-y-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className={`block ${poppins.className} text-sm font-medium text-gray-700`}
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Field
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showPassword ? "text" : "password"}
                                        style={{borderRadius:"8px"}}
                                        placeholder="Confirm your password"
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1C2331] focus:outline-none focus:ring-2 focus:ring-[#1C2331]/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                                    </button>
                                </div>
                                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isLoading}
                                style={{borderRadius:"8px"}}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#1C2331] text-white rounded-lg hover:bg-[#2A3441] transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader className="animate-spin h-5 w-5 mr-3 text-white" />
                                        <span>Creating Account...</span>
                                    </>
                                ) : (
                                    <span>Sign Up</span>
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>

                <p className="text-center text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link href="/login" className="text-[#1C2331] font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
}
