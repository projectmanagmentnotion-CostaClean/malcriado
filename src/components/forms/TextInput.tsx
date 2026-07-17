import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextInputProps = InputHTMLAttributes<HTMLInputElement>;

export function TextInput({ className, ...props }: TextInputProps) {
  return <input className={cn("input-control", className)} {...props} />;
}
