"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Poppins } from "next/font/google";
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
  Loader2,
  TrendingUp,
  DollarSign,
  Package,
  AlertCircle
} from "lucide-react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  loading?: boolean;
  className?: string;
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Inventory", href: "/inventory", icon: Box },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Settings", href: "/settings", icon: Settings },
];

// Reusable Loading Spinner
const LoadingSpinner = () => (
  <Loader2 className="h-5 w-5 animate-spin text-white" />
);

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, trend, loading, className }: StatCardProps) => (
  <div className={`rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50 ${className}`}>
    <div className="flex items-center justify-between">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <div className="rounded-full bg-blue-50 p-2 text-blue-600">
        {icon}
      </div>
    </div>
    <div className="mt-4">
      {loading ? (
        <div className="flex items-center space-x-2">
          <LoadingSpinner />
          <span className="text-gray-400">Loading...</span>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-semibold text-gray-900">{value}</h3>
          {trend && (
            <p className="mt-1 flex items-center text-sm">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">{trend}</span>
              <span className="ml-1 text-gray-600">vs last month</span>
            </p>
          )}
        </>
      )}
    </div>
  </div>
);

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading] = useState(false);
  const pathname = usePathname();

  // Example stats data
  const stats = [
    {
      title: "Total Revenue",
      value: "$45,231.89",
      icon: <DollarSign className="h-5 w-5" />,
      trend: "+20.1%"
    },
    {
      title: "Total Orders",
      value: "2,345",
      icon: <ShoppingCart className="h-5 w-5" />,
      trend: "+15.2%"
    },
    {
      title: "Products in Stock",
      value: "12,456",
      icon: <Package className="h-5 w-5" />,
      trend: "+2.3%"
    },
    {
      title: "Low Stock Alerts",
      value: "5",
      icon: <AlertCircle className="h-5 w-5" />,
      className: "border-l-4 border-amber-500"
    }
  ];

  return (
    <div className={`${poppins.className} min-h-screen bg-gray-50`}>
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-auto lg:w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Box className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-semibold text-gray-900">Inventory X</span>
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 px-2 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
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
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex flex-1 flex-col ${sidebarOpen ? "lg:pl-64" : ""}`}>
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-gray-500 focus:outline-none lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="search"
                  placeholder="Search..."
                  className="w-72 rounded-lg border-gray-200 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative text-gray-500 hover:text-gray-600">
              <Bell className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                2
              </span>
            </button>

            {/* User Menu */}
            <div className="relative">
              <button className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                <span className="hidden text-sm font-medium text-gray-700 md:block">
                  John Doe
                </span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content with Stats Grid */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                trend={stat.trend}
                loading={isLoading}
                className={stat.className}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200/50">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 