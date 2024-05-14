// Taken from https://github.com/mdx-editor/editor/blob/e2585b8489b96efb2b4f830f4e41b7d5767fe828/src/examples/_boilerplate.tsx
// Have removed some plugins since they are not used to showcase what this plugin does.

import React from 'react'
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { LeafDirective } from 'mdast-util-directive'
import {
  diffSourcePlugin,
  markdownShortcutPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  KitchenSinkToolbar
} from '@mdxeditor/editor'

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

export async function expressImageUploadHandler(image: File) {
  const formData = new FormData()
  formData.append('image', image)
  const response = await fetch('/uploads/new', {
    method: 'POST',
    body: formData
  })
  const json = (await response.json()) as { url: string }
  return json.url
}

interface YoutubeDirectiveNode extends LeafDirective {
  name: 'youtube'
  attributes: { id: string }
}

export const ALL_PLUGINS = [
  toolbarPlugin({ toolbarContents: () => <KitchenSinkToolbar /> }),
  listsPlugin(),
  quotePlugin(),
  headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
  linkPlugin(),
  linkDialogPlugin(),
  imagePlugin({
    imageAutocompleteSuggestions: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    imageUploadHandler: async () => Promise.resolve('https://picsum.photos/200/300')
  }),
  tablePlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: '' }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: 'JavaScript',
      css: 'CSS',
      txt: 'Plain Text',
      tsx: 'TypeScript',
      '': 'Unspecified'
    }
  }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: 'boo' }),
  markdownShortcutPlugin()
]
