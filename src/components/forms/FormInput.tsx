import { Field, ErrorMessage } from "formik";
import { ReactNode } from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  className?: string;
}

export const FormInput = ({
  id,
  name,
  label,
  type = "text",
  placeholder,
  icon,
  rightElement,
  className,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative">
        <Field
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#1C2331] focus:outline-none focus:ring-2 focus:ring-[#1C2331]/20 ${className}`}
        />
        {icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        {rightElement}
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
}; 