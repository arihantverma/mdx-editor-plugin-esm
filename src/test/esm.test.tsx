import React from 'react'
import { describe, expect, it } from 'vitest'
import { MDXEditor } from '@mdxeditor/editor'
import { render } from '@testing-library/react'
import type { MDXEditorMethods } from '@mdxeditor/editor'

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
// ;(globalThis as any).IS_REACT_ACT_ENVIRONMENT = true

function testIdenticalMarkdown(markdown: string) {
  const ref = React.createRef<MDXEditorMethods>()
  render(<MDXEditor ref={ref} markdown={markdown} />)
  const processedMarkdown = ref.current?.getMarkdown().trim()
  expect(processedMarkdown).toEqual(markdown.trim())
}

describe('markdown ↔️ lexical', () => {
  it('lexical emits the same markdown when input markdown has es modules', () => {
    testIdenticalMarkdown(`import { createContext } from 'react'\n\n# Heading \n\n export const a = 1`)
  })
})
