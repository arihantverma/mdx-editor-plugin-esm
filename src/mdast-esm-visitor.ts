import type { MdastImportVisitor } from "@mdxeditor/editor";
import type {Text as MDastText} from 'mdast'
import { $createESMNode } from "./esm-node";
import { ElementNode } from "lexical";

export const MdastESMVisitor: MdastImportVisitor<MDastText> = {
  testNode: 'mdxjsEsm',
  visitNode: function ({ mdastNode, lexicalParent }) {
    const importExportStatementNode = $createESMNode(mdastNode.value)
    ;(lexicalParent as unknown as ElementNode).append(importExportStatementNode)
    return true
  }
}