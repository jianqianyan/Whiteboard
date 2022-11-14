<template>
  <canvas className="canvas" id="drawCanvas"></canvas>
  <OperationBox @operationEmits="operationClick"></OperationBox>
  <configBox @brushChange="brushChange" @methodChange="methodChange" :config="colorConfig"></configBox>
  <textInput @textEntry="textEntry" v-if="textInputShow.value" ref="textInputRef"></textInput>
</template>

<script setup lang="ts">
import OperationBox from "./ExCanvas/OperationBox.vue";
import configBox from "./ExCanvas/ConfigBox.vue";
import textInput from "./ExCanvas/textInput.vue";
import { onMounted, reactive, ref, nextTick } from "vue";
import { ctxFormat } from "./ExCanvas/EsCanvas";
import { draw, drawInput, DrawInfo, BrushPath, TextPath, ImagePath } from "./ExCanvas/Brush";

let mouseButtonDown = false;
let canvas: any;
let ctx: any;
let textInputShow = reactive({ value: false });
let drawMethod = reactive({ value: 1 });
let textInputRef = ref(null);

// 配置信息
// 默认笔刷格式
let ctxInfo: ctxFormat = {
  strokeStyle: "black",
  lineWidth: 3,
};
//

// 绘制路径信息
let pathInfo: BrushPath = {
  lastX: null,
  lastY: null,
  beginY: null,
  beginX: null,
  strokeStyle: ctxInfo.strokeStyle,
  lineWidth: ctxInfo.lineWidth,
};
// 点击位置
let pointerInfo: any = {
  x: 0,
  y: 0,
};

// 配置调色板信息
let colorConfig: any = ref({
  panWidth: ctxInfo.lineWidth,
  colorList: [
    "FF6900",
    "FCB900",
    "7BDCB5",
    "00D084",
    "8ED1FC",
    "0693E3",
    "ABB8C3",
    "EB144C",
    "F78DA7",
    "9900EF",
    "000000",
  ],
});

// 保存当前这次的绘制路径
let lineArr: Array<DrawInfo> = [];

// 用于保存历史路径
// 保存绘制路径
let pathArr: Array<Array<DrawInfo> | DrawInfo> = [];

function handleMouseDown(event: any) {
  if (drawMethod.value === 1) {
    mouseButtonDown = true;
    lineArr = [];
  } else if (drawMethod.value === 2) {
    if (textInputShow.value) {
      textInputShow.value = false;
      return;
    }
    pointerInfo = {
      x: event.pageX,
      y: event.pageY - 26,
    };
    textInputShow.value = true;
    nextTick(() => {
      let input = document.querySelector(".text-input");
      drawInput(pointerInfo, input);
    });
  } else if (drawMethod.value === 3) {
    pointerInfo = {
      x: event.pageX,
      y: event.pageY,
    };
    let ImageInfo: ImagePath = {
      x: pointerInfo.x,
      y: pointerInfo.y,
      src: "http://localhost:3000/public/image/1.jpg",
      width: 100,
      height: 100
    }
    let drawInfo: DrawInfo = {
      type: 'image',
      data: ImageInfo
    }
    draw(drawInfo, ctx);
  }
}
function handleMouseMove(event: any) {
  if (mouseButtonDown) {
    pathInfo = {
      beginX: pathInfo.lastX,
      beginY: pathInfo.lastY,
      lastX: event.pageX,
      lastY: event.pageY,
      strokeStyle: ctxInfo.strokeStyle,
      lineWidth: ctxInfo.lineWidth,
    };
    let drawInfo: DrawInfo = {
      type: 'brush',
      data: pathInfo
    }
    draw(drawInfo, ctx);
    // 记录历史信息
    lineArr.push(drawInfo);
  }
}
function handleMouseUp() {
  pathArr.push(lineArr);
  mouseButtonDown = false;
  pathInfo = {
    lastX: null,
    lastY: null,
    beginY: null,
    beginX: null,
  };
  lineArr = [];
}

// 触发操作按钮
const operationClick = (val: any) => {
  // 撤销功能
  if (val === "revoke") {
    if (pathArr.length === 0) return;
    pathArr.pop();
    let rect = canvas!.getBoundingClientRect();
    ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
    pathArr.map(item => {
      if (Array.isArray(item)) {
        item.map(path => {
          draw(path, ctx);
        })
      } else {
        draw(item, ctx)
      }
    })
  }
};

// 笔刷信息更改
const brushChange = (val: any) => {
  if (val.strokeStyle) {
    ctxInfo.strokeStyle = val.strokeStyle;
  }
  if (val.lineWidth) {
    ctxInfo.lineWidth = val.lineWidth;
  }
};

// 更换绘制方式（如笔刷，文字）
const methodChange = (val: any) => {
  drawMethod.value = val;
  textInputShow.value = false;
};

const textEntry = (val: any) => {
  let TextInfo: TextPath = {
    fontWidth: "20px",
    fontFamily: "serif",
    fontColor: ctxInfo.strokeStyle,
    text: val,
    x: pointerInfo.x,
    y: pointerInfo.y + 20,
  };
  let drawInfo: DrawInfo = {
    type: 'text',
    data: TextInfo
  }
  draw(drawInfo, ctx);
  pathArr.push(drawInfo);
  textInputShow.value = false;
};

onMounted(() => {
  canvas = document.querySelector("#drawCanvas");
  if (!canvas) return;
  let dpr = window.devicePixelRatio || 1;
  canvas.width = document.body.clientWidth * dpr;
  canvas.height = (document.body.clientHeight - 20) * dpr;
  canvas.style.width = document.body.clientWidth + "px";
  canvas.style.height = document.body.clientHeight - 20 + "px";

  ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);
  mouseButtonDown = false;
  if (window.PointerEvent) {
    canvas.addEventListener("pointerdown", handleMouseDown, false);
    canvas.addEventListener("pointermove", handleMouseMove, false);
    canvas.addEventListener("pointerup", handleMouseUp, false);
  } else {
    canvas.addEventListener("mousedown", handleMouseDown, false);
    canvas.addEventListener("mousemove", handleMouseMove, false);
    canvas.addEventListener("mouseup", handleMouseUp, false);
  }
});
</script>

<style scoped>
.canvas {
  width: 100vw;
  height: 100vh;
}
</style>
