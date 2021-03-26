import { NODE_FLAG, CHILD_FLAG } from './flag.js'


export class VNode {

    constructor(tag, options, children, text) {
        this.tag = tag;
        this.options = options
        this.text = text || (typeof children === 'string' ? children : '')
        this.el = null
        this._isVNode = true
        if (options) {
            this.key = options.key
        }
        this.flag = tag === undefined ? NODE_FLAG.TEXT : NODE_FLAG.ELEMENT
        this.childFlag = null
        if (Array.isArray(children)) {
            if (children.length === 0) {
                this.childFlag = CHILD_FLAG.NO_CHILD
            } else if (children.length === 1) {
                this.childFlag = CHILD_FLAG.SINGLE_CHILD
                if (typeof children[0] === 'string') {
                    this.children = createTextVNode(children[0])
                } else {
                    this.children = children[0]
                }
            } else {
                this.childFlag = CHILD_FLAG.KEY_CHILD
                this.children = normalizeVNodes(children)
            }

        } else if (children === null) {
            this.childFlag = CHILD_FLAG.NO_CHILD
        } else {
            this.childFlag = CHILD_FLAG.SINGLE_CHILD
        }
    }
}

function createTextVNode(text) {
    return new VNode(undefined, undefined, undefined, text)
}
function normalizeVNodes(children) {
    for (let i = 0; i < children.length; i++) {
        let child = children[i]
        if (!child._isVNode) child = children[i] = createTextVNode(child)
        if (child.key == null) child.key = '|' + i
    }
    return children
}