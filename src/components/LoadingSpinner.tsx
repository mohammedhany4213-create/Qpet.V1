import { Loader2 } from 'lucide-react';

export default function LoadingSpinner({
  size = 24,
  label,
  className = '',
}: {
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2
        className="text-primary-500 animate-spin"
        size={size}
        strokeWidth={2.5}
      />
      {label && (
        <p className="font-body text-sm text-gray-500 animate-pulse">{label}</p>
      )}
    </div>
  );
}
