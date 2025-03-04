import { Field, ErrorMessage } from "formik";
import { ReactNode, forwardRef } from "react";

interface FormInputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
  className?: string;
  inputRef?: (element: HTMLInputElement | null) => void;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
  id,
  name,
  label,
  type = "text",
  placeholder,
  icon,
  rightElement,
  className,
  inputRef,
}, ref) => {
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
          innerRef={(el: HTMLInputElement | null) => {
            // Handle both refs
            if (typeof ref === 'function') {
              ref(el);
            } else if (ref) {
              ref.current = el;
            }
            if (inputRef) {
              inputRef(el);
            }
          }}
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
});

FormInput.displayName = 'FormInput'; 