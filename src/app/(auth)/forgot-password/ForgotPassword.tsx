"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Mail } from "lucide-react";
import AuthLayout from "@/components/AuthLayout/AuthLayout";
import { Poppins } from "next/font/google";
import { Link } from "nextjs13-progress";
import {Loader} from "lucide-react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Password reset requested for:", values.email);
    },
  });

  return (
    <>
      <AuthLayout screenType="forgot-password">
        <div className="w-full max-w-md mx-auto space-y-6 p-6">
          <div className={`space-y-2 text-start ${poppins.className}`}>
            <h1 className="text-4xl font-bold tracking-tight">
              Forgot Password?
            </h1>
            <p className="text-gray-500">
              No worries, we&apos;ll send you reset instructions.
            </p>

          </div>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  style={{ borderRadius: "8px" }}
                  className={`w-full rounded-lg border px-4 py-2.5 pr-10 text-foreground border-blue-300 pl-10 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none
                ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                />
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-8 rounded-lg bg-[#1C2331] px-6 py-4 text-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              style={{ borderRadius: "10px" }}
              disabled={formik.isSubmitting}
            >
              Reset Password
            </button>
          </form>

          <div className="text-center">
            <span className="text-gray-500">Remember Password? </span>
            <Link
              href="/login"
              className="font-medium text-gray-900 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </AuthLayout>
    </>
  );
}
