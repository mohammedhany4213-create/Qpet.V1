import { Link } from 'react-router-dom';
import { PawPrint } from 'lucide-react';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dimensions =
    size === 'sm' ? 'h-8 w-8' : size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';
  const textSize =
    size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div
        className={`flex ${dimensions} items-center justify-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg shadow-primary-500/30 transition-transform group-hover:rotate-6 group-hover:scale-105`}
      >
        <PawPrint className="h-1/2 w-1/2 text-white" strokeWidth={2.5} />
      </div>
      <span
        className={`${textSize} font-display font-bold text-gray-800 tracking-tight`}
      >
        Qpet
      </span>
    </Link>
  );
}
