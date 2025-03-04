"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "nextjs13-progress";
import { Poppins } from "next/font/google";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { loginUser } from "@/lib/redux/authSlice";
import { FormInput } from "@/components/forms/FormInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { Mail, Eye, EyeOff } from "lucide-react";
import { toast } from 'sonner';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

interface LoginFormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address is Required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is Required"),
});

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: LoginFormValues, { setSubmitting }: any) => {
    try {
      const resultAction = await dispatch(loginUser(values));
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success('Login successful!');
        router.push("/");
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
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
    <AuthLayout screenType="login">
      <div className={`w-full max-w-md ${poppins.className} space-y-8 px-4 sm:px-6`}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back!
          </h1>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[#1C2331] font-bold hover:underline">
              Sign Up
            </Link>
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

              <LoadingButton
                type="submit"
                isLoading={isSubmitting || loading}
                loadingText="Logging in..."
              >
                Login
              </LoadingButton>
            </Form>
          )}
        </Formik>

        <div className="text-center">
          <Link
            href="/forgot-password"
            className="text-sm text-gray-500 hover:text-[#1C2331]"
          >
            Forgot Password? <span className="font-bold">Recover</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}