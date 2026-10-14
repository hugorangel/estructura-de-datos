import { useState } from 'react';
import { Plus, Trash2, Search, Eye, Shuffle, RotateCcw } from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';

type OperationType = 'insert' | 'delete' | 'access' | 'search';

interface ArrayOperationsProps {
  onExecute: (operation: OperationType, params: { value?: number; index?: number }) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
  arrayLength: number;
}

export function ArrayOperations({
  onExecute,
  onReset,
  onRandomize,
  disabled,
  arrayLength,
}: ArrayOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('insert');
  const [value, setValue] = useState<string>('');
  const [index, setIndex] = useState<string>('');

  const operations = [
    { id: 'insert' as const, name: 'Insert', icon: Plus, time: 'O(n)' as const },
    { id: 'delete' as const, name: 'Delete', icon: Trash2, time: 'O(n)' as const },
    { id: 'access' as const, name: 'Access', icon: Eye, time: 'O(1)' as const },
    { id: 'search' as const, name: 'Search', icon: Search, time: 'O(n)' as const },
  ];

  const handleExecute = () => {
    const params: { value?: number; index?: number } = {};

    if (value !== '') {
      params.value = parseInt(value, 10);
    }
    if (index !== '') {
      params.index = parseInt(index, 10);
    }

    onExecute(selectedOp, params);
  };

  const needsValue = selectedOp === 'insert' || selectedOp === 'search';
  const needsIndex = selectedOp !== 'search';

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
            complexity={operations.find((o) => o.id === selectedOp)?.time ?? 'O(n)'}
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
              placeholder="Enter value"
              disabled={disabled}
            />
          )}
          {needsIndex && (
            <Input
              label="Index"
              type="number"
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              placeholder={`0 - ${selectedOp === 'insert' ? arrayLength : arrayLength - 1}`}
              disabled={disabled}
            />
          )}
        </div>

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={disabled || (needsValue && value === '')}
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
      </div>
    </Panel>
  );
}

export default ArrayOperations;
