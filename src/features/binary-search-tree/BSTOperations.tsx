import { useState } from 'react';
import { Plus, Trash2, Search, GitBranch, Shuffle, RotateCcw } from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';
import type { BSTOperationType } from './config';

interface BSTOperationsProps {
  onExecute: (operation: BSTOperationType, params: { value?: number }) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
}

type TraversalType = 'inorderTraversal' | 'preorderTraversal' | 'postorderTraversal' | 'bfsTraversal';

export function BSTOperations({
  onExecute,
  onReset,
  onRandomize,
  disabled,
}: BSTOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<BSTOperationType>('insert');
  const [selectedTraversal, setSelectedTraversal] = useState<TraversalType>('inorderTraversal');
  const [value, setValue] = useState<string>('');

  const operations = [
    { id: 'insert' as const, name: 'Insert', icon: Plus, time: 'O(log n)' as const },
    { id: 'search' as const, name: 'Search', icon: Search, time: 'O(log n)' as const },
    { id: 'delete' as const, name: 'Delete', icon: Trash2, time: 'O(log n)' as const },
  ];

  const traversals = [
    { id: 'inorderTraversal' as const, name: 'Inorder', desc: 'Left → Root → Right (sorted)' },
    { id: 'preorderTraversal' as const, name: 'Preorder', desc: 'Root → Left → Right' },
    { id: 'postorderTraversal' as const, name: 'Postorder', desc: 'Left → Right → Root' },
    { id: 'bfsTraversal' as const, name: 'BFS', desc: 'Level by level' },
  ];

  const handleExecute = () => {
    if (selectedOp === 'insert' || selectedOp === 'search' || selectedOp === 'delete') {
      const params: { value?: number } = {};
      if (value !== '') {
        params.value = parseInt(value, 10);
      }
      onExecute(selectedOp, params);
    }
  };

  const handleTraversalExecute = () => {
    onExecute(selectedTraversal, {});
  };

  const needsValue = selectedOp === 'insert' || selectedOp === 'search' || selectedOp === 'delete';

  return (
    <Panel title="Operations" className="h-full">
      <div className="space-y-4">
        {/* Main operations */}
        <div className="space-y-2">
          <label className="text-xs text-neutral-500 font-medium uppercase">
            Tree Operations
          </label>
          <div className="grid grid-cols-3 gap-2">
            {operations.map((op) => (
              <button
                key={op.id}
                onClick={() => setSelectedOp(op.id)}
                disabled={disabled}
                className={cn(
                  'flex flex-col items-center gap-1 px-2 py-2 rounded-lg transition-all',
                  'border text-xs font-medium',
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
        </div>

        {/* Complexity indicator */}
        <div className="flex items-center justify-between px-2">
          <span className="text-xs text-neutral-500">Time (avg):</span>
          <ComplexityBadge
            complexity={operations.find((o) => o.id === selectedOp)?.time ?? 'O(log n)'}
          />
        </div>

        {/* Value input */}
        {needsValue && (
          <Input
            label="Value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter value (0-99)"
            disabled={disabled}
          />
        )}

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={disabled || (needsValue && value === '')}
        >
          Execute {operations.find((o) => o.id === selectedOp)?.name}
        </Button>

        {/* Traversal section */}
        <div className="pt-4 border-t border-border-default space-y-3">
          <label className="text-xs text-neutral-500 font-medium uppercase">
            Traversals
          </label>

          <div className="grid grid-cols-2 gap-2">
            {traversals.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTraversal(t.id)}
                disabled={disabled}
                className={cn(
                  'flex flex-col items-start px-3 py-2 rounded-lg transition-all',
                  'border text-left',
                  selectedTraversal === t.id
                    ? 'bg-purple-600/20 border-purple-500 text-white'
                    : 'bg-background-tertiary border-border-default text-neutral-300 hover:border-neutral-500'
                )}
              >
                <span className="text-sm font-medium">{t.name}</span>
                <span className="text-xs text-neutral-500">{t.desc}</span>
              </button>
            ))}
          </div>

          <Button
            variant="secondary"
            className="w-full"
            onClick={handleTraversalExecute}
            disabled={disabled}
          >
            <GitBranch className="w-4 h-4 mr-2" />
            Run {traversals.find((t) => t.id === selectedTraversal)?.name} Traversal
          </Button>
        </div>

        {/* Utility buttons */}
        <div className="flex gap-2 pt-4 border-t border-border-default">
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

export default BSTOperations;
