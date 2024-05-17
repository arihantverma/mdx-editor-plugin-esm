import { addImportVisitor$, addLexicalNode$, addExportVisitor$, addMdastExtension$, realmPlugin, addSyntaxExtension$, addToMarkdownExtension$, rootEditor$, activeEditor$ } from '@mdxeditor/editor'
import { mdxjsEsmToMarkdown, mdxjsEsmFromMarkdown } from 'mdast-util-mdxjs-esm'
import { mdxjsEsm } from 'micromark-extension-mdxjs-esm'
import * as acorn from 'acorn'
import { MdastESMVisitor } from './mdast-esm-visitor'
import { LexicalEsmNodeVisitor } from './lexical-esm-node-visitor'
import { ESMNode } from './esm-node'
import type { Acorn } from 'micromark-extension-mdxjs-esm/lib/syntax'

export const esmMdxEditorPlugin = realmPlugin({
  init: (r) => {
    r.pubIn({
      [addImportVisitor$]: [MdastESMVisitor],
      [addLexicalNode$]: [ESMNode],
      [addExportVisitor$]: [LexicalEsmNodeVisitor],
      [addMdastExtension$]: [mdxjsEsmFromMarkdown()],
      [addSyntaxExtension$]: [mdxjsEsm({ acorn: acorn as Acorn })],
      [addToMarkdownExtension$]: [mdxjsEsmToMarkdown()]
    })
  },
})