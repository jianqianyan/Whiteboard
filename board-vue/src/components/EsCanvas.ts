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



export type { Path, ctxFormat }