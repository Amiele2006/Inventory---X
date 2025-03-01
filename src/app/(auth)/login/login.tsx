"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Link } from "nextjs13-progress";
import { Poppins } from "next/font/google";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { loginUser } from "@/lib/redux/authSlice";
import { Loader } from "lucide-react";

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
    .required("Password is Required"),
});

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: { email: string; password: string }) => {
    const resultAction = await dispatch(loginUser(values));
    if (loginUser.fulfilled.match(resultAction)) {
      router.push("/");
    }
  };

  return (
    <AuthLayout screenType="login">
      <div className="w-full max-w-md space-y-6 px-4 sm:px-6">
        <div className="space-y-2">
          <div className={poppins.className}>
            <h1 className="text-4xl font-semibold text-foreground">
              Welcome back!
            </h1>
            <p className="text-foreground">
              Don&apos;t have an account?
              <span className="text-#1C2331-500 hover:underline font-extrabold ms-2">
                <Link href="/register">Sign Up</Link>
              </span>
            </p>
          </div>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5">
              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className={`block text-foreground ${poppins.className}`}
                >
                  Email Address
                </label>
                <div className="relative">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    style={{ borderRadius: "8px" }}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border px-4 py-2 focus:border-[#1C2331]-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 form-input"
                  />
                  <svg
                    className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
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
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-3"
                />
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="password"
                  className={`block font-poppins text-foreground`}
                >
                  Password
                </label>
                <div className="relative">
                  <Field
                    id="password"
                    type={showPassword ? "password" : "text"}
                    name="password"
                    placeholder="Enter your password "
                    style={{ borderRadius: "8px" }}
                    className="w-full rounded-lg border px-4 py-2.5 pr-10 text-foreground border-blue-300"
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
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {error && <div className="text-red-500 text-sm">{error}</div>}

              <button
                type="submit"
                disabled={isSubmitting || loading}
                style={{ borderRadius: "10px" }}
                className="w-full rounded-lg bg-[#1C2331] px-6 py-3 text-lg text-white transition-colors hover:bg-[#1C2331]-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin h-5 w-5 mr-3 text-white" />
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </Form>
          )}
        </Formik>
        <div className="space-y-4">
          <div className="text-start text-sm">
            <Link
              href="/forgot-password"
              className="text-sm text-muted-foreground"
            >
              Forgot Password? <span className="text-[#1C2331]">Recover</span>
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}