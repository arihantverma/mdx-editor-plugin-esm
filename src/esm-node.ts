import type { NodeKey, LexicalNode, Spread, SerializedElementNode } from 'lexical'
import {ElementNode} from 'lexical'

export class ESMNode extends ElementNode {
  __value: string

  static getType(): string {
    return 'mdxjsEsm'
  }

  constructor(value: string, key?: NodeKey) {
    super(key)
    this.__value = value
  }

  static clone(node: ESMNode): ESMNode {
    return new ESMNode(node.__value, node.__key)
  }

  setValue(value: string): void {
    const self = this.getWritable()
    self.__value = value
  }

  getValue(): string {
    const self = this.getLatest()
    return self.__value
  }

  createDOM() {
    const el = document.createElement('div')
    el.className = 'import-export-statement'
    el.style.display = 'none'
    return el
  }

  updateDOM() {
    return false
  }

  exportJSON(): SerializedESMNode  {
    return {
      ...super.exportJSON(),
      value: this.__value,
      type: 'mdxjsEsm',
      version: 1
    }
  }

  static importJSON(serializedNode: SerializedESMNode): ESMNode {
    const node = $createESMNode(serializedNode.value)
    node.setFormat(serializedNode.format)
    node.setIndent(serializedNode.indent)
    node.setDirection(serializedNode.direction)
    return node
  }
}

export type SerializedESMNode = Spread<
  {
    value: string
    type: 'mdxjsEsm'
    version: 1
  },
  SerializedElementNode
>

export function $isESMNode(node: LexicalNode | null | undefined): node is ESMNode {
  return node instanceof ESMNode
}

export function $createESMNode(value: string): ESMNode {
  return new ESMNode(value)
}
