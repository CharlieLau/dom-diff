

import { NODE_FLAG } from '../vnode/flag.js'
import { patchElement } from './patchElement.js'
import { patchText } from './text.js'

export function patch(prevNode, nextNode, parent) {
    if (prevNode.flag !== nextNode.flag) {
        replaceNode(prevNode, nextNode, parent)
    } else if (nextNode.flag === NODE_FLAG.ELEMENT) {
        patchElement(prevNode, nextNode, parent)
    } else if (nextNode.flag === NODE_FLAG.TEXT) {
        patchText(prevNode, nextNode)
    }
}