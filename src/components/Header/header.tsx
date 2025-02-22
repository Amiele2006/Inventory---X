"use client"

import Link from "next/link"
import { Bell, Settings, User } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6">
      <div className="flex flex-1 items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          Alison Store
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-400">Dashboard</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-gray-100 rounded-full">
          <Bell className="h-5 w-5 text-gray-600" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Settings className="h-5 w-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <User className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  )
}

