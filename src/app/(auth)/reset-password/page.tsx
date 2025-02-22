import React from 'react'
import type { Metadata } from 'next';
import Reset_Password from "@/app/(auth)/reset-password/reset-password"


export const metadata: Metadata = {
    title: 'Forgot-Password-Inventory-X',
    description: '......'
};

const page = () => {
    return <Reset_Password />

}

export default page