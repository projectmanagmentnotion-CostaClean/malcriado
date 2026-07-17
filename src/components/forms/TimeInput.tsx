import type { InputHTMLAttributes } from "react";
import { TextInput } from "@/components/forms/TextInput";

type TimeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export function TimeInput(props: TimeInputProps) {
  return <TextInput type="time" {...props} />;
}
