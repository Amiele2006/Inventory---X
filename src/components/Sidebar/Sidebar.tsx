"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Poppins } from "next/font/google"
import {
    LayoutDashboard,
    Box,
    Users,
    ShoppingCart,
    Settings,
    Menu,
    Bell,
    Search,
    ChevronDown,
    X,
    LogOut,
} from "lucide-react"

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
})

interface SidebarProps {
    isOpen: boolean
    onClose: () => void
}

const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Inventory", href: "/inventory", icon: Box },
    { name: "Customers", href: "/customers", icon: Users },
    { name: "Orders", href: "/orders", icon: ShoppingCart },
    { name: "Settings", href: "/settings", icon: Settings },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname()

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:static lg:inset-auto lg:w-64`}
            >
                {/* Sidebar Header */}
                <div className="flex h-16 items-center justify-between px-4 border-b">
                    <Link href="/dashboard" className="flex items-center space-x-2">
                        <div className="relative h-8 w-8">
                            <Image
                                src="/logo.png"
                                alt="Inventory X Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-xl font-semibold text-gray-900">Inventory X</span>
                    </Link>
                    <button
                        className="lg:hidden"
                        onClick={onClose}
                    >
                        <X className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="space-y-1 px-2 py-4">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <item.icon
                                    className={`h-5 w-5 ${
                                        isActive ? "text-blue-600" : "text-gray-400"
                                    }`}
                                />
                                <span>{item.name}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile Section */}
                <div className="absolute bottom-0 left-0 right-0 border-t p-4">
                    <div className="flex items-center space-x-3">
                        <div className="relative h-10 w-10">
                            <Image
                                src="/avatar.png"
                                alt="User Avatar"
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                John Doe
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                john.doe@example.com
                            </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <LogOut className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

