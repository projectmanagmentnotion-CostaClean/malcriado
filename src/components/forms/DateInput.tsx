import { forwardRef, type InputHTMLAttributes } from "react";
import { TextInput } from "@/components/forms/TextInput";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  function DateInput(props, ref) {
    return <TextInput ref={ref} type="date" {...props} />;
  },
);
