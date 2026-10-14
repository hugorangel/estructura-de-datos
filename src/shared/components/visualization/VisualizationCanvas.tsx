import { type ReactNode } from 'react';
import { cn } from '@/shared/utils';

interface VisualizationCanvasProps {
  children: ReactNode;
  className?: string;
}

export function VisualizationCanvas({
  children,
  className,
}: VisualizationCanvasProps) {
  return (
    <div
      className={cn(
        'relative w-full min-h-[300px] bg-background-primary rounded-xl',
        'border border-border-default overflow-hidden',
        'flex items-center justify-center p-8',
        className
      )}
    >
      {children}
    </div>
  );
}
