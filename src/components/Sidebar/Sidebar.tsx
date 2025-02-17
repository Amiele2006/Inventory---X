"use client";

import { Search } from "lucide-react"
import { useState } from "react"

export default function Sidebar() {
    const [menuItems] = useState([
        { id: 1, title: "Dashboard", enabled: true },
        { id: 2, title: "Inventory", enabled: false },
        { id: 3, title: "Sales ", enabled: true },
    ])

    return (
        <aside className="flex h-screen w-64 flex-col justify-between bg-[#1C1C1C] p-4">
            {/* User Profile */}
            <div className="space-y-6">
                <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-600"></div>
                    <div>
                        <p className="text-sm font-medium text-white">Oliver Ray</p>
                        <button className="text-xs text-gray-400">•</button>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="search"
                        placeholder="Search"
                        className="w-full rounded-lg bg-[#2C2C2C] py-2 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-[#2C2C2C]">
                            <span className="text-sm text-gray-300">{item.title}</span>
                            <label className="relative inline-flex cursor-pointer items-center">
                                <input type="checkbox" defaultChecked={item.enabled} className="peer sr-only" />
                                <div className="h-5 w-8 rounded-full bg-gray-600 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full"></div>
                            </label>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Brand */}
            <div className="flex items-center space-x-2">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                >
                    <path
                        d="M20 3H4C2.89543 3 2 3.89543 2 5V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V5C22 3.89543 21.1046 3 20 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M16 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-sm font-medium text-white">Inventory</span>
            </div>
        </aside>
    )
}

