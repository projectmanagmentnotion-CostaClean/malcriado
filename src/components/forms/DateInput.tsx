import type { InputHTMLAttributes } from "react";
import { TextInput } from "@/components/forms/TextInput";

type DateInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function DateInput(props: DateInputProps) {
  return <TextInput type="date" {...props} />;
}
