// 绘制数据接口
export interface DrawInfo {
  type: string,
  data: BrushPath | TextPath | ImagePath | RectPath | RoundPath | Array<BrushPath> | null,
  checked?: boolean,
  x?: number,
  y?: number,
  width?: number,
  height?: number,
}
// Brush 数据类型接口
export interface BrushPath {
  lastX: number | null,
  lastY: number | null,
  beginY: number | null,
  beginX: number | null,
  strokeStyle?: string,
  lineWidth?: number
}
// Text 数据类型接口
export interface TextPath {
  x: number,
  y: number,
  text: string,
  fontFamily: string,
  fontWidth: string,
  fontColor: string,
}
// image 数据类型接口
export interface ImagePath {
  x: number,
  y: number,
  src: string,
  width: number,
  height: number
}
// 矩形数据类型接口
export interface RectPath {
  x: number,
  y: number,
  width: number,
  height: number,
  strokeStyle?: string,
  lineWidth?: number
}
// 圆形数据接口
export interface RoundPath {
  x: number,
  y: number,
  radus: number,
  strokeStyle?: string,
  lineWidth?: number
}

// 绘制路径数组
export function drawArr(infoArr: Array<DrawInfo>, useCtx: any, canvas: any) {
  let rect = canvas!.getBoundingClientRect();
  useCtx.clearRect(rect.x, rect.y, rect.width, rect.height);
  try {
    infoArr.map(item => {
      if (item.type === 'brush')
        (item.data as Array<BrushPath>).map(brushItem => draw({ type: item.type, data: brushItem }, useCtx));
      else
        draw(item, useCtx);
      // 绘制被选中的笔迹
      if (!item.checked) return;
      if (item.type === 'text') {
      } else {
        useCtx.save();
        drawBeClick(item, useCtx);
        useCtx.restore();
      }
    })
  } catch (err) {
    console.log(err);
  }
}

// 绘制动作
export function draw(info: DrawInfo, useCtx: any) {
  try {
    useCtx.save();
    switch (info.type) {
      case 'brush': {
        drawBrush(info.data as BrushPath, useCtx);
        break;
      }
      case 'text': {
        drawText(info.data as TextPath, useCtx);
        break;
      }
      case 'image': {
        drawImage(info.data as ImagePath, useCtx);
        break;
      }
      case 'rect': {
        drawRect(info.data as RectPath, useCtx);
        break;
      }
      case 'round': {
        drawRound(info.data as RoundPath, useCtx);
        break;
      }
    }
    useCtx.restore();
  } catch (err) {
    console.log(err);
  }
}

// 绘制 text 的input
export function drawInput(Info: any, input: any) {
  let path = "left: " + Info.x + "px;" + "top: " + Info.y + "px;";
  input.setAttribute("style", path);
}

// brush 类型绘制
function drawBrush(path: BrushPath, useCtx: any) {
  if (path.beginX == null || path.beginY === null || !useCtx) return;
  const { lastX, lastY, beginX, beginY, strokeStyle, lineWidth } = path;
  useCtx.beginPath();
  useCtx.lineCap = "round";
  useCtx.strokeStyle = strokeStyle || "black";
  useCtx.lineWidth = lineWidth || 3;
  useCtx.moveTo(beginX, beginY);
  useCtx.lineTo(lastX, lastY);
  useCtx.stroke();
  useCtx.closePath();
}
// text 类型绘制
function drawText(path: TextPath, useCtx: any) {
  useCtx.beginPath();
  useCtx.lineCap = "round";
  useCtx.font = path.fontWidth + " " + path.fontFamily;
  useCtx.fillStyle = path.fontColor || "black";
  useCtx.fillText(path.text, path.x, path.y);
  useCtx.stroke();
}

// image 类型绘制
function drawImage(path: ImagePath, useCtx: any) {
  const image = new Image();
  image.src = path.src;
  image.onload = () => {
    useCtx.beginPath();
    useCtx.drawImage(image, path.x, path.y, path.width, path.height);
    useCtx.stroke();
  }
}

// 矩形类型绘制
function drawRect(path: RectPath, useCtx: any) {
  useCtx.strokeStyle = path.strokeStyle || "black";
  useCtx.lineWidth = path.lineWidth || 2;
  useCtx.beginPath();
  useCtx.rect(path.x, path.y, path.width, path.height);
  useCtx.stroke();
}

// 圆形类型绘制
function drawRound(path: RoundPath, useCtx: any) {
  useCtx.strokeStyle = path.strokeStyle || "black";
  useCtx.lineWidth = path.lineWidth || 2;
  useCtx.beginPath();
  useCtx.arc(path.x, path.y, path.radus, 0, 2 * Math.PI);
  useCtx.stroke();
}

// 绘制被选中框
function drawBeClick(path: DrawInfo, useCtx: any) {
  let x = path.width as number > 0 ? path.x as number - 10 : path.x as number + 10;
  let y = path.height as number > 0 ? path.y as number - 10 : path.y as number + 10;
  let width = path.width as number > 0 ? path.width as number + 20 : path.width as number - 20;
  let height = path.height as number > 0 ? path.height as number + 20 : path.height as number - 20;
  useCtx.strokeStyle = "black";
  useCtx.lineWidth = 2;
  useCtx.setLineDash([5]);
  useCtx.beginPath();
  useCtx.rect(x, y, width, height);
  useCtx.stroke();
}