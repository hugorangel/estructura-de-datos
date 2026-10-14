export const colors = {
  background: {
    primary: '#0f0f0f',
    secondary: '#1a1a1a',
    tertiary: '#262626',
  },
  element: {
    default: '#2d2d2d',
    current: '#fbbf24',
    comparing: '#f97316',
    visited: '#3b82f6',
    found: '#22c55e',
    modified: '#a855f7',
    deleting: '#ef4444',
  },
  border: {
    default: '#404040',
    current: '#fbbf24',
    comparing: '#f97316',
    visited: '#3b82f6',
    found: '#22c55e',
    modified: '#a855f7',
    deleting: '#ef4444',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a3a3a3',
    muted: '#737373',
  },
  accent: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
  },
} as const;

export type ElementStateColor = keyof typeof colors.element;

export function getElementColor(state: ElementStateColor): string {
  return colors.element[state];
}

export function getBorderColor(state: ElementStateColor): string {
  return colors.border[state];
}
