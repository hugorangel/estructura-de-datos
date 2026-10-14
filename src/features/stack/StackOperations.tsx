import { useState } from 'react';
import { Plus, Trash2, Eye, Shuffle, RotateCcw, Search } from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';

type OperationType = 'push' | 'pop' | 'peek' | 'search';

interface StackOperationsProps {
  onExecute: (operation: OperationType, params: { value?: number }) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
  stackSize: number;
}

export function StackOperations({
  onExecute,
  onReset,
  onRandomize,
  disabled,
  stackSize,
}: StackOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('push');
  const [value, setValue] = useState<string>('');

  const operations = [
    { id: 'push' as const, name: 'Push', icon: Plus, time: 'O(1)' as const },
    { id: 'pop' as const, name: 'Pop', icon: Trash2, time: 'O(1)' as const },
    { id: 'peek' as const, name: 'Peek', icon: Eye, time: 'O(1)' as const },
    { id: 'search' as const, name: 'Search', icon: Search, time: 'O(n)' as const },
  ];

  const handleExecute = () => {
    const params: { value?: number } = {};

    if (value !== '') {
      params.value = parseInt(value, 10);
    }

    onExecute(selectedOp, params);

    // Clear value after push
    if (selectedOp === 'push') {
      setValue('');
    }
  };

  const needsValue = selectedOp === 'push' || selectedOp === 'search';
  const isStackEmpty = stackSize === 0;
  const isDisabled = disabled || (needsValue && value === '') ||
    ((selectedOp === 'pop' || selectedOp === 'peek') && isStackEmpty);

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

        {/* Complexity indicator */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-neutral-500">Time Complexity:</span>
          <ComplexityBadge
            complexity={operations.find((o) => o.id === selectedOp)?.time ?? 'O(1)'}
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
              placeholder={selectedOp === 'push' ? 'Value to push' : 'Value to search'}
              disabled={disabled}
            />
          )}

          {/* Info for operations that don't need input */}
          {!needsValue && (
            <div className="text-xs text-neutral-500 px-2 py-3 bg-background-primary rounded-lg">
              {selectedOp === 'pop' && (
                isStackEmpty
                  ? 'Stack is empty - cannot pop'
                  : 'Will remove and return the top element'
              )}
              {selectedOp === 'peek' && (
                isStackEmpty
                  ? 'Stack is empty - cannot peek'
                  : 'Will return the top element without removing it'
              )}
            </div>
          )}
        </div>

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={isDisabled}
        >
          Execute {operations.find((o) => o.id === selectedOp)?.name}
        </Button>

        {/* Stack info */}
        <div className="px-2 py-2 bg-background-primary rounded-lg text-xs text-neutral-400">
          <div className="flex justify-between">
            <span>Stack Size:</span>
            <span className="text-blue-400 font-mono">{stackSize}</span>
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

export default StackOperations;
