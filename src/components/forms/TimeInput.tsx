import { forwardRef, type InputHTMLAttributes } from "react";
import { TextInput } from "@/components/forms/TextInput";

type TimeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

export const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  function TimeInput(props, ref) {
    return <TextInput ref={ref} type="time" {...props} />;
  },
);
