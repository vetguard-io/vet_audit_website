import type { ReactNode } from 'react'
import Link from 'next/link'

type Props = {
  content: string
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

export default function MarkdownContent({ content }: Props) {
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
      const className =
        level === 1
          ? 'text-3xl font-bold text-white mt-12 mb-4 scroll-mt-24'
          : level === 2
            ? 'text-2xl font-bold text-white mt-12 mb-4 scroll-mt-24'
            : level === 3
              ? 'text-xl font-semibold text-gray-100 mt-8 mb-3 scroll-mt-24'
              : 'text-lg font-semibold text-gray-200 mt-6 mb-2 scroll-mt-24'

      const Tag = (`h${level}` as 'h1' | 'h2' | 'h3' | 'h4')
      elements.push(
        <Tag key={key++} id={id} className={className}>
          {renderInline(text, `h-${key}`)}
        </Tag>
      )
      i += 1
      continue
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
      !/^\d+\.\s+/.test(lines[i].trim())
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

  return <div className="legal-markdown">{elements}</div>
}
