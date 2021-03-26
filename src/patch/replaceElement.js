import {mount} from '../mount/index.js'

export function replaceElement(prevNode, nextNode, parent) {
    parent.removeChild(prevNode.el)
    mount(nextNode, parent)
}