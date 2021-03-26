
export function patchText(prevNode, nextNode) {
    const el = nextNode.el = prevNode.el
    if (prevNode.text !== nextNode.text) {
        el.nodeValue = nextNode.text;
    }
}