import React from 'react'
import type { Metadata } from 'next';
import Register from "@/app/(auth)/register/register"


export const metadata: Metadata = {
  title: 'Register Account - Inventory-X',
  description: '......'
};

const page = () => {
  return <Register />

}

export default page