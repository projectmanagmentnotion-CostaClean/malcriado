import { StatusMessage } from "@/components/ui/StatusMessage";

interface ErrorStateProps {
  readonly title?: string;
  readonly body: string;
}

export function ErrorState({
  title = "No se ha podido mostrar este bloque",
  body,
}: ErrorStateProps) {
  return (
    <StatusMessage title={title} tone="danger">
      <p>{body}</p>
    </StatusMessage>
  );
}
