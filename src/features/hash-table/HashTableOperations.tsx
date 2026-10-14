import { useState } from 'react';
import { Plus, Trash2, Search, Hash, Shuffle, RotateCcw } from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';

type OperationType = 'insert' | 'delete' | 'search' | 'hash';

interface HashTableOperationsProps {
  onExecute: (operation: OperationType, params: { key?: string; value?: number }) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
  size: number;
  bucketCount: number;
}

export function HashTableOperations({
  onExecute,
  onReset,
  onRandomize,
  disabled,
  size,
  bucketCount,
}: HashTableOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('insert');
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const operations = [
    { id: 'insert' as const, name: 'Insert', icon: Plus, time: 'O(1)' as const, description: 'Add key-value pair' },
    { id: 'search' as const, name: 'Search', icon: Search, time: 'O(1)' as const, description: 'Find value by key' },
    { id: 'delete' as const, name: 'Delete', icon: Trash2, time: 'O(1)' as const, description: 'Remove by key' },
    { id: 'hash' as const, name: 'Hash', icon: Hash, time: 'O(1)' as const, description: 'Visualize hash function' },
  ];

  const handleExecute = () => {
    const params: { key?: string; value?: number } = {};

    if (key !== '') {
      params.key = key;
    }
    if (value !== '') {
      params.value = parseInt(value, 10);
    }

    onExecute(selectedOp, params);
  };

  const needsKey = true; // All operations need a key
  const needsValue = selectedOp === 'insert';

  return (
    <Panel title="Operations" className="h-full">
      <div className="space-y-4">
        {/* Operation buttons */}
        <div className="grid grid-cols-2 gap-2">
          {operations.map((op) => (
            <button
              key={op.id}
              onClick={() => setSelectedOp(op.id)}
              disabled={disabled}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
                'border text-sm font-medium',
                selectedOp === op.id
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-background-tertiary border-border-default text-neutral-300 hover:border-neutral-500'
              )}
            >
              <op.icon className="w-4 h-4" />
              {op.name}
            </button>
          ))}
        </div>

        {/* Operation description */}
        <div className="text-xs text-neutral-500 px-2">
          {operations.find((o) => o.id === selectedOp)?.description}
        </div>

        {/* Complexity indicator */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-neutral-500">Time Complexity (avg):</span>
          <ComplexityBadge
            complexity={operations.find((o) => o.id === selectedOp)?.time ?? 'O(1)'}
          />
        </div>

        {/* Parameters */}
        <div className="space-y-3">
          {needsKey && (
            <Input
              label="Key"
              type="text"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter key (string)"
              disabled={disabled}
            />
          )}
          {needsValue && (
            <Input
              label="Value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value (number)"
              disabled={disabled}
            />
          )}
        </div>

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={disabled || key === '' || (needsValue && value === '')}
        >
          Execute {operations.find((o) => o.id === selectedOp)?.name}
        </Button>

        {/* Stats */}
        <div className="bg-background-primary rounded-lg p-3 space-y-2">
          <div className="text-xs text-neutral-500 font-medium">Table Stats</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-neutral-400">Entries:</span>
              <span className="text-white font-mono">{size}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Buckets:</span>
              <span className="text-white font-mono">{bucketCount}</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-neutral-400">Load Factor:</span>
              <span className={cn(
                'font-mono',
                size / bucketCount > 0.75 ? 'text-red-400' : 'text-green-400'
              )}>
                {(size / bucketCount).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Utility buttons */}
        <div className="flex gap-2 pt-2 border-t border-border-default">
          <Button
            variant="secondary"
            size="sm"
            className="flex-1"
            onClick={onRandomize}
            disabled={disabled}
          >
            <Shuffle className="w-4 h-4 mr-1" />
            Random
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={onReset}
            disabled={disabled}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Reset
          </Button>
        </div>
      </div>
    </Panel>
  );
}

export default HashTableOperations;
