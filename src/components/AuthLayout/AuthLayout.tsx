"use client";
import type React from "react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import WareHouse from "@/images/warehouse.jpeg";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

type AuthLayoutProps = {
  children: React.ReactNode;
  screenType: "login" | "register" | "onboarding";
};

export default function AuthLayout({ children, screenType }: AuthLayoutProps) {
  const getContent = () => {
    switch (screenType) {
      case "onboarding":
        return {
          title: "You are almost there!",
          description:
            "Complete your setup to unlock seamless inventory tracking, sales management, and real-time insights.",
          showTestimonial: false,
        };
      default:
        return {
          title: "Inventory X",
          description: "Transforming inventory management",
          testimonial:
            "Inventory X has completely transformed the way our company approaches stock. The sheer range of capabilities and the seamless integration of the design system into our workflow have been game-changing.",
          author: "Visual Designer, Google",
          showTestimonial: true,
        };
    }
  };

  const content = getContent();

  return (
    <div className={`flex min-h-screen ${poppins.className}`}>
      <div className="relative hidden w-1/2 lg:block">
        <div className="absolute left-6 top-6 z-10 flex flex-col items-start">
          <div className={poppins.className}>
            <div className="flex items-center">
              <span className="text-xl text-white ms-5 mt-5 font-bold">
                Inventory X
              </span>
            </div>
          </div>
        </div>
        <Image
          src={WareHouse}
          alt="Warehouse interior"
          className="h-full w-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-black/80" />

        {screenType === "onboarding" ? (
          <div className="absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 text-white">
            <h1 className="mb-4 text-7xl font-extrabold leading-tight">
              You are <br /> almost there!
            </h1>
            <p className="text-lg text-gray-300">{content.description}</p>
          </div>
        ) : (
          <div className="absolute left-1/2 top-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-slate-900/100 p-6 text-white">
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
            <p className="mb-4 text-sm leading-relaxed break-words">
              "{content.testimonial}"
            </p>
            <div className="space-y-1">
              <p className="font-semibold">{content.author}</p>
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-white/20"></div>
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <div className="h-2 w-2 rounded-full bg-white/20"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex w-full items-center justify-center lg:w-1/2">
        {children}
      </div>
    </div>
  );
}
