import { mount } from "../mount/index.js";
import { CHILD_FLAG } from "../vnode/flag.js";
import { patch } from "./index.js";
import { diff } from '../diff/index.js'

export function patchChildren(prevChildren, prevChildFlag, nextChildren, nextChildFlag, parent) {

    switch (prevChildFlag) {
        // 如果旧单子节点
        case CHILD_FLAG.SINGLE_CHILD:
            switch (nextChildFlag) {
                // 如果新无子节点
                case CHILD_FLAG.NO_CHILD:
                    parent.remove(prevChildren)
                    break;
                // 如果新有单子节点
                case CHILD_FLAG.SINGLE_CHILD:
                    patch(prevChildren, nextChildren, parent)
                    break;
                default:
                    // 如果 新多子节点
                    parent.removeChild(prevChildren.el)
                    nextChildren.forEach(vnode => mount(vnode, parent))
                    break;
            }
            break;
        //  如果旧无子节点
        case CHILD_FLAG.NO_CHILD:
            switch (nextChildFlag) {
                // 如果新有单子节点
                case CHILD_FLAG.SINGLE_CHILD:
                    mount(nextChildren, parent)
                    break;
                // 如果没有子节点
                case CHILD_FLAG.NO_CHILD:
                    break;
                default:
                    // 如果 新多子节点
                    nextChildren.forEach(vnode => mount(vnode, parent))
                    break;
            }
            break;
        // 如果 旧 多个节点
        default:
            switch (nextChildFlag) {
                // 如果新没节点
                case CHILD_FLAG.NO_CHILD:
                    prevChildren.forEach(vnode => parent.removeChild(vnode.el))
                    break;
                // 如果新 只有一个
                case CHILD_FLAG.SINGLE_CHILD:
                    prevChildren.forEach(vnode => parent.removeChild(vnode.el))
                    mount(nextChildren, parent)
                    break;
                // 如果新 多个
                default:
                    diff(prevChildren, nextChildren, parent)
                    break;
            }
            break;
    }
}