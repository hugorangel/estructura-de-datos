import { useState } from 'react';
import {
  Trash2,
  Search,
  ArrowRight,
  Shuffle,
  RotateCcw,
  ListStart,
  ListEnd,
  ListPlus,
} from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';

type OperationType =
  | 'insertAtHead'
  | 'insertAtTail'
  | 'insertAtPosition'
  | 'deleteNode'
  | 'search'
  | 'traverse';

interface SinglyLinkedListOperationsProps {
  onExecute: (
    operation: OperationType,
    params: { value?: number; position?: number }
  ) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
  listLength: number;
}

export function SinglyLinkedListOperations({
  onExecute,
  onReset,
  onRandomize,
  disabled,
  listLength,
}: SinglyLinkedListOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('insertAtHead');
  const [value, setValue] = useState<string>('');
  const [position, setPosition] = useState<string>('');

  const operations = [
    { id: 'insertAtHead' as const, name: 'Insert Head', icon: ListStart, time: 'O(1)' as const },
    { id: 'insertAtTail' as const, name: 'Insert Tail', icon: ListEnd, time: 'O(n)' as const },
    { id: 'insertAtPosition' as const, name: 'Insert At', icon: ListPlus, time: 'O(n)' as const },
    { id: 'deleteNode' as const, name: 'Delete', icon: Trash2, time: 'O(n)' as const },
    { id: 'search' as const, name: 'Search', icon: Search, time: 'O(n)' as const },
    { id: 'traverse' as const, name: 'Traverse', icon: ArrowRight, time: 'O(n)' as const },
  ];

  const handleExecute = () => {
    const params: { value?: number; position?: number } = {};

    if (value !== '') {
      params.value = parseInt(value, 10);
    }
    if (position !== '') {
      params.position = parseInt(position, 10);
    }

    onExecute(selectedOp, params);
  };

  const needsValue =
    selectedOp === 'insertAtHead' ||
    selectedOp === 'insertAtTail' ||
    selectedOp === 'insertAtPosition' ||
    selectedOp === 'deleteNode' ||
    selectedOp === 'search';

  const needsPosition = selectedOp === 'insertAtPosition';

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
              <span className="truncate">{op.name}</span>
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
          {needsPosition && (
            <Input
              label="Position"
              type="number"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder={`0 - ${listLength}`}
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

export default SinglyLinkedListOperations;
