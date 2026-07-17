import { StatusMessage } from "@/components/ui/StatusMessage";

interface LoadingStateProps {
  readonly title?: string;
  readonly body?: string;
}

export function LoadingState({
  title = "Cargando",
  body = "Preparando el contenido sin ocultar informacion esencial.",
}: LoadingStateProps) {
  return (
    <StatusMessage title={title} tone="pending">
      <p>{body}</p>
    </StatusMessage>
  );
}
