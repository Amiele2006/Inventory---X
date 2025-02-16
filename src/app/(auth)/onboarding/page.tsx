"use client";
import AuthLayout from '@/components/AuthLayout/AuthLayout';
import React, { useState } from 'react';


export default function OnboardingForm() {
  const [step, setStep] = useState(1)
  const totalSteps = 3

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }
return (
  <AuthLayout screenType='onboarding'>
  <div className="w-full max-w-lg px-6">
    <div className="mb-1 flex items-center justify-center">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${index + 1 === step ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
              }`}
          >
            {index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`mx-2 h-[2px] w-16 ${index + 1 < step ? "bg-blue-500" : "bg-gray-200"}`}></div>
          )}
        </div>
      ))}
    </div>

    <div className="space-y-6">
      {step === 1 ? (
        <>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Account & Business Details</h1>
            <p className="mt-2 text-sm text-gray-500">
              Start by setting up your account and business details for a personalized experience.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleNext()
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your business name"
                />
              </div>

              <div>
                <label htmlFor="businessAddress" className="block text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <input
                  type="text"
                  id="businessAddress"
                  name="businessAddress"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter your business address"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="industryType" className="block text-sm font-medium text-gray-700">
                    Industry Type
                  </label>
                  <select
                    id="industryType"
                    name="industryType"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select industry</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="ecommerce">E-commerce</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="warehouseCount" className="block text-sm font-medium text-gray-700">
                    Number of Warehouses/Stores
                  </label>
                  <select
                    id="warehouseCount"
                    name="warehouseCount"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Select number</option>
                    <option value="1">1</option>
                    <option value="2-5">2-5</option>
                    <option value="6-10">6-10</option>
                    <option value="11+">11+</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                Next
              </button>
            </div>
          </form>
        </>
      ) : step === 2 ? (
        <>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Inventory & Sales</h1>
            <p className="mt-2 text-sm text-gray-500">
              Set up how you track stock, handle purchases, and manage sales
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleNext()
            }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Primary Inventory Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Enter location"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="stockUnit" className="block text-sm font-medium text-gray-700">
                    Default Stock Unit
                  </label>
                  <select
                    id="stockUnit"
                    name="stockUnit"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="pieces">Pieces</option>
                    <option value="kg">Kilograms</option>
                    <option value="units">Units</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="badGoods" className="block text-sm font-medium text-gray-700">
                    Bad Goods Handling
                  </label>
                  <select
                    id="badGoods"
                    name="badGoods"
                    className="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="return">Return to Supplier</option>
                    <option value="dispose">Dispose</option>
                    <option value="repair">Repair</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="reorderThreshold" className="block text-sm font-medium text-gray-700">
                    Default Re-order Threshold
                  </label>
                  <input
                    type="number"
                    id="reorderThreshold"
                    name="reorderThreshold"
                    className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Enter threshold"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="discounts" className="text-sm font-medium text-gray-700">
                    Enable Discount Functionality
                  </label>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-blue-500/20"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="returns" className="text-sm font-medium text-gray-700">
                    Enable Return Tracking
                  </label>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-blue-500/20"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="storefront" className="text-sm font-medium text-gray-700">
                    Enable Storefront
                  </label>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-blue-500/20"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <label htmlFor="onlineOrders" className="text-sm font-medium text-gray-700">
                    Allow Online Orders
                  </label>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-blue-500/20"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Back
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-500 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                Next
              </button>
            </div>
          </form>
        </>
      ) : null}
    </div>
  </div>
  </AuthLayout>
)
}

