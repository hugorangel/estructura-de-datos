import { motion } from 'framer-motion';
import { cn } from '@/shared/utils';

interface PointerProps {
  label?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  color?: string;
  className?: string;
  animate?: boolean;
}

export function Pointer({
  label,
  direction = 'up',
  color = '#3b82f6',
  className,
  animate = true,
}: PointerProps) {
  const rotations = {
    up: 0,
    right: 90,
    down: 180,
    left: 270,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={cn('flex flex-col items-center gap-1', className)}
    >
      {label && (
        <span
          className="text-xs font-medium px-1.5 py-0.5 rounded"
          style={{ backgroundColor: color, color: 'white' }}
        >
          {label}
        </span>
      )}
      <motion.svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        style={{ transform: `rotate(${rotations[direction]}deg)` }}
        animate={animate ? { y: [0, -4, 0] } : undefined}
        transition={animate ? { duration: 1, repeat: Infinity } : undefined}
      >
        <path
          d="M8 0L16 12H0L8 0Z"
          fill={color}
        />
        <rect x="6" y="10" width="4" height="10" fill={color} />
      </motion.svg>
    </motion.div>
  );
}
