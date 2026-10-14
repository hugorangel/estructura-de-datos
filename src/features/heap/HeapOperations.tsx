import { useState } from 'react';
import { Plus, ArrowUpFromLine, Eye, Layers, Shuffle, RotateCcw } from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';
import type { HeapType } from './config';

type OperationType = 'insert' | 'extract' | 'peek' | 'heapify';

interface HeapOperationsProps {
  onExecute: (operation: OperationType, params: { value?: number }) => void;
  onReset: () => void;
  onRandomize: () => void;
  onToggleHeapType: () => void;
  disabled: boolean;
  heapSize: number;
  heapType: HeapType;
}

export function HeapOperations({
  onExecute,
  onReset,
  onRandomize,
  onToggleHeapType,
  disabled,
  heapSize,
  heapType,
}: HeapOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('insert');
  const [value, setValue] = useState<string>('');

  const operations = [
    { id: 'insert' as const, name: 'Insert', icon: Plus, time: 'O(log n)' as const },
    { id: 'extract' as const, name: heapType === 'max' ? 'ExtractMax' : 'ExtractMin', icon: ArrowUpFromLine, time: 'O(log n)' as const },
    { id: 'peek' as const, name: heapType === 'max' ? 'PeekMax' : 'PeekMin', icon: Eye, time: 'O(1)' as const },
    { id: 'heapify' as const, name: 'Heapify', icon: Layers, time: 'O(n)' as const },
  ];

  const handleExecute = () => {
    const params: { value?: number } = {};

    if (value !== '') {
      params.value = parseInt(value, 10);
    }

    onExecute(selectedOp, params);
    if (selectedOp === 'insert') {
      setValue('');
    }
  };

  const needsValue = selectedOp === 'insert';

  return (
    <Panel title="Operations" className="h-full">
      <div className="space-y-4">
        {/* Heap type toggle */}
        <div className="flex items-center justify-between p-3 bg-background-primary rounded-lg">
          <span className="text-sm text-neutral-400">Heap Type</span>
          <button
            onClick={onToggleHeapType}
            disabled={disabled}
            className={cn(
              'relative w-24 h-8 rounded-full transition-all',
              'border',
              heapType === 'max'
                ? 'bg-orange-500/20 border-orange-500/30'
                : 'bg-cyan-500/20 border-cyan-500/30'
            )}
          >
            <span
              className={cn(
                'absolute top-1 w-10 h-6 rounded-full transition-all',
                'flex items-center justify-center text-xs font-medium',
                heapType === 'max'
                  ? 'left-1 bg-orange-500 text-white'
                  : 'left-[calc(100%-2.75rem)] bg-cyan-500 text-white'
              )}
            >
              {heapType === 'max' ? 'Max' : 'Min'}
            </span>
          </button>
        </div>

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
              <span className="truncate">{op.name}</span>
            </button>
          ))}
        </div>

        {/* Complexity indicator */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-neutral-500">Time Complexity:</span>
          <ComplexityBadge
            complexity={operations.find((o) => o.id === selectedOp)?.time ?? 'O(log n)'}
          />
        </div>

        {/* Parameters */}
        <div className="space-y-3">
          {needsValue && (
            <Input
              label="Value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value to insert"
              disabled={disabled}
            />
          )}
          {selectedOp === 'heapify' && (
            <div className="text-xs text-neutral-500 p-2 bg-background-primary rounded">
              Heapify will generate random values and build a valid {heapType}-heap
            </div>
          )}
        </div>

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={disabled || (needsValue && value === '') || ((selectedOp === 'extract' || selectedOp === 'peek') && heapSize === 0)}
        >
          Execute {operations.find((o) => o.id === selectedOp)?.name}
        </Button>

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

        {/* Heap info */}
        <div className="p-3 bg-background-primary rounded-lg space-y-1 text-xs">
          <div className="flex justify-between text-neutral-400">
            <span>Current Size:</span>
            <span className="text-white font-mono">{heapSize}</span>
          </div>
          <div className="flex justify-between text-neutral-400">
            <span>Tree Height:</span>
            <span className="text-white font-mono">
              {heapSize > 0 ? Math.floor(Math.log2(heapSize)) + 1 : 0}
            </span>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default HeapOperations;
