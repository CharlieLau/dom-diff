import { patchOptions } from "./options.js"
import { replaceElement } from "./replaceElement.js"
import { patchChildren } from './children.js'

export function patchElement(prevNode, nextNode, parent) {
    if (prevNode.tag !== nextNode.tag) {
        return replaceElement(prevNode, nextNode, parent)
    }
    const el = nextNode.el = prevNode.el

    const { options: prevData } = prevNode
    const { options: nextData } = nextNode
    // 新增或者替换老属性
    Object.keys(nextData).forEach(key => {
        const prevValue = prevData[key];
        const nextValue = nextData[key];
        patchOptions(el, key, prevValue, nextValue)
    })
    // // 删除新不存在的老属性
    Object.keys(prevData).forEach(key => {
        if (!nextData.hasOwnProperty(key)) {
            patchOptions(el, key, prevData[key], null)
        }
    })

    const prevChildren = prevNode.children;
    const nextChildren = nextNode.children;
    const prevChildFlag = prevNode.childFlag;
    const nextChildFlag = nextNode.childFlag;

    patchChildren(prevChildren, prevChildFlag, nextChildren, nextChildFlag, el)
}