
interface ctxFormat {
    lineWidth: number,
    strokeStyle: string,
}

export function canvasInit(canvasName: string) {
    let canvas: any = document.querySelector(canvasName);
    if (!canvas) return;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = document.body.clientWidth * dpr;
    canvas.height = (document.body.clientHeight - 20) * dpr;
    canvas.style.width = document.body.clientWidth + "px";
    canvas.style.height = document.body.clientHeight - 20 + "px";
    let ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    return { canvas, ctx };
}

export type { ctxFormat }