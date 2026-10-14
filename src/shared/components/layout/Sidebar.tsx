import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brackets,
  Layers,
  ListOrdered,
  Link2,
  Link,
  GitBranch,
  Triangle,
  Hash,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/shared/utils';
import { useUIStore } from '@/stores/uiStore';

interface NavItem {
  slug: string;
  name: string;
  icon: React.ReactNode;
  category: string;
}

const navItems: NavItem[] = [
  { slug: 'array', name: 'Array', icon: <Brackets className="w-4 h-4" />, category: 'Linear' },
  { slug: 'stack', name: 'Stack', icon: <Layers className="w-4 h-4" />, category: 'Linear' },
  { slug: 'queue', name: 'Queue', icon: <ListOrdered className="w-4 h-4" />, category: 'Linear' },
  { slug: 'singly-linked-list', name: 'Singly Linked List', icon: <Link2 className="w-4 h-4" />, category: 'Linear' },
  { slug: 'doubly-linked-list', name: 'Doubly Linked List', icon: <Link className="w-4 h-4" />, category: 'Linear' },
  { slug: 'binary-search-tree', name: 'Binary Search Tree', icon: <GitBranch className="w-4 h-4" />, category: 'Tree' },
  { slug: 'heap', name: 'Heap', icon: <Triangle className="w-4 h-4" />, category: 'Tree' },
  { slug: 'hash-table', name: 'Hash Table', icon: <Hash className="w-4 h-4" />, category: 'Hash' },
  { slug: 'graph', name: 'Graph', icon: <Share2 className="w-4 h-4" />, category: 'Graph' },
];

export function Sidebar() {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useUIStore((s) => s.toggleSidebar);

  const categories = [...new Set(navItems.map((item) => item.category))];

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 64 : 256 }}
      className="h-screen bg-background-secondary border-r border-border-default flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border-default">
        {!collapsed && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-bold text-white"
          >
            DS Visualizer
          </motion.h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-background-tertiary transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-neutral-400" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-2">
        {categories.map((category) => (
          <div key={category} className="mb-4">
            {!collapsed && (
              <h2 className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                {category}
              </h2>
            )}
            <ul className="space-y-1">
              {navItems
                .filter((item) => item.category === category)
                .map((item) => (
                  <li key={item.slug}>
                    <NavLink
                      to={`/${item.slug}`}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-neutral-400 hover:text-white hover:bg-background-tertiary'
                        )
                      }
                    >
                      {item.icon}
                      {!collapsed && (
                        <span className="text-sm font-medium">{item.name}</span>
                      )}
                    </NavLink>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </nav>
    </motion.aside>
  );
}
