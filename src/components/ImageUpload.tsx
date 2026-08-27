import { useRef, useState } from 'react';
import { ImagePlus, X, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({
  preview,
  onSelect,
  onClear,
  error,
}: {
  preview: string | null;
  onSelect: (file: File) => void;
  onClear: () => void;
  error?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      onSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  if (preview) {
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-3xl border-2 border-primary-200 bg-gray-50 shadow-md">
          <img
            src={preview}
            alt="Pet preview"
            className="h-64 w-full object-contain"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur transition-all hover:scale-110 hover:bg-white"
            aria-label="Remove photo"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 flex items-center justify-center gap-1.5 font-body text-sm text-secondary-600">
          <ImageIcon className="h-4 w-4" /> Looks great! Click the X to change it.
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex h-64 w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed bg-white/60 transition-all ${
          isDragging
            ? 'border-primary-500 bg-primary-50 scale-[1.02]'
            : error
              ? 'border-error-400 bg-error-50'
              : 'border-gray-300 hover:border-primary-400 hover:bg-primary-50/50'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-accent-100 text-primary-500 transition-transform hover:scale-110">
          <ImagePlus className="h-8 w-8" />
        </div>
        <div className="text-center">
          <p className="font-display font-semibold text-gray-700">
            Click or drop a photo here
          </p>
          <p className="mt-0.5 font-body text-sm text-gray-400">
            JPG, PNG, or WebP — up to 5MB
          </p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="mt-1.5 font-body text-sm text-error-500">{error}</p>}
    </div>
  );
}
