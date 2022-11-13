// 绘制数据接口
export interface DrawInfo {
  type: string,
  data: BrushPath | TextPath
}
// Brush 数据类型接口
export interface BrushPath {
  lastX: any,
  lastY: any,
  beginY: any,
  beginX: any,
  strokeStyle?: String,
  lineWidth?: number
}
// Text 数据类型接口
export interface TextPath {
  x: any,
  y: any,
  text: any,
  fontFamily: any,
  fontWidth: any,
  fontColor: any,
  width?: any,
  height?: any
}
// 绘制动作
export function draw(info: DrawInfo, useCtx: any) {
  if (info.type === 'brush') {
    drawBrush(info.data as BrushPath, useCtx);
  } else if (info.type === 'text') {
    drawText(info.data as TextPath, useCtx);
  }
}

// 绘制 text 的input
export function drawInput(Info: any, input: any) {
  let path = "left: " + Info.x + "px;" + "top: " + Info.y + "px;";
  input.setAttribute("style", path);
}

// brush 类型绘制
function drawBrush(path: BrushPath, useCtx: any) {
  if (path.beginX !== null && path.beginY !== null && useCtx) {
    const { lastX, lastY, beginX, beginY, strokeStyle, lineWidth } = path;
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
// text 类型绘制
function drawText(path: TextPath, useCtx: any) {
  useCtx.font = path.fontWidth + " " + path.fontFamily;
  useCtx.fillStyle = path.fontColor || "black";
  useCtx.fillText(path.text, path.x, path.y);
}