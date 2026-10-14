import { useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/shared/utils';
import { useUIStore } from '@/stores/uiStore';
import { usePlaybackStore } from '@/stores/playbackStore';
import type { ICodeSnippets, SupportedLanguage } from '@/core/interfaces';

interface CodeViewerProps {
  codeSnippets: ICodeSnippets;
  operationId: string;
  className?: string;
}

const languageLabels: Record<SupportedLanguage, string> = {
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  csharp: 'C#',
};

const prismLanguageMap: Record<SupportedLanguage, string> = {
  typescript: 'typescript',
  javascript: 'javascript',
  csharp: 'csharp',
};

export function CodeViewer({
  codeSnippets,
  operationId,
  className,
}: CodeViewerProps) {
  const selectedLanguage = useUIStore((s) => s.selectedLanguage);
  const setSelectedLanguage = useUIStore((s) => s.setSelectedLanguage);
  const currentStep = usePlaybackStore((s) => s.currentStep);

  const codeBlock = useMemo(() => {
    return codeSnippets[operationId]?.[selectedLanguage];
  }, [codeSnippets, operationId, selectedLanguage]);

  const highlightedLine = useMemo(() => {
    if (!currentStep || !codeBlock) return null;
    return codeBlock.lineMap[currentStep.index];
  }, [currentStep, codeBlock]);

  const languages = Object.keys(languageLabels) as SupportedLanguage[];

  if (!codeBlock) {
    return (
      <div className={cn('bg-background-secondary rounded-lg p-4', className)}>
        <p className="text-neutral-500 text-sm">No code available for this operation</p>
      </div>
    );
  }

  return (
    <div className={cn('bg-background-secondary rounded-lg overflow-hidden', className)}>
      {/* Language tabs */}
      <div className="flex items-center gap-1 px-4 py-2 bg-background-tertiary border-b border-border-default">
        <span className="text-xs text-neutral-500 mr-2">Code</span>
        {languages.map((lang) => (
          <button
            key={lang}
            onClick={() => setSelectedLanguage(lang)}
            className={cn(
              'px-3 py-1 text-xs font-medium rounded transition-colors',
              selectedLanguage === lang
                ? 'bg-blue-600 text-white'
                : 'text-neutral-400 hover:text-white hover:bg-background-secondary'
            )}
          >
            {languageLabels[lang]}
          </button>
        ))}
      </div>

      {/* Code */}
      <div className="relative">
        <SyntaxHighlighter
          language={prismLanguageMap[selectedLanguage]}
          style={oneDark}
          showLineNumbers
          wrapLines
          customStyle={{
            margin: 0,
            padding: '1rem',
            backgroundColor: 'transparent',
            fontSize: '0.875rem',
          }}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor:
                lineNumber === highlightedLine
                  ? 'rgba(250, 204, 21, 0.15)'
                  : 'transparent',
              borderLeft:
                lineNumber === highlightedLine
                  ? '3px solid #fbbf24'
                  : '3px solid transparent',
              display: 'block',
              paddingLeft: '0.5rem',
            },
          })}
        >
          {codeBlock.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
