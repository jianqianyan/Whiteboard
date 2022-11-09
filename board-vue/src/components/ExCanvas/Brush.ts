import { Path, TextPath } from "./EsCanvas";
// 绘制动作
export function draw(pathInfo: Path, useCtx: any) {
  if (pathInfo.beginX !== null && pathInfo.beginY !== null && useCtx) {
    const { lastX, lastY, beginX, beginY, strokeStyle, lineWidth } = pathInfo;
    useCtx.beginPath();
    useCtx.lineCap = "round";
    useCtx.moveTo(beginX, beginY);
    useCtx.lineTo(lastX, lastY);
    useCtx.strokeStyle = strokeStyle || "black";
    useCtx.lineWidth = lineWidth || 3;
    useCtx.stroke();
    useCtx.closePath();
  }
}

export function drawText(TextInfo: TextPath, useCtx: any) {
  useCtx.font = TextInfo.fontWidth + " " + TextInfo.fontFamily;
  useCtx.fillStyle = TextInfo.fontColor || "black";
  useCtx.fillText(TextInfo.text, TextInfo.x, TextInfo.y);
  let textMsg = useCtx.measureText(TextInfo.text);
  let msg = {
    width: textMsg.width,
    height: textMsg.actualBoundingBoxAscent + textMsg.actualBoundingBoxDescent,
  };
  return msg;
}

export function drawInput(Info: any, input: any) {
  let path = "left: " + Info.x + "px;" + "top: " + Info.y + "px;";
  input.setAttribute("style", path);
}
