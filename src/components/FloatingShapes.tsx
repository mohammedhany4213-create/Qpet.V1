interface Shape {
  className: string;
  color: string;
  size: number;
  top: string;
  left: string;
  animation: string;
  blob: string;
}

const shapes: Shape[] = [
  { className: '', color: 'bg-primary-200', size: 120, top: '8%', left: '5%', animation: 'animate-float', blob: 'blob' },
  { className: '', color: 'bg-ocean-200', size: 80, top: '70%', left: '12%', animation: 'animate-float', blob: 'blob-2' },
  { className: '', color: 'bg-accent-200', size: 100, top: '15%', left: '85%', animation: 'animate-float', blob: 'blob-3' },
  { className: '', color: 'bg-secondary-200', size: 70, top: '75%', left: '80%', animation: 'animate-float', blob: 'blob' },
];

export default function FloatingShapes() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
      {shapes.map((shape, i) => (
        <div
          key={i}
          className={`absolute ${shape.color} ${shape.animation} ${shape.blob} opacity-40`}
          style={{
            width: shape.size,
            height: shape.size,
            top: shape.top,
            left: shape.left,
            animationDelay: `${i * 0.8}s`,
          }}
        />
      ))}
    </div>
  );
}
