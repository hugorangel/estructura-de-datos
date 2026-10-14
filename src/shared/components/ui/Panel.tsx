import { type ReactNode } from 'react';
import { cn } from '@/shared/utils';

export interface PanelProps {
  children: ReactNode;
  title?: string;
  className?: string;
  headerActions?: ReactNode;
}

export function Panel({ children, title, className, headerActions }: PanelProps) {
  return (
    <div
      className={cn(
        'bg-background-secondary border border-border-default rounded-xl overflow-hidden',
        className
      )}
    >
      {(title || headerActions) && (
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-default">
          {title && (
            <h3 className="text-sm font-medium text-neutral-200">{title}</h3>
          )}
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
