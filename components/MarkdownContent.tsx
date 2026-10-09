import type { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  content: string
  className?: string
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = []
  const pattern =
    /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<]+)/g

  let lastIndex = 0
  let match: RegExpExecArray | null
  let part = 0

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }

    const token = match[0]
    const key = `${keyPrefix}-${part++}`

    if (token.startsWith('**') && token.endsWith('**')) {
      nodes.push(
        <strong key={key} className="font-semibold text-gray-100">
          {token.slice(2, -2)}
        </strong>
      )
    } else if (token.startsWith('*') && token.endsWith('*')) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('`') && token.endsWith('`')) {
      nodes.push(
        <code
          key={key}
          className="rounded bg-gray-900 px-1.5 py-0.5 text-sm text-blue-300"
        >
          {token.slice(1, -1)}
        </code>
      )
    } else if (token.startsWith('[')) {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      if (linkMatch) {
        const [, label, href] = linkMatch
        const isInternal = href.startsWith('/')
        nodes.push(
          isInternal ? (
            <Link key={key} href={href} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
              {label}
            </Link>
          ) : (
            <a
              key={key}
              href={href}
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          )
        )
      } else {
        nodes.push(token)
      }
    } else if (token.startsWith('http')) {
      const href = token.replace(/[.,;:)]+$/, '')
      const trailing = token.slice(href.length)
      nodes.push(
        <a
          key={key}
          href={href}
          className="text-blue-400 hover:text-blue-300 underline underline-offset-2 break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {href}
        </a>
      )
      if (trailing) nodes.push(trailing)
    } else {
      nodes.push(token)
    }

    lastIndex = match.index + token.length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return nodes
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export default function MarkdownContent({ content, className = 'legal-markdown' }: Props) {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const elements: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()

    if (!trimmed) {
      i += 1
      continue
    }

    if (trimmed === '---') {
      elements.push(<hr key={key++} className="my-10 border-gray-800" />)
      i += 1
      continue
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      const level = headingMatch[1].length
      const text = headingMatch[2].trim()
      const id = slugify(text.replace(/\*\*/g, ''))
      const headingClassName =
        level === 1
          ? 'text-3xl font-bold text-white mt-12 mb-4 scroll-mt-24'
          : level === 2
            ? 'text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24'
            : level === 3
              ? 'text-xl font-semibold text-gray-100 mt-8 mb-3 scroll-mt-24'
              : 'text-lg font-semibold text-gray-200 mt-6 mb-2 scroll-mt-24'

      const Tag = (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4')
      elements.push(
        <Tag key={key++} id={id} className={headingClassName}>
          {renderInline(text, `h-${key}`)}
        </Tag>
      )
      i += 1
      continue
    }

    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''))
        i += 1
      }
      elements.push(
        <blockquote
          key={key++}
          className="my-6 border-l-4 border-blue-500 bg-blue-950/30 px-5 py-4 rounded-r-lg text-gray-200"
        >
          {quoteLines.map((qLine, qIdx) =>
            qLine ? (
              <p key={qIdx} className="leading-relaxed my-1">
                {renderInline(qLine, `bq-${key}-${qIdx}`)}
              </p>
            ) : (
              <div key={qIdx} className="h-2" />
            )
          )}
        </blockquote>
      )
      continue
    }

    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        tableLines.push(lines[i].trim())
        i += 1
      }

      if (tableLines.length >= 2) {
        const splitRow = (rowStr: string) =>
          rowStr
            .split('|')
            .slice(1, -1)
            .map((c) => c.trim())

        const headers = splitRow(tableLines[0])
        const hasDivider = tableLines[1].replace(/[\s|:-]/g, '') === ''
        const dataRowStart = hasDivider ? 2 : 1
        const rows = tableLines.slice(dataRowStart).map(splitRow)

        elements.push(
          <div
            key={key++}
            className="my-8 overflow-x-auto rounded-xl border border-gray-700 bg-gray-900/70 shadow-xl"
          >
            <table className="w-full text-left text-sm text-gray-300 border-collapse">
              <thead className="bg-gray-800 text-xs uppercase tracking-wider text-gray-200 border-b border-gray-700">
                <tr>
                  {headers.map((th, thIdx) => (
                    <th key={thIdx} className="px-5 py-3.5 font-semibold">
                      {renderInline(th, `th-${key}-${thIdx}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {rows.map((rowCells, rIdx) => (
                  <tr
                    key={rIdx}
                    className="hover:bg-gray-800/40 transition-colors"
                  >
                    {rowCells.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-5 py-3.5 leading-relaxed ${
                          cIdx === 0
                            ? 'font-medium text-gray-100 whitespace-nowrap'
                            : 'text-gray-300'
                        }`}
                      >
                        {renderInline(cell, `td-${key}-${rIdx}-${cIdx}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
        continue
      }
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ''))
        i += 1
      }
      elements.push(
        <ul key={key++} className="my-4 list-disc space-y-2 pl-6 text-gray-300">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item, `ul-${key}-${idx}`)}
            </li>
          ))}
        </ul>
      )
      continue
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''))
        i += 1
      }
      elements.push(
        <ol key={key++} className="my-4 list-decimal space-y-2 pl-6 text-gray-300">
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInline(item, `ol-${key}-${idx}`)}
            </li>
          ))}
        </ol>
      )
      continue
    }

    const paragraphLines: string[] = [trimmed]
    i += 1
    while (
      i < lines.length &&
      lines[i].trim() &&
      lines[i].trim() !== '---' &&
      !/^#{1,4}\s+/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !lines[i].trim().startsWith('>') &&
      !(lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|'))
    ) {
      paragraphLines.push(lines[i].trim())
      i += 1
    }

    elements.push(
      <p key={key++} className="mb-5 text-gray-300 leading-relaxed">
        {renderInline(paragraphLines.join(' '), `p-${key}`)}
      </p>
    )
  }

  return <div className={className}>{elements}</div>
}
