import React from "react"

export default function AuthLayout({ children }: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yNIY103n9xP9S9XHlP0KtaczfDUZll.png"
          alt="Warehouse interior"
          className="h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900/90 p-6 text-white">
          <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </div>
          <p className="mb-4 text-sm leading-relaxed">
            "Inventory X has completely transformed the way our company approaches stock. The sheer range of
            capabilities and the seamless integration of the design system into our workflow have been game-changing."
          </p>
          <div className="space-y-1">
            <p className="font-semibold">Visual Designer, Google</p>
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-white/20"></div>
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="h-2 w-2 rounded-full bg-white/20"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2">{children}</div>
    </div>
  )
}

