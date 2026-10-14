import { motion } from 'framer-motion';
import { cn } from '@/shared/utils';
import type { ElementVisualState } from '@/core/interfaces';
import { elementVariants, defaultTransition } from '@/constants/animations';

interface ElementNodeProps {
  id: string;
  value: string | number;
  state?: ElementVisualState;
  index?: number;
  showIndex?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function ElementNode({
  id,
  value,
  state = 'default',
  index,
  showIndex = true,
  size = 'md',
  className,
  onClick,
}: ElementNodeProps) {
  const sizes = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-lg',
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <motion.div
        id={id}
        initial="enter"
        animate={state}
        exit="exit"
        variants={elementVariants}
        transition={defaultTransition}
        onClick={onClick}
        className={cn(
          'flex items-center justify-center rounded-lg border-2 font-mono font-semibold',
          'cursor-pointer select-none',
          sizes[size],
          className
        )}
      >
        {value}
      </motion.div>
      {showIndex && index !== undefined && (
        <span className="text-xs text-neutral-500 font-mono">{index}</span>
      )}
    </div>
  );
}
