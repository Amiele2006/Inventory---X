import React from 'react'
import type { Metadata } from 'next';
import Login from "@/app/(auth)/login/login"


export const metadata: Metadata = {
	title: 'Login-Inventory-X',
	description: '......'
};

const page = () => {
  return <Login />
  
}

export default page