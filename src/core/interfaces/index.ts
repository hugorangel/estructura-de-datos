// Core interfaces for the data structures visualizer plugin system

export type BigONotation =
  | 'O(1)'
  | 'O(log n)'
  | 'O(n)'
  | 'O(n log n)'
  | 'O(n²)'
  | 'O(2ⁿ)';

export type DataStructureCategory = 'linear' | 'tree' | 'graph' | 'hash';

export type SupportedLanguage = 'csharp' | 'javascript' | 'typescript';

export type PlaybackStatus =
  | 'idle'
  | 'ready'
  | 'playing'
  | 'paused'
  | 'stepping'
  | 'complete';

export type PlaybackMode = 'auto' | 'step';

export type AnimationStepType =
  | 'highlight'
  | 'compare'
  | 'swap'
  | 'insert'
  | 'delete'
  | 'move'
  | 'traverse'
  | 'found'
  | 'not-found'
  | 'complete';

export type ElementVisualState =
  | 'default'
  | 'current'
  | 'comparing'
  | 'visited'
  | 'found'
  | 'modified'
  | 'deleting';

// ----- Operation Interfaces -----

export interface IOperationParam {
  name: string;
  type: 'number' | 'string' | 'boolean' | 'select';
  label: string;
  required: boolean;
  default?: unknown;
  options?: { value: unknown; label: string }[];
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

export interface IOperationResult<TState> {
  newState: TState;
  animationSteps: IAnimationStep[];
  message?: string;
  success: boolean;
}

export interface IOperation<TParams = unknown> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly icon?: string;
  readonly timeComplexity: BigONotation;
  readonly spaceComplexity: BigONotation;
  readonly params: IOperationParam[];
  execute<TState>(state: TState, params: TParams): IOperationResult<TState>;
}

// ----- Animation Interfaces -----

export interface MotionProps {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  exit?: Record<string, unknown>;
  transition?: {
    duration?: number;
    ease?: string | number[];
    delay?: number;
    type?: string;
    stiffness?: number;
    damping?: number;
  };
}

export interface IAnimationElement {
  readonly elementId: string;
  readonly state: ElementVisualState;
  readonly position?: {
    from?: { x: number; y: number };
    to?: { x: number; y: number };
  };
  readonly motionProps: MotionProps;
}

export interface IAnimationStep {
  readonly id: string;
  readonly index: number;
  readonly type: AnimationStepType;
  readonly description: string;
  readonly codeLine?: number;
  readonly elements: IAnimationElement[];
  readonly baseDuration: number;
  readonly isPausePoint: boolean;
}

export interface IAnimationState {
  status: PlaybackStatus;
  steps: IAnimationStep[];
  currentStepIndex: number;
  speed: number;
  mode: PlaybackMode;
  progress: number;
  totalDuration: number;
  elapsedTime: number;
}

// ----- Code Snippets -----

export interface ICodeBlock {
  code: string;
  lineMap: Record<number, number>; // stepIndex -> lineNumber
  language: SupportedLanguage;
}

export interface ICodeSnippets {
  [operationId: string]: {
    [language in SupportedLanguage]: ICodeBlock;
  };
}

// ----- Complexity -----

export interface IComplexityEntry {
  time: BigONotation;
  explanation: string;
}

export interface IComplexityCase {
  access?: IComplexityEntry;
  search?: IComplexityEntry;
  insert?: IComplexityEntry;
  delete?: IComplexityEntry;
  [operation: string]: IComplexityEntry | undefined;
}

export interface IComplexityInfo {
  average: IComplexityCase;
  worst: IComplexityCase;
  best: IComplexityCase;
  space: BigONotation;
}

// ----- Validation -----

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

// ----- Visualizer Props -----

export interface VisualizerProps<TState> {
  state: TState;
  animationState: IAnimationState;
  highlightedElements: Set<string>;
  onElementClick?: (elementId: string) => void;
}

export interface OperationsProps<TParams = unknown> {
  onExecute: (operationId: string, params: TParams) => void;
  onReset: () => void;
  onRandomize: () => void;
  disabled: boolean;
  currentOperation?: string;
}

// ----- Main Plugin Interface -----

export interface IDataStructureVisualizer<TData = unknown, TState = unknown> {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly slug: string;
  readonly icon: string;
  readonly category: DataStructureCategory;
  readonly operations: IOperation<TData>[];
  readonly complexity: IComplexityInfo;
  readonly codeSnippets: ICodeSnippets;

  getInitialState(): TState;
  generateRandomData(size?: number): TData[];
  validate(data: TData, operation: string, state: TState): ValidationResult;

  readonly VisualizerComponent: React.ComponentType<VisualizerProps<TState>>;
  readonly OperationsComponent: React.ComponentType<OperationsProps<TData>>;
  readonly OverviewComponent: React.ComponentType;
  readonly ComplexityComponent: React.ComponentType;
}
