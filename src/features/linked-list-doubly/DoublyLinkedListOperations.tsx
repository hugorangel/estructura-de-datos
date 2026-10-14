import { useState } from 'react';
import {
  Plus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  Shuffle,
  RotateCcw,
} from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';

type OperationType =
  | 'insertAtHead'
  | 'insertAtTail'
  | 'insertAtPosition'
  | 'deleteNode'
  | 'traverseForward'
  | 'traverseBackward';

interface DoublyLinkedListOperationsProps {
  onExecute: (operation: OperationType, params: { value?: number; position?: number }) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
  nodeCount: number;
}

export function DoublyLinkedListOperations({
  onExecute,
  onReset,
  onRandomize,
  disabled,
  nodeCount,
}: DoublyLinkedListOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('insertAtHead');
  const [value, setValue] = useState<string>('');
  const [position, setPosition] = useState<string>('');

  const operations = [
    { id: 'insertAtHead' as const, name: 'Insert Head', icon: Plus, time: 'O(1)' as const },
    { id: 'insertAtTail' as const, name: 'Insert Tail', icon: Plus, time: 'O(1)' as const },
    { id: 'insertAtPosition' as const, name: 'Insert At', icon: Plus, time: 'O(n)' as const },
    { id: 'deleteNode' as const, name: 'Delete', icon: Trash2, time: 'O(1)' as const },
    { id: 'traverseForward' as const, name: 'Traverse →', icon: ArrowRight, time: 'O(n)' as const },
    { id: 'traverseBackward' as const, name: 'Traverse ←', icon: ArrowLeft, time: 'O(n)' as const },
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
    selectedOp === 'insertAtPosition';
  const needsPosition = selectedOp === 'insertAtPosition' || selectedOp === 'deleteNode';

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

        {/* Operation description */}
        <div className="px-2 py-2 bg-background-primary rounded-lg">
          <p className="text-xs text-neutral-400">
            {selectedOp === 'insertAtHead' && 'Insert a new node at the beginning of the list.'}
            {selectedOp === 'insertAtTail' && 'Insert a new node at the end of the list.'}
            {selectedOp === 'insertAtPosition' && 'Insert a new node at a specific position.'}
            {selectedOp === 'deleteNode' && 'Delete the node at a specific position.'}
            {selectedOp === 'traverseForward' && 'Traverse the list from HEAD to TAIL using next pointers.'}
            {selectedOp === 'traverseBackward' && 'Traverse the list from TAIL to HEAD using prev pointers.'}
          </p>
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
              placeholder={`0 - ${selectedOp === 'deleteNode' ? nodeCount - 1 : nodeCount}`}
              disabled={disabled}
            />
          )}
        </div>

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={disabled || (needsValue && value === '') || (needsPosition && position === '')}
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

export default DoublyLinkedListOperations;
