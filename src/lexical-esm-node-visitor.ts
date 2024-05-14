import type { MdxjsEsm } from 'mdast-util-mdxjs-esm'
import type {LexicalExportVisitor} from '@mdxeditor/editor'
import { $isESMNode, ESMNode } from './esm-node'

export const LexicalEsmNodeVisitor: LexicalExportVisitor<ESMNode, MdxjsEsm> = {
  testLexicalNode: $isESMNode,
  visitLexicalNode({ actions, lexicalNode }) {
    actions.addAndStepInto('mdxjsEsm', {
      value: lexicalNode.getValue()
    })
  },
  priority: -100
}
