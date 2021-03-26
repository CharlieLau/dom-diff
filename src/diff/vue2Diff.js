/**
 * 双端对比
 */
import { mount } from "../mount/index.js";
import { patch } from "../patch/index.js";

export function vue2Diff(prevChildren, nextChildren, parent) {

    let prevStartIndex = 0;
    let prevEndIndex = prevChildren.length - 1;
    let prevStartNode = prevChildren[0];
    let prevEndNode = prevChildren[prevEndIndex];

    let nextStartIndex = 0;
    let nextEndIndex = nextChildren.length - 1;
    let nextStartNode = nextChildren[0];
    let nextEndNode = nextChildren[nextEndIndex];

    while (prevStartIndex <= prevEndIndex && nextStartIndex <= nextEndIndex) {

    // let count = 0
    // while (count <= 2) {
        if (prevStartNode === undefined) {
            prevStartNode = prevChildren[++prevStartIndex]
        } else if (nextStartNode === undefined) {
            nextStartNode = nextChildren[++nextStartIndex]
        } else if (prevStartNode.key === nextStartNode.key) {
            // 首 首
            patch(prevStartNode, nextStartNode, parent)
            prevStartIndex++
            nextStartIndex++
            prevStartNode = prevChildren[prevStartIndex]
            nextStartNode = nextChildren[nextStartIndex]
        } else if(prevEndNode.key === nextEndNode.key){
            // 尾 尾
            patch(prevEndNode,nextEndNode,parent)
            prevEndIndex --
            nextEndIndex --
            prevEndNode = prevChildren[prevEndIndex]
            nextEndNode = nextChildren[nextEndIndex]
        } else if(prevStartNode.key === nextEndNode.key){
            // 首 尾 
            patch(prevStartNode,nextEndNode,parent)
            prevStartIndex++
            nextEndIndex--
            // 要把 需要移动的节点 prevStartNode  放到当前最后一个节点 prevEndNode兄弟后面
            parent.insertBefore(prevStartNode.el, prevEndNode.el.nextSibling)

            prevStartNode = prevChildren[prevStartIndex]
            nextEndNode =  nextChildren[nextEndIndex]
        }else  if (prevEndNode.key === nextStartNode.key){
            // 尾 首
            patch(prevEndNode,nextStartNode,parent)

            prevEndIndex --
            nextStartIndex++
            //要把需要移动的节点prevEndNode 放到prevStartNode 的前面
            parent.insertBefore(prevEndNode.el, prevStartNode.el)

            prevEndNode = prevChildren[prevEndIndex]
            nextStartNode = nextChildren[nextStartIndex]
        } else {
            // 我们讲了双端比较的原理，但是有一种特殊情况，当四次对比都没找到复用节点时，我们只能拿新列表的第一个节点去旧列表中找与其key相同的节点。
            let newKey = nextStartNode.key;
            let oldIndex = prevChildren.findIndex((child) => child.key === newKey)
            // 找节点的时候其实会有两种情况：一种在旧列表中找到了，另一种情况是没找到。我们先以上图为例，说一下找到的情况。

          
            if (oldIndex > -1) {
                // 当我们在旧列表中找到对应的VNode，我们只需要将找到的节点的DOM元素，移动到开头就可以了。
                // 这里的逻辑其实和第四步的逻辑是一样的，只不过第四步是移动的尾节点，这里是移动找到的节点。
                // DOM移动后，由我们将旧列表中的节点改为undefined，这是至关重要的一步，因为我们已经做了节点的移动了所以我们不需要进行再次的对比了。
                //  最后我们将头指针newStartIndex向后移一位。
                let oldNode = prevChildren[oldIndex]
                patch(oldNode, newStartNode, parent)
                parent.insertBefore(oldNode.el, oldStartNode.el)
                prevChildren[oldIndex] = undefined
            } else {
                // 如果在旧列表中没有找到复用节点呢？很简单，直接创建一个新的节点放到最前面就可以了，然后后移头指针newStartIndex。
                mount(newStartNode, parent, oldStartNode.el)
            }
            newStartNode = nextChildren[++newStartIndex]
        }
    //     count++
    // }
    }

    // console.log('prevStartIndex', prevStartIndex, 'nextStartIndex', nextStartIndex,)
    // console.log('prevEndIndex', prevEndIndex, 'nextEndIndex', nextEndIndex,)


    // 此时oldEndIndex以及小于了oldStartIndex，但是新列表中还有剩余的节点，我们只需要将剩余的节点依次插入到oldStartNode的DOM之前就可以了。
    // 为什么是插入oldStartNode之前呢？原因是剩余的节点在新列表的位置是位于oldStartNode之前的，如果剩余节点是在oldStartNode之后，oldStartNode就会先行对比，这个需要思考一下，其实还是与第四步的思路一样。
    if (prevStartIndex > prevEndIndex) {
        while (nextStartIndex <= nextEndIndex) {
            mount(nextChildren[nextStartIndex++], parent, prevStartNode.el)
        }
    } else if (nextStartIndex > nextEndIndex) {
        // 当新列表的newEndIndex小于newStartIndex时，我们将旧列表剩余的节点删除即可。
        // 这里我们需要注意，旧列表的undefind。在第二小节中我们提到过，当头尾节点都不相同时，我们会去旧列表中找新列表的第一个节点，移动完 DOM 节点后，将旧列表的那个节点改为undefind。所以我们在最后的删除时，需要注意这些undefind，遇到的话跳过当前循环即可。
        while (prevStartIndex <= prevEndIndex) {
            parent.removeChild(prevChildren[prevStartIndex++].el)
        }
    }
}