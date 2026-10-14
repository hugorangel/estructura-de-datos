import { useState } from 'react';
import { Plus, Minus, Eye, Shuffle, RotateCcw } from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';

type OperationType = 'enqueue' | 'dequeue' | 'peek';

interface QueueOperationsProps {
  onExecute: (operation: OperationType, params: { value?: number }) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
  queueSize: number;
}

export function QueueOperations({
  onExecute,
  onReset,
  onRandomize,
  disabled,
  queueSize,
}: QueueOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('enqueue');
  const [value, setValue] = useState<string>('');

  const operations = [
    { id: 'enqueue' as const, name: 'Enqueue', icon: Plus, time: 'O(1)' as const, needsValue: true },
    { id: 'dequeue' as const, name: 'Dequeue', icon: Minus, time: 'O(1)' as const, needsValue: false },
    { id: 'peek' as const, name: 'Peek', icon: Eye, time: 'O(1)' as const, needsValue: false },
  ];

  const handleExecute = () => {
    const params: { value?: number } = {};

    if (value !== '') {
      params.value = parseInt(value, 10);
    }

    onExecute(selectedOp, params);

    // Clear value after enqueue
    if (selectedOp === 'enqueue') {
      setValue('');
    }
  };

  const currentOp = operations.find((o) => o.id === selectedOp);
  const needsValue = currentOp?.needsValue ?? false;
  const isQueueEmpty = queueSize === 0;
  const canExecute = needsValue ? value !== '' : !isQueueEmpty || selectedOp === 'enqueue';

  return (
    <Panel title="Operations" className="h-full">
      <div className="space-y-4">
        {/* Operation buttons */}
        <div className="grid grid-cols-1 gap-2">
          {operations.map((op) => (
            <button
              key={op.id}
              onClick={() => setSelectedOp(op.id)}
              disabled={disabled}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg transition-all',
                'border text-sm font-medium',
                selectedOp === op.id
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-background-tertiary border-border-default text-neutral-300 hover:border-neutral-500'
              )}
            >
              <div className="flex items-center gap-2">
                <op.icon className="w-4 h-4" />
                {op.name}
              </div>
              <ComplexityBadge complexity={op.time} />
            </button>
          ))}
        </div>

        {/* Operation description */}
        <div className="text-xs text-neutral-500 px-2">
          {selectedOp === 'enqueue' && 'Add an element to the rear of the queue'}
          {selectedOp === 'dequeue' && 'Remove the element from the front of the queue'}
          {selectedOp === 'peek' && 'View the front element without removing it'}
        </div>

        {/* Parameters */}
        <div className="space-y-3">
          {needsValue && (
            <Input
              label="Value"
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter value to enqueue"
              disabled={disabled}
            />
          )}
          {!needsValue && isQueueEmpty && (
            <div className="text-sm text-yellow-500 bg-yellow-500/10 rounded-lg px-3 py-2">
              Queue is empty
            </div>
          )}
        </div>

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={disabled || !canExecute}
        >
          Execute {currentOp?.name}
        </Button>

        {/* Queue status */}
        <div className="flex items-center justify-between px-2 py-2 bg-background-primary rounded-lg">
          <span className="text-xs text-neutral-500">Queue Size:</span>
          <span className="font-mono text-blue-400">{queueSize}</span>
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

export default QueueOperations;
