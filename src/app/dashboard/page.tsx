export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
            <span className="rounded-full bg-blue-100 p-2 text-blue-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold">2,345</p>
          <p className="mt-1 text-sm text-green-600">+12.5% from last month</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
            <span className="rounded-full bg-green-100 p-2 text-green-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold">$23,456</p>
          <p className="mt-1 text-sm text-green-600">+8.2% from last month</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Low Stock Items</h3>
            <span className="rounded-full bg-yellow-100 p-2 text-yellow-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold">15</p>
          <p className="mt-1 text-sm text-red-600">+5 items since last week</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500">Active Orders</h3>
            <span className="rounded-full bg-purple-100 p-2 text-purple-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </span>
          </div>
          <p className="mt-4 text-2xl font-semibold">126</p>
          <p className="mt-1 text-sm text-green-600">+3.2% from last week</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center gap-4 px-6 py-4">
              <div className="h-8 w-8 rounded-full bg-gray-200"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New order received</p>
                <p className="text-sm text-gray-500">Order #12345 - $123.45</p>
              </div>
              <span className="text-sm text-gray-500">2 hours ago</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

