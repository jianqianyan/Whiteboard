import { DrawInfo } from "../components/ExCanvas/Brush";
export function checkClick(drawArr: Array<DrawInfo>, pointX: string | number, pointY: string | number) {
    for (let i = 0; i < drawArr.length; ++i) {
        let drawX = drawArr[i].x as number, drawY = drawArr[i].y as number;
        let left = Math.min(drawX, ((drawX) + (drawArr[i].width as number)) as number);
        let right = Math.max(drawX, ((drawX) + (drawArr[i].width as number)) as number);
        let top = Math.min(drawY as number, ((drawY as number) + (drawArr[i].height as number)) as number);
        let bottom = Math.max(drawY as number, ((drawY as number) + (drawArr[i].height as number)) as number);
        if (pointX >= left - 5 && pointX <= right + 5 && pointY >= top - 5 && pointY <= bottom + 5) {
            return i;
        }
    }
    return -1;
}