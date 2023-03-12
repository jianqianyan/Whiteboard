<template>
  <div class="ex-canvas">
    <canvas ref="canvas" style="width: 200px; height: 100px"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, toRef, defineProps } from "vue";
const props = defineProps(["brushData"]);
let brushData = toRef(props, "brushData");
const width = 250,
  height = 200;
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
    this.width = width;
    this.height = height;
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
            lastX = Number(lastX) / 10;
            lastY = Number(lastY) / 10;
            beginX = Number(beginX) / 10;
            beginY = Number(beginY) / 10;
            lineWidth = Number(lineWidth) / 10 < 1 ? 1 : Number(lineWidth);
            ctx.beginPath();
            ctx.lineCap = "round";
            ctx.strokeStyle = strokeStyle || "black";
            ctx.lineWidth = 3 || 3;
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
          lastX = Number(lastX) / 10;
          lastX = Number(lastY) / 10;
          lastX = Number(beginX) / 10;
          lastX = Number(beginY) / 10;
          lineWidth = Number(lineWidth) / 10 < 1 ? 1 : Number(lineWidth);
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
        let x = Number(this.data.x) / 10;
        let y = Number(this.data.y) / 10;
        ctx.fillText(this.data.text, x, y);
        ctx.stroke();
        break;
      }
      case "image": {
        const image = new Image();
        image.src = this.data.src;
        let x = Number(this.data.x) / 10,
          y = Number(this.data.y) / 10,
          width = Number(this.data.width) / 10,
          height = Number(this.data.height) / 10;
        image.onload = () => {
          ctx.beginPath();
          ctx.drawImage(image, x, y, width, height);
          ctx.stroke();
        };
        break;
      }
      case "round": {
        let lineWidth =
          Number(this.data.lineWidth) / 10 < 1
            ? 1
            : Number(this.data.lineWidth);
        let x = Number(this.data.x) / 10,
          y = Number(this.data.y) / 10,
          radus = Number(this.data.radus) / 10;
        ctx.strokeStyle = this.data.strokeStyle || "black";
        ctx.lineWidth = lineWidth || 2;
        ctx.beginPath();
        ctx.arc(x, y, radus, 0, 2 * Math.PI);
        ctx.stroke();
        break;
      }
      case "rect": {
        let lineWidth =
          Number(this.data.lineWidth) / 10 < 1
            ? 1
            : Number(this.data.lineWidth);
        let x = Number(this.data.x) / 10,
          y = Number(this.data.y) / 10,
          width = Number(this.data.width) / 10,
          height = Number(this.data.height) / 10;
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
    item.data = JSON.parse(item.data);
  });
  if (canvas.value) {
    context.value = canvas.value.getContext("2d");
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
