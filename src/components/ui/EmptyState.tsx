import { StatusMessage } from "@/components/ui/StatusMessage";

interface EmptyStateProps {
  readonly title: string;
  readonly body: string;
}

export function EmptyState({ title, body }: EmptyStateProps) {
  return (
    <StatusMessage title={title} tone="muted">
      <p>{body}</p>
    </StatusMessage>
  );
}
