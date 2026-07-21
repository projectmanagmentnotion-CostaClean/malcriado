import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput({ className, ...props }, ref) {
    return (
      <input className={cn("input-control", className)} ref={ref} {...props} />
    );
  },
);
