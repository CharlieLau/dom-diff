import { CHILD_FLAG, NODE_FLAG } from "../vnode/flag.js"
import { mount } from "./index.js"

export function mountElement(vnode, parent, refNode) {
    const { children, childFlag } = vnode
    const el = document.createElement(vnode.tag)
    vnode.el = el

    if (childFlag !== NODE_FLAG.NODE_FLAG) {
        if (childFlag & CHILD_FLAG.SINGLE_CHILD) {
            mount(children, el)
        } else if (childFlag & CHILD_FLAG.MULTI_CHILD) {
            children.forEach(child => mount(child, el))
        }
    }

    refNode ? parent.insertBefore(el, refNode) : parent.appendChild(el)
}