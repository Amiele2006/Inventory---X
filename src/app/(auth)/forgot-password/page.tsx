import React from 'react'
import type { Metadata } from 'next';
import ForgotPassword from "@/app/(auth)/forgot-password/ForgotPassword"


export const metadata: Metadata = {
	title: 'Forgot-PassWord-Inventory-X',
	description: '......'
};

const page = () => {
  return <ForgotPassword />
  
}

export default page