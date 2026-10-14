import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './Layout';

// Lazy load all modules
const ArrayModule = lazy(() => import('@/features/array'));
const StackModule = lazy(() => import('@/features/stack'));
const QueueModule = lazy(() => import('@/features/queue'));
const SinglyLinkedListModule = lazy(() => import('@/features/linked-list-singly'));
const DoublyLinkedListModule = lazy(() => import('@/features/linked-list-doubly'));
const BinarySearchTreeModule = lazy(() => import('@/features/binary-search-tree'));
const HeapModule = lazy(() => import('@/features/heap'));
const HashTableModule = lazy(() => import('@/features/hash-table'));
const GraphModule = lazy(() => import('@/features/graph'));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ModuleWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/array" replace /> },
      {
        path: 'array',
        element: (
          <ModuleWrapper>
            <ArrayModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'stack',
        element: (
          <ModuleWrapper>
            <StackModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'queue',
        element: (
          <ModuleWrapper>
            <QueueModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'singly-linked-list',
        element: (
          <ModuleWrapper>
            <SinglyLinkedListModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'doubly-linked-list',
        element: (
          <ModuleWrapper>
            <DoublyLinkedListModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'binary-search-tree',
        element: (
          <ModuleWrapper>
            <BinarySearchTreeModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'heap',
        element: (
          <ModuleWrapper>
            <HeapModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'hash-table',
        element: (
          <ModuleWrapper>
            <HashTableModule />
          </ModuleWrapper>
        ),
      },
      {
        path: 'graph',
        element: (
          <ModuleWrapper>
            <GraphModule />
          </ModuleWrapper>
        ),
      },
    ],
  },
]);
