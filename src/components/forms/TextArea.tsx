import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn("input-control input-control--textarea", className)}
      {...props}
    />
  );
}
