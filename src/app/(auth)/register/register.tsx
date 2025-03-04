"use client";
import { useState } from "react";
import { Link } from "nextjs13-progress";
import { Poppins } from "next/font/google";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { FormInput } from "@/components/forms/FormInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { Eye, EyeOff, Mail } from "lucide-react";

// Load the font
const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"],
});

interface RegisterFormValues {
    email: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email Address is Required"),
    password: Yup.string()
        .min(5, "Password must be at least 5 characters")
        .required("Password is Required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is Required"),
});

const initialValues: RegisterFormValues = {
    email: "",
    password: "",
    confirmPassword: "",
};

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        values: RegisterFormValues,
        { setSubmitting }: FormikHelpers<RegisterFormValues>
    ) => {
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

    const PasswordToggleButton = () => (
        <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
            </span>
        </button>
    );

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
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-6">
                            <FormInput
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="Enter your email"
                                icon={<Mail className="h-5 w-5" />}
                            />

                            <FormInput
                                id="password"
                                name="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                rightElement={<PasswordToggleButton />}
                            />

                            <FormInput
                                id="confirmPassword"
                                name="confirmPassword"
                                label="Confirm Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                rightElement={<PasswordToggleButton />}
                            />

                            <LoadingButton
                                type="submit"
                                isLoading={isSubmitting || isLoading}
                                loadingText="Creating Account..."
                            >
                                Sign Up
                            </LoadingButton>
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
