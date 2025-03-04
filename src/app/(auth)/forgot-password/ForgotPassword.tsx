"use client"

import { useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Mail, Loader2, CheckCircle, X } from "lucide-react"
import { Poppins } from "next/font/google"
import Link from "next/link"
import AuthLayout from "@/components/AuthLayout/AuthLayout"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
})

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")

  const handleSubmit = async (values: { email: string }) => {
    setIsSubmitting(true)

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store the email and show success modal
      setSubmittedEmail(values.email)
      setShowModal(true)

      console.log("Password reset requested for:", values.email)
    } catch (error) {
      console.error("Error:", error)
      // Handle error case if needed
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout screenType="forgot-password">
      <div className="w-full max-w-md mx-auto space-y-6 p-6">
        <div className={`space-y-2 text-start ${poppins.className}`}>
          <h1 className="text-4xl font-bold tracking-tight">Forgot Password?</h1>
          <p className="text-gray-500">No worries, we&apos;ll send you reset instructions.</p>
        </div>

        <Formik initialValues={{ email: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={`w-full rounded-lg border px-4 py-2.5 pr-10 text-foreground border-blue-300 pl-10 focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none
                    ${touched.email && errors.email ? "border-red-500" : "border-gray-300"}`}
                    style={{ borderRadius: "8px" }}
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {touched.email && errors.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
              </div>

              <button
                type="submit"
                className="w-full mt-8 rounded-lg bg-[#1C2331] px-6 py-4 text-lg text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50"
                style={{ borderRadius: "10px" }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    <span>Sending Reset Email Link</span>
                  </div>
                ) : (
                  "Reset Password"
                )}
              </button>
            </Form>
          )}
        </Formik>

        <div className="text-center">
          <span className="text-gray-500">Remember Password? </span>
          <Link href="/login" className="font-medium text-gray-900 hover:underline">
            Login
          </Link>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center space-y-4">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>

              <h3 className={`text-xl font-semibold ${poppins.className}`}>Reset Instructions Sent</h3>

              <p className="text-gray-600">
                We've sent password reset instructions to <span className="font-medium">{submittedEmail}</span>. Please
                check your email inbox.
              </p>

              <p className="text-sm text-gray-500 mt-2">If you don't see the email, check your spam folder.</p>

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 w-full rounded-lg bg-[#1C2331] px-6 py-3 text-white transition-colors hover:bg-opacity-90"
                style={{ borderRadius: "8px" }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </AuthLayout>
  )
}

