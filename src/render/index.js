import { mount } from '../mount/index.js'
import { patch } from '../patch/index.js'


export function render(vnode, parent) {
    const prev = parent._vnode
    if (!prev) {
        mount(vnode, parent)
    } else {
        patch(prev, vnode, parent)
    }
    parent._vnode = vnode
}