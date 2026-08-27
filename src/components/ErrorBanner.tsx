import { AlertCircle, X } from 'lucide-react';

export default function ErrorBanner({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="animate-pop-in flex items-start gap-3 rounded-2xl border-2 border-error-200 bg-error-50 px-4 py-3">
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-error-500" />
      <p className="flex-1 font-body text-sm text-error-600">{message}</p>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="rounded-full p-1 text-error-400 transition-colors hover:bg-error-100 hover:text-error-600"
          aria-label="Dismiss error"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
