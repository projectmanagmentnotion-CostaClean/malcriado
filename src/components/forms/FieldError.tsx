interface FieldErrorProps {
  readonly id?: string;
  readonly message: string;
}

export function FieldError({ id, message }: FieldErrorProps) {
  return (
    <p className="field-error" id={id} role="alert">
      {message}
    </p>
  );
}
