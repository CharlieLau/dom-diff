import { reactDiff } from "./reactDiff.js";
import { vue2Diff } from "./vue2Diff.js";


export function diff(prevChildren, nextChildren, parent) {
    // return vue2Diff(prevChildren, nextChildren, parent)
    return reactDiff(prevChildren,nextChildren,parent)
}



