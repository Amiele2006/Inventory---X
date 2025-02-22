import React from 'react'
import type { Metadata } from 'next';
import Onboarding from "@/app/(auth)/onboarding/onboarding"


export const metadata: Metadata = {
  title: 'Login-Inventory-X',
  description: '......'
};

const page = () => {
  return <Onboarding />

}

export default page