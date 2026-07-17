import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  readonly label: ReactNode;
}

export function Checkbox({ className, label, ...props }: CheckboxProps) {
  return (
    <label className={cn("checkbox-field", className)}>
      <input type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  );
}
