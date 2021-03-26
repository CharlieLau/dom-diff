import { VNode } from './vnode.js'

export function h(tag, options, children) {
    return new VNode(tag, options, children)
}
