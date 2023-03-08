import { draw, DrawInfo } from "../components/ExCanvas/Brush";
export function checkClick(
  drawArr: Array<DrawInfo>,
  pointX: string | number,
  pointY: string | number
) {
  for (let i = 0; i < drawArr.length; ++i) {
    let drawX = Number(drawArr[i].x),
      drawY = Number(drawArr[i].y),
      width = Number(drawArr[i].width),
      height = Number(drawArr[i].height);
    let left = Math.min(drawX, drawX + width);
    let right = Math.max(drawX, drawX + width);
    let top = Math.min(drawY, drawY + height);
    let bottom = Math.max(drawY, drawY + height);
    if (
      pointX >= left - 5 &&
      pointX <= right + 5 &&
      pointY >= top - 5 &&
      pointY <= bottom + 5
    ) {
      return i;
    }
  }
  return -1;
}
