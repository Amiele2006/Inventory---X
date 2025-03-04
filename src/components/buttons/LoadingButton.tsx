import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ButtonHTMLAttributes } from "react";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
  children: React.ReactNode;
}

export const LoadingButton = ({
  isLoading,
  loadingText = "Processing...",
  children,
  className = "",
  ...props
}: LoadingButtonProps) => {
  return (
    <button
      className={`w-full flex items-center justify-center space-x-2 px-4 py-3 bg-[#1C2331] text-white rounded-lg hover:bg-[#2A3441] transition-colors duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner className="text-white h-5 w-5" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}; 