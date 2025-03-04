"use client"

import { useState } from "react"
import { Link } from "nextjs13-progress"
import { Poppins } from "next/font/google"
import AuthLayout from "@/components/AuthLayout/AuthLayout"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { FormInput } from "@/components/forms/FormInput"
import { LoadingButton } from "@/components/buttons/LoadingButton"
import { Mail } from "lucide-react"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
})

interface ForgotPasswordFormValues {
  email: string
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address is Required"),
})

const initialValues: ForgotPasswordFormValues = {
  email: "",
}

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: ForgotPasswordFormValues, { setSubmitting }: any) => {
    setIsLoading(true)
    try {
      // Your password reset logic here
      console.log(values)
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
    } catch (error) {
      console.error('Password reset failed:', error)
    } finally {
      setIsLoading(false)
      setSubmitting(false)
    }
  }

  return (
    <AuthLayout screenType="forgot-password">
      <div className={`w-full max-w-md ${poppins.className} space-y-8 px-4 sm:px-6`}>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Forgot Password?
          </h1>
          <p className="text-sm text-gray-500">
            Don&apos;t worry! It happens. Please enter your email address and we&apos;ll send you a link to reset your password.
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

              <LoadingButton
                type="submit"
                isLoading={isSubmitting || isLoading}
                loadingText="Sending Reset Link..."
              >
                Send Reset Link
              </LoadingButton>
            </Form>
          )}
        </Formik>

        <p className="text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link href="/login" className="text-[#1C2331] font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  )
}

