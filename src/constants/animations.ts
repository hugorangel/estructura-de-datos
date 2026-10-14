export const defaultTransition = {
  duration: 0.4,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const springTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 25,
};

export const fastTransition = {
  duration: 0.2,
  ease: 'easeOut' as const,
};

export const slowTransition = {
  duration: 0.6,
  ease: 'easeInOut' as const,
};

export const elementVariants = {
  default: {
    scale: 1,
    opacity: 1,
    backgroundColor: 'var(--color-element-default, #2d2d2d)',
    borderColor: 'var(--color-border-default, #404040)',
    boxShadow: 'none',
  },
  current: {
    scale: 1.1,
    opacity: 1,
    backgroundColor: '#fbbf24',
    borderColor: '#fbbf24',
    boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)',
  },
  comparing: {
    scale: 1.05,
    opacity: 1,
    backgroundColor: '#f97316',
    borderColor: '#f97316',
    boxShadow: '0 0 15px rgba(249, 115, 22, 0.4)',
  },
  visited: {
    scale: 1,
    opacity: 0.85,
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    boxShadow: 'none',
  },
  found: {
    scale: 1.15,
    opacity: 1,
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
    boxShadow: '0 0 25px rgba(34, 197, 94, 0.5)',
  },
  modified: {
    scale: 1.1,
    opacity: 1,
    backgroundColor: '#a855f7',
    borderColor: '#a855f7',
    boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
  },
  deleting: {
    scale: 0.9,
    opacity: 0.5,
    backgroundColor: '#ef4444',
    borderColor: '#ef4444',
    boxShadow: 'none',
  },
  exit: {
    scale: 0,
    opacity: 0,
  },
  enter: {
    scale: 0,
    opacity: 0,
  },
};

export const baseDurations = {
  instant: 100,
  fast: 200,
  normal: 400,
  slow: 600,
  verySlow: 1000,
} as const;
