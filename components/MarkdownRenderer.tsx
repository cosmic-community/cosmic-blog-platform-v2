import Markdown from 'markdown-to-jsx'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <Markdown
        options={{
          overrides: {
            h1: { props: { className: 'text-4xl font-bold mt-8 mb-4' } },
            h2: { props: { className: 'text-3xl font-bold mt-6 mb-3' } },
            h3: { props: { className: 'text-2xl font-semibold mt-5 mb-2' } },
            h4: { props: { className: 'text-xl font-semibold mt-4 mb-2' } },
            p: { props: { className: 'mb-4 leading-relaxed' } },
            ul: { props: { className: 'list-disc list-inside mb-4 space-y-2' } },
            ol: { props: { className: 'list-decimal list-inside mb-4 space-y-2' } },
            li: { props: { className: 'ml-2' } },
            blockquote: {
              props: {
                className:
                  'border-l-4 border-blue-600 dark:border-blue-400 pl-4 italic my-4 text-gray-600 dark:text-gray-400',
              },
            },
            code: {
              props: {
                className:
                  'bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono',
              },
            },
            pre: {
              props: {
                className:
                  'bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-4',
              },
            },
            a: {
              props: {
                className:
                  'text-blue-600 dark:text-blue-400 hover:underline break-words',
              },
            },
            img: {
              props: {
                className: 'max-w-full h-auto rounded-lg my-4',
              },
            },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  )
}