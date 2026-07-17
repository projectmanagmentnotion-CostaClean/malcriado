import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface FormFieldProps {
  readonly label: string;
  readonly htmlFor: string;
  readonly description?: string;
  readonly error?: string;
  readonly required?: boolean;
  readonly className?: string;
  readonly children: ReactNode;
}

export function FormField({
  label,
  htmlFor,
  description,
  error,
  required = false,
  className,
  children,
}: FormFieldProps) {
  return (
    <label className={cn("form-field", className)} htmlFor={htmlFor}>
      <span className="form-field__label">
        {label}
        {required ? <span aria-hidden="true"> *</span> : null}
      </span>
      {description ? (
        <span className="form-field__description" id={`${htmlFor}-description`}>
          {description}
        </span>
      ) : null}
      {children}
      {error ? (
        <span className="field-error" id={`${htmlFor}-error`}>
          {error}
        </span>
      ) : null}
    </label>
  );
}
