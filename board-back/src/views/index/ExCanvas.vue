<template>
  <div class="ex-canvas">
    <canvas ref="canvas"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, toRef } from "vue";
const props = defineProps(["brushData", "size", "width", "height"]);
let brushData = toRef(props, "brushData");
let size = toRef(props, "size");
const width = toRef(props, "width");
const height = toRef(props, "height");
const canvas = ref<HTMLCanvasElement | null>(null);
let particleCanvas = ref<ParticleCanvas>();
// 获取上下文
let context = ref<CanvasRenderingContext2D | null>(null);

class ParticleCanvas {
  canvasEle: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  PathArr: brush[];
  constructor(target: HTMLCanvasElement, brushData: Array<brush>) {
    this.canvasEle = target;
    this.ctx = target.getContext("2d") as CanvasRenderingContext2D;
    this.width = width.value;
    this.height = height.value;
    this.PathArr = brushData;
  }
  drawArr() {
    this.PathArr.map((item) => {
      item.draw(this.ctx);
    });
  }
}

class brush {
  type: string;
  data: any;
  x: number;
  y: number;
  width: number;
  height: number;
  boardId: string;
  brushId: string;
  userId: string;
  constructor(brushData: any) {
    this.type = brushData.type;
    this.data = brushData.data;
    this.x = brushData.x;
    this.y = brushData.y;
    this.width = brushData.width;
    this.height = brushData.height;
    this.boardId = brushData.boardId;
    this.brushId = brushData.brushId;
    this.userId = brushData.userId;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    switch (this.type) {
      case "brush": {
        if (Array.isArray(this.data)) {
          this.data.map((brushItem: any) => {
            if (brushItem.beginX === null || brushItem.beginY === null || !ctx)
              return;
            let { lastX, lastY, beginX, beginY, strokeStyle, lineWidth } =
              brushItem;
            lastX = Number(lastX) / Number(size.value);
            lastY = Number(lastY) / Number(size.value);
            beginX = Number(beginX) / Number(size.value);
            beginY = Number(beginY) / Number(size.value);
            lineWidth =
              Number(lineWidth) / Number(size.value) < 1
                ? 1
                : Number(lineWidth);
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.strokeStyle = strokeStyle || "black";
            ctx.lineWidth = lineWidth || 3;
            ctx.moveTo(beginX, beginY);
            ctx.lineTo(lastX, lastY);
            ctx.stroke();
            ctx.closePath();
          });
        } else {
          if (this.data.beginX === null || this.data.beginY === null || !ctx)
            return;
          let { lastX, lastY, beginX, beginY, strokeStyle, lineWidth } =
            this.data;
          lastX = Number(lastX) / Number(size.value);
          lastX = Number(lastY) / Number(size.value);
          lastX = Number(beginX) / Number(size.value);
          lastX = Number(beginY) / Number(size.value);
          lineWidth =
            Number(lineWidth) / Number(size.value) < 1 ? 1 : Number(lineWidth);
          ctx.beginPath();
          ctx.lineCap = "round";
          ctx.strokeStyle = strokeStyle || "black";
          ctx.lineWidth = lineWidth || 3;
          ctx.moveTo(beginX, beginY);
          ctx.lineTo(lastX, lastY);
          ctx.stroke();
          ctx.closePath();
        }
        break;
      }
      case "text": {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.font = this.data.fontWidth + " " + this.data.fontFamily;
        ctx.fillStyle = this.data.fontColor || "black";
        let x = Number(this.data.x) / Number(size.value);
        let y = Number(this.data.y) / Number(size.value);
        ctx.fillText(this.data.text, x, y);
        ctx.stroke();
        break;
      }
      case "image": {
        const image = new Image();
        image.src = this.data.src;
        let x = Number(this.data.x) / Number(size.value),
          y = Number(this.data.y) / Number(size.value),
          width = Number(this.data.width) / Number(size.value),
          height = Number(this.data.height) / Number(size.value);
        image.onload = () => {
          ctx.beginPath();
          ctx.drawImage(image, x, y, width, height);
          ctx.stroke();
        };
        break;
      }
      case "round": {
        let lineWidth =
          Number(this.data.lineWidth) / Number(size.value) < 1
            ? 1
            : Number(this.data.lineWidth);
        let x = Number(this.data.x) / Number(size.value),
          y = Number(this.data.y) / Number(size.value),
          radus = Number(this.data.radus) / Number(size.value);
        ctx.strokeStyle = this.data.strokeStyle || "black";
        ctx.lineWidth = lineWidth || 2;
        ctx.beginPath();
        ctx.arc(x, y, radus, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      }
      case "rect": {
        let lineWidth =
          Number(this.data.lineWidth) / Number(size.value) < 1
            ? 1
            : Number(this.data.lineWidth);
        let x = Number(this.data.x) / Number(size.value),
          y = Number(this.data.y) / Number(size.value),
          width = Number(this.data.width) / Number(size.value),
          height = Number(this.data.height) / Number(size.value);
        ctx.strokeStyle = this.data.strokeStyle || "black";
        ctx.lineWidth = lineWidth || 2;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.stroke();
        break;
      }
    }
  }
}
onMounted(() => {
  brushData.value.forEach((item: any) => {
    if (typeof item.data === "string") item.data = JSON.parse(item.data);
  });
  if (canvas.value) {
    context.value = canvas.value.getContext("2d");
    canvas.value.style.width = width.value + "px";
    canvas.value.style.height = height.value + "px";
    let data = brushData.value.map((item: any) => {
      let brushItem = new brush(item);
      return brushItem;
    });
    particleCanvas.value = new ParticleCanvas(canvas.value, data);
    particleCanvas.value.drawArr();
  }
});
</script>
<style lang="less">
.ex-canvas {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 200px;
  }
}
</style>
