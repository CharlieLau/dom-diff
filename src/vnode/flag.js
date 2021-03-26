
export const NODE_FLAG = {
    TEXT: 1,
    ELEMENT: 1 << 1
}

export const CHILD_FLAG = {
    NO_CHILD: 1,
    SINGLE_CHILD: 1 << 1,
    NO_KEY_CHILD: 1 << 2,
    KEY_CHILD: 1 << 3,
    MULTI_CHILD: null
}

CHILD_FLAG.MULTI_CHILD = CHILD_FLAG.NO_KEY_CHILD | CHILD_FLAG.KEY_CHILD