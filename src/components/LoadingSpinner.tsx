import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className = "h-5 w-5" }: LoadingSpinnerProps) => (
  <Loader2 className={`animate-spin ${className}`} />
); 