import React from 'react'
import { MDXEditor } from '@mdxeditor/editor'
import markdown from './assets/live-demo-contents.md?raw'
import { ALL_PLUGINS } from './_boilerplate'
import '@mdxeditor/editor/style.css'
import { esmMdxEditorPlugin } from '..'

export function MDXEditorWithESM() {
  return <MDXEditor markdown={markdown} onChange={(md) => console.log('change', { md })} plugins={[...ALL_PLUGINS, esmMdxEditorPlugin()]} />
}
