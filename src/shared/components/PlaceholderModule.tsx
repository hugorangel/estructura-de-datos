import { Panel } from '@/shared/components/ui';
import { Construction } from 'lucide-react';

interface PlaceholderModuleProps {
  name: string;
  description: string;
}

export function PlaceholderModule({ name, description }: PlaceholderModuleProps) {
  return (
    <div className="h-full flex items-center justify-center p-8">
      <Panel className="max-w-md text-center">
        <div className="flex flex-col items-center gap-4 py-8">
          <div className="p-4 bg-yellow-500/10 rounded-full">
            <Construction className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">{name}</h1>
          <p className="text-neutral-400">{description}</p>
          <p className="text-sm text-neutral-500">
            This module is coming soon. Check out the Array module for a complete example.
          </p>
        </div>
      </Panel>
    </div>
  );
}
