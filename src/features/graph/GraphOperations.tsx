import { useState } from 'react';
import {
  Plus,
  Trash2,
  GitBranch,
  Workflow,
  Layers,
  Shuffle,
  RotateCcw,
  ArrowRight,
  ArrowLeftRight,
} from 'lucide-react';
import { Button, Input, Panel } from '@/shared/components/ui';
import { ComplexityBadge } from '@/shared/components/complexity';
import { cn } from '@/shared/utils';
import type { GraphState } from './config';

type OperationType = 'addNode' | 'addEdge' | 'removeNode' | 'removeEdge' | 'bfs' | 'dfs';

interface GraphOperationsProps {
  onExecute: (
    operation: OperationType,
    params: { nodeId?: string; fromNode?: string; toNode?: string; startNode?: string }
  ) => void;
  onReset: () => void;
  onRandomize: () => void;
  onToggleDirected: () => void;
  disabled: boolean;
  state: GraphState;
  selectedNodes: string[];
  onClearSelection: () => void;
}

export function GraphOperations({
  onExecute,
  onReset,
  onRandomize,
  onToggleDirected,
  disabled,
  state,
  selectedNodes,
  onClearSelection,
}: GraphOperationsProps) {
  const [selectedOp, setSelectedOp] = useState<OperationType>('bfs');
  const [nodeLabel, setNodeLabel] = useState<string>('');

  const operations = [
    { id: 'addNode' as const, name: 'Add Node', icon: Plus, time: 'O(1)' as const, group: 'modify' },
    { id: 'addEdge' as const, name: 'Add Edge', icon: GitBranch, time: 'O(1)' as const, group: 'modify' },
    { id: 'removeNode' as const, name: 'Remove Node', icon: Trash2, time: 'O(n)' as const, group: 'modify' },
    { id: 'removeEdge' as const, name: 'Remove Edge', icon: Layers, time: 'O(n)' as const, group: 'modify' },
    { id: 'bfs' as const, name: 'BFS', icon: Workflow, time: 'O(n)' as const, group: 'traverse' },
    { id: 'dfs' as const, name: 'DFS', icon: Workflow, time: 'O(n)' as const, group: 'traverse' },
  ];

  const handleExecute = () => {
    switch (selectedOp) {
      case 'addNode':
        if (nodeLabel) {
          onExecute('addNode', { nodeId: nodeLabel.toUpperCase() });
          setNodeLabel('');
        }
        break;
      case 'addEdge':
        if (selectedNodes.length === 2) {
          onExecute('addEdge', { fromNode: selectedNodes[0], toNode: selectedNodes[1] });
          onClearSelection();
        }
        break;
      case 'removeNode':
        if (selectedNodes.length === 1) {
          onExecute('removeNode', { nodeId: selectedNodes[0] });
          onClearSelection();
        }
        break;
      case 'removeEdge':
        if (selectedNodes.length === 2) {
          onExecute('removeEdge', { fromNode: selectedNodes[0], toNode: selectedNodes[1] });
          onClearSelection();
        }
        break;
      case 'bfs':
      case 'dfs':
        if (selectedNodes.length === 1) {
          onExecute(selectedOp, { startNode: selectedNodes[0] });
          onClearSelection();
        }
        break;
    }
  };

  const getInstructions = (): string => {
    switch (selectedOp) {
      case 'addNode':
        return 'Enter a label for the new node';
      case 'addEdge':
        return selectedNodes.length === 0
          ? 'Click source node, then target node'
          : selectedNodes.length === 1
            ? `Source: ${selectedNodes[0]}. Click target node`
            : `Edge: ${selectedNodes[0]} → ${selectedNodes[1]}`;
      case 'removeNode':
        return selectedNodes.length === 0
          ? 'Click a node to remove'
          : `Remove node: ${selectedNodes[0]}`;
      case 'removeEdge':
        return selectedNodes.length === 0
          ? 'Click source node, then target node'
          : selectedNodes.length === 1
            ? `Source: ${selectedNodes[0]}. Click target node`
            : `Remove edge: ${selectedNodes[0]} → ${selectedNodes[1]}`;
      case 'bfs':
      case 'dfs':
        return selectedNodes.length === 0
          ? 'Click a node to start traversal'
          : `Start ${selectedOp.toUpperCase()} from: ${selectedNodes[0]}`;
      default:
        return '';
    }
  };

  const canExecute = (): boolean => {
    if (disabled) return false;
    switch (selectedOp) {
      case 'addNode':
        return nodeLabel.length > 0 && !state.nodes.some(n => n.id === nodeLabel.toUpperCase());
      case 'addEdge':
      case 'removeEdge':
        return selectedNodes.length === 2;
      case 'removeNode':
      case 'bfs':
      case 'dfs':
        return selectedNodes.length === 1;
      default:
        return false;
    }
  };

  return (
    <Panel title="Operations" className="h-full">
      <div className="space-y-4">
        {/* Graph type toggle */}
        <div className="flex items-center justify-between p-2 bg-background-primary rounded-lg">
          <span className="text-sm text-neutral-300">Graph Type:</span>
          <button
            onClick={onToggleDirected}
            disabled={disabled}
            className={cn(
              'flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-all',
              state.directed
                ? 'bg-purple-600 text-white'
                : 'bg-blue-600 text-white'
            )}
          >
            {state.directed ? (
              <>
                <ArrowRight className="w-4 h-4" />
                Directed
              </>
            ) : (
              <>
                <ArrowLeftRight className="w-4 h-4" />
                Undirected
              </>
            )}
          </button>
        </div>

        {/* Operation groups */}
        <div className="space-y-2">
          <div className="text-xs text-neutral-500 font-semibold uppercase">Modify</div>
          <div className="grid grid-cols-2 gap-2">
            {operations.filter(op => op.group === 'modify').map((op) => (
              <button
                key={op.id}
                onClick={() => {
                  setSelectedOp(op.id);
                  onClearSelection();
                }}
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
        </div>

        <div className="space-y-2">
          <div className="text-xs text-neutral-500 font-semibold uppercase">Traverse</div>
          <div className="grid grid-cols-2 gap-2">
            {operations.filter(op => op.group === 'traverse').map((op) => (
              <button
                key={op.id}
                onClick={() => {
                  setSelectedOp(op.id);
                  onClearSelection();
                }}
                disabled={disabled}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg transition-all',
                  'border text-sm font-medium',
                  selectedOp === op.id
                    ? 'bg-green-600 border-green-500 text-white'
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
          <span className="text-xs text-neutral-500">Time Complexity:</span>
          <ComplexityBadge
            complexity={operations.find((o) => o.id === selectedOp)?.time ?? 'O(n)'}
          />
        </div>

        {/* Parameters */}
        <div className="space-y-3">
          {selectedOp === 'addNode' && (
            <Input
              label="Node Label"
              type="text"
              value={nodeLabel}
              onChange={(e) => setNodeLabel(e.target.value.slice(0, 1))}
              placeholder="A-Z"
              disabled={disabled}
              maxLength={1}
            />
          )}

          {/* Instructions */}
          <div className="p-3 bg-background-primary rounded-lg">
            <p className="text-sm text-neutral-400">{getInstructions()}</p>
            {selectedNodes.length > 0 && (
              <button
                onClick={onClearSelection}
                className="text-xs text-blue-400 hover:text-blue-300 mt-1"
              >
                Clear selection
              </button>
            )}
          </div>
        </div>

        {/* Execute button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleExecute}
          disabled={!canExecute()}
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

        {/* Adjacency List Display */}
        <div className="pt-2 border-t border-border-default">
          <div className="text-xs text-neutral-500 font-semibold uppercase mb-2">
            Adjacency List
          </div>
          <div className="bg-background-primary rounded-lg p-2 font-mono text-xs max-h-32 overflow-y-auto">
            {state.nodes.map((node) => (
              <div key={node.id} className="flex items-start gap-2 py-0.5">
                <span className="text-blue-400 w-4">{node.id}:</span>
                <span className="text-neutral-300">
                  [{(state.adjacencyList.get(node.id) ?? []).join(', ')}]
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default GraphOperations;
