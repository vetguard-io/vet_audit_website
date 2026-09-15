import fs from 'fs'
import path from 'path'

export type LegalDoc = {
  title: string
  effectiveDate: string | null
  lastUpdated: string | null
  body: string
}

const META_PATTERNS = {
  effectiveDate: /^\*\*Effective Date:\s*(.+?)\*\*$/i,
  lastUpdated: /^\*\*Last Updated:\s*(.+?)\*\*$/i,
}

export function loadLegalDoc(filename: string): LegalDoc {
  const filePath = path.join(process.cwd(), 'content', 'legal', filename)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const lines = raw.replace(/\r\n/g, '\n').split('\n')

  let title = ''
  let effectiveDate: string | null = null
  let lastUpdated: string | null = null
  let bodyStart = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!title && line.startsWith('# ')) {
      title = line.slice(2).trim()
      bodyStart = i + 1
      continue
    }

    const effectiveMatch = line.match(META_PATTERNS.effectiveDate)
    if (effectiveMatch) {
      effectiveDate = effectiveMatch[1].trim()
      bodyStart = i + 1
      continue
    }

    const updatedMatch = line.match(META_PATTERNS.lastUpdated)
    if (updatedMatch) {
      lastUpdated = updatedMatch[1].trim()
      bodyStart = i + 1
      continue
    }

    // Skip company subtitle / blank lines / leading hr before body starts
    if (
      line === '' ||
      line === '---' ||
      (line.startsWith('**') && line.endsWith('**') && !line.includes(':'))
    ) {
      bodyStart = i + 1
      continue
    }

    bodyStart = i
    break
  }

  return {
    title: title || filename,
    effectiveDate,
    lastUpdated,
    body: lines.slice(bodyStart).join('\n').trim(),
  }
}
