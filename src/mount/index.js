import { NODE_FLAG } from '../vnode/flag.js'
import { mountText } from './text.js'
import { mountElement } from './element.js'
import { patchOptions } from '../patch/options.js'
export function mount(vnode, el, refNode) {
    const { flag, options } = vnode
    if (flag & NODE_FLAG.TEXT) {
        mountText(vnode, el)
    } else if (flag & NODE_FLAG.ELEMENT) {
        mountElement(vnode, el,refNode)
        Object.keys(options).forEach(key => {
            patchOptions(vnode.el, key, undefined, options[key])
        })
    }
}