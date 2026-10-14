import { motion } from 'framer-motion';

interface ConnectionProps {
  from: { x: number; y: number };
  to: { x: number; y: number };
  color?: string;
  strokeWidth?: number;
  animated?: boolean;
  showArrow?: boolean;
  label?: string;
}

export function Connection({
  from,
  to,
  color = '#404040',
  strokeWidth = 2,
  animated = false,
  showArrow = true,
  label,
}: ConnectionProps) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);

  // Shorten the line for arrow head
  const arrowLength = showArrow ? 10 : 0;
  const endX = to.x - Math.cos(angle) * arrowLength;
  const endY = to.y - Math.sin(angle) * arrowLength;

  const pathD = `M ${from.x} ${from.y} L ${endX} ${endY}`;

  return (
    <g>
      <motion.path
        d={pathD}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      {showArrow && (
        <motion.polygon
          points={`
            ${to.x},${to.y}
            ${to.x - 10 * Math.cos(angle - Math.PI / 6)},${to.y - 10 * Math.sin(angle - Math.PI / 6)}
            ${to.x - 10 * Math.cos(angle + Math.PI / 6)},${to.y - 10 * Math.sin(angle + Math.PI / 6)}
          `}
          fill={color}
          initial={animated ? { opacity: 0 } : undefined}
          animate={animated ? { opacity: 1 } : undefined}
          transition={{ delay: 0.2 }}
        />
      )}
      {label && (
        <text
          x={(from.x + to.x) / 2}
          y={(from.y + to.y) / 2 - 8}
          fill={color}
          fontSize="12"
          textAnchor="middle"
          className="font-mono"
        >
          {label}
        </text>
      )}
    </g>
  );
}
