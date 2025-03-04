"use client"

import type React from "react"

import { useFormik } from "formik"
import * as Yup from "yup"
import { useRef, useEffect, useState } from "react"
import { Check, Loader2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { Poppins } from "next/font/google"
import AuthLayout from "@/components/AuthLayout/AuthLayout"

type ResetStep = "verify" | "create" | "success"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
})

const otpValidationSchema = Yup.object({
  otp: Yup.array().of(Yup.string().required().length(1)).length(4).required("Please enter the verification code"),
})

const passwordValidationSchema = Yup.object({
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
})

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState<ResetStep>("verify")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const otpFormik = useFormik({
    initialValues: {
      otp: ["", "", "", ""],
    },
    validationSchema: otpValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("Verification code:", values.otp.join(""))
        setCurrentStep("create")
      } catch (error) {
        console.error("Error verifying code:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log("New password:", values.password)
        setCurrentStep("success")
      } catch (error) {
        console.error("Error setting password:", error)
      } finally {
        setIsSubmitting(false)
      }
    },
  })

  const handleInput = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otpFormik.values.otp]
    newOtp[index] = value
    otpFormik.setFieldValue("otp", newOtp)

    // Auto-advance to next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpFormik.values.otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text")
    const digits = pastedData.replace(/\D/g, "").split("").slice(0, 4)

    if (digits.length) {
      const newOtp = [...otpFormik.values.otp]
      digits.forEach((digit, index) => {
        if (index < 4) newOtp[index] = digit
      })
      otpFormik.setFieldValue("otp", newOtp)

      // Focus the appropriate field after paste
      if (digits.length < 4) {
        inputRefs[digits.length].current?.focus()
      }
    }
  }

  useEffect(() => {
    if (currentStep === "verify") {
      inputRefs[0]?.current?.focus()
    }
  }, [currentStep]) // Removed inputRefs from dependencies

  const renderVerifyStep = () => (
    <div className="w-full max-w-md mx-auto space-y-8 p-1">
      <div className="space-y-2">
        <h1 className={`text-3xl font-bold tracking-tight ${poppins.className}`}>Password Reset</h1>
        <p className="text-gray-500">
          We sent a code to emily@projectx.com. Didn&apos;t receive the email?{" "}
          <button
            type="button"
            className="text-gray-900 font-medium hover:underline focus:outline-none focus:underline"
            onClick={() => console.log("Resend code")}
          >
            Resend
          </button>
        </p>
      </div>

      <form onSubmit={otpFormik.handleSubmit} className="space-y-6">
        <div>
          <div className="flex gap-3 justify-between" onPaste={handlePaste}>
            {[0, 1, 2, 3].map((index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                style={{borderRadius:"8px"}}
                maxLength={1}
                className="w-14 h-14 text-center text-2xl font-semibold border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                value={otpFormik.values.otp[index]}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onBlur={otpFormik.handleBlur}
                inputMode="numeric"
                aria-label={`Digit ${index + 1} of verification code`}
              />
            ))}
          </div>
          {otpFormik.touched.otp && otpFormik.errors.otp && (
            <div className="text-red-500 text-sm mt-2" role="alert">
              {typeof otpFormik.errors.otp === "string" ? otpFormik.errors.otp : "Please enter a valid code"}
            </div>
          )}
        </div>

        <button
          type="submit"
          style={{borderRadius:"8px"}}
          className="w-full bg-gray-900 text-white py-5 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !otpFormik.values.otp.every(Boolean)}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Verifying...</span>
            </div>
          ) : (
            "Continue"
          )}
        </button>
      </form>

      <div className="text-start">
        <span className="text-gray-500">Remember Password? </span>
        <Link href="/login" className="font-medium text-gray-900 hover:underline">
          Login
        </Link>
      </div>
    </div>
  )

  const renderCreateStep = () => (
    <div className="w-full max-w-md mx-auto space-y-8 p-1">
      <div className="space-y-2">
        <h1 className={`text-3xl font-bold tracking-tight ${poppins.className}`}>Create New Password</h1>
        <p className="text-gray-500">Must be at least 8 characters.</p>
      </div>

      <form onSubmit={passwordFormik.handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                style={{borderRadius:"8px"}}
                {...passwordFormik.getFieldProps("password")}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                aria-invalid={passwordFormik.touched.password && Boolean(passwordFormik.errors.password)}
                aria-describedby={
                  passwordFormik.touched.password && passwordFormik.errors.password ? "password-error" : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {passwordFormik.touched.password && passwordFormik.errors.password && (
              <div id="password-error" className="text-red-500 text-sm mt-1" role="alert">
                {passwordFormik.errors.password}
              </div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                {...passwordFormik.getFieldProps("confirmPassword")}
                style={{borderRadius:"8px"}}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
                aria-invalid={passwordFormik.touched.confirmPassword && Boolean(passwordFormik.errors.confirmPassword)}
                aria-describedby={
                  passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword
                    ? "confirm-password-error"
                    : undefined
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {passwordFormik.touched.confirmPassword && passwordFormik.errors.confirmPassword && (
              <div id="confirm-password-error" className="text-red-500 text-sm mt-1" role="alert">
                {passwordFormik.errors.confirmPassword}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          style={{borderRadius:"8px"}}
          className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              <span>Creating Password...</span>
            </div>
          ) : (
            "Create Password"
          )}
        </button>
      </form>

      <div className="text-start">
        <span className="text-gray-500">Remember Password? </span>
        <Link href="/login" className="font-medium text-gray-900 hover:underline">
          Login
        </Link>
      </div>
    </div>
  )

  const renderSuccessStep = () => (
    <div className="w-full max-w-md mx-auto space-y-8 p-1">
      <div className="text-center">
        <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${poppins.className}`}>All Done!</h1>
        <p className="text-gray-500 mb-6">Your password has been changed successfully</p>
        <Link
          href="/login"
          style={{borderRadius:"8px"}}
          className="inline-block w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-center"
        >
          Back to Login
        </Link>
      </div>
    </div>
  )

  return (
    <AuthLayout
      screenType={
        currentStep === "verify" ? "reset-password" : currentStep === "create" ? "create-password" : "success"
      }
    >
      {currentStep === "verify" && renderVerifyStep()}
      {currentStep === "create" && renderCreateStep()}
      {currentStep === "success" && renderSuccessStep()}
    </AuthLayout>
  )
}

