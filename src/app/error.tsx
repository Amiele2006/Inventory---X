"use client"

import Link from "next/link"
import Image from "next/image"
import { type FC, useEffect, useState } from "react"
import ErrorDark from "@/images/error-dark.svg"
import ErrorLight from "@/images/error-light.svg"
import { RefreshCw, Home, ChevronRight } from "lucide-react"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Error: FC<ErrorProps> = ({ error, reset }) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    console.error("Inventory app error:", error)
  }, [error])

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      reset()
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-svh flex items-center justify-center p-9">
      <div className="max-w-3xl w-full dark:bg-gray-800 rounded-lg overflow-hidden">
        <div className="p-8 flex flex-col items-center">
          <div className="relative w-48 h-48 mb-6 animate-pulse">
            <Image
              src={ErrorDark || "/placeholder.svg"}
              fill
              alt="Inventory Error"
              quality={90}
              className="hidden dark:block object-contain"
            />
            <Image
              src={ErrorLight || "/placeholder.svg"}
              fill
              alt="Inventory Error"
              quality={90}
              className="block dark:hidden object-contain"
            />
          </div>

          <div className="space-y-4 text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Inventory System Error</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              We encountered a problem while processing your inventory request. This might be due to connectivity issues
              or data inconsistency.
            </p>
            {error.digest && (
              <p className="text-xs text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 py-1 px-2 rounded-full inline-block">
                Error reference: {error.digest}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <button
              onClick={handleReset}
              disabled={isLoading}
              className={`flex items-center gap-2 px-9 py-3 text-sm font-medium rounded-full bg-[#1C2331] text-white hover:bg-[#1C2331] transition-all duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
              {isLoading ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
              {isLoading ? "Retrying..." : "Retry Operation"}
            </button>

            <Link href="/dashboard">
              <button className="flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border-2 border-[#1C2331] text-dark-600">
                <Home className="h-4 w-4" />
                Back to Dashboard
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If the problem persists, please contact our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              support team
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Error

