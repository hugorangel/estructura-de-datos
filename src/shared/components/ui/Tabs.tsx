import { type ReactNode } from 'react';
import { cn } from '@/shared/utils';

export interface TabsProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-1 p-1 bg-background-tertiary rounded-lg',
        className
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            activeTab === tab.id
              ? 'bg-background-secondary text-white shadow-sm'
              : 'text-neutral-400 hover:text-white hover:bg-background-secondary/50'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export interface TabPanelProps {
  children: ReactNode;
  isActive: boolean;
  className?: string;
}

export function TabPanel({ children, isActive, className }: TabPanelProps) {
  if (!isActive) return null;
  return <div className={className}>{children}</div>;
}
