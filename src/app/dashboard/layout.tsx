import type React from "react"
import { Sidebar } from "@/components/Sidebar/Sidebar.tsx"
import Head from "next/head"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="This is the dashboard layout" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </>
  )
}