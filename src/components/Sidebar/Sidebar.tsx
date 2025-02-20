"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Package,
    DollarSign,
    Tag,
    Store,
    BarChart2,
    MessageSquare,
    Settings,
    HelpCircle,
    Search,
} from "lucide-react"

const menuItems = [
    { icon: LayoutDashboard, name: "Dashboard", href: "/dashboard" },
    { icon: Package, name: "Inventory", href: "/dashboard/inventory" },
    { icon: DollarSign, name: "Sales", href: "/dashboard/sales" },
    { icon: Tag, name: "Promotions", href: "/dashboard/promotions" },
    { icon: Store, name: "Storefront", href: "/dashboard/storefront" },
    { icon: BarChart2, name: "Analytics", href: "/dashboard/analytics" },
    { icon: MessageSquare, name: "Chat", href: "/dashboard/chat" },
]

export function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-screen w-64 flex-col bg-white border-r">
            <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                    <img
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sL5cLYaj59qhPtsoLZpAYbU0ybAD6z.png"
                        alt="Avatar"
                        className="h-8 w-8 rounded-full"
                    />
                    <div>
                        <p className="text-sm font-medium">Alison Eye</p>
                        <p className="text-xs text-gray-500">alison@gmail.ai</p>
                    </div>
                </div>
                <div className="mt-4 relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search"
                        style={{borderRadius:"5px"}}
                        className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-3 px-3">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                style={{borderRadius:"5px"}}
                                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm ${pathname === item.href ? "bg-[#1C2331] text-white" : "text-black"
                                    }`}
                            >
                                <item.icon className="h-5 w-5" />
                                <span>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="border-t p-4">
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/dashboard/settings"
                            className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                        >
                            <Settings className="h-5 w-5" />
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/dashboard/help"
                            className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm text-gray-600 hover:bg-gray-50"
                        >
                            <HelpCircle className="h-5 w-5" />
                            <span>Help</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

