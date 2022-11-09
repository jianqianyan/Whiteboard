interface Path {
    lastX: any,
    lastY: any,
    beginY: any,
    beginX: any,
    strokeStyle?: String,
    lineWidth?: number
}
interface ctxFormat {
    lineWidth: number,
    strokeStyle: String,
}
interface TextPath {
    x: any,
    y: any,
    text: any,
    fontFamily: any,
    fontWidth: any,
}


export type { Path, ctxFormat,TextPath }