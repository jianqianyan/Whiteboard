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
import { draw, drawInput, drawArr, DrawInfo, BrushPath, TextPath, ImagePath, RectPath, RoundPath } from "./ExCanvas/Brush";
import { checkClick } from '../tools/checkClick'

let mouseButtonDown = false;
let canvas: any;
let ctx: any;
let textInputShow = reactive({ value: false });
let drawMethod = reactive({ value: 0 });
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

// 保存当前这次的手绘路径 以及范围
let lineArr: Array<BrushPath> = [];
let lineMinX: any = null,
  lineMinY: any = null,
  lineMaxX: any = null,
  lineMaxY: any = null;

// 用于保存历史路径
// 保存绘制路径
let pathArr: Array<DrawInfo> = [];

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
      data: ImageInfo,
      x: pointerInfo.x,
      y: pointerInfo.y,
      width: 100,
      height: 100,
    }
    pathArr.push(drawInfo);
    draw(drawInfo, ctx);
  } else if (drawMethod.value === 4) {
    mouseButtonDown = true;
    pointerInfo = {
      x: event.pageX,
      y: event.pageY
    }
    let drawInfo: DrawInfo = {
      type: 'null',
      data: null,
    }
    pathArr.push(drawInfo);
  } else if (drawMethod.value === 5) {
    mouseButtonDown = true;
    pointerInfo = {
      x: event.pageX,
      y: event.pageY
    }
    let drawInfo: DrawInfo = {
      type: 'null',
      data: null,
    }
    pathArr.push(drawInfo);
  } else if (drawMethod.value === 0) {
    let beClick = checkClick(pathArr, event.pageX, event.pageY);
    for (let i = 0; i < pathArr.length; ++i)
      pathArr[i].checked = false;
    if (beClick !== -1)
      pathArr[beClick].checked = true;
    drawArr(pathArr, ctx, canvas);
  }
}

function handleMouseMove(event: any) {
  if (mouseButtonDown) {
    if (drawMethod.value === 1) {
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
      lineMaxX = lineMaxX === null ? event.pageX : Math.max(event.pageX as number, lineMaxX as number);
      lineMaxY = lineMaxY === null ? event.pageY : Math.max(event.pageY as number, lineMaxY as number);
      lineMinX = lineMinX === null ? event.pageX : Math.min(event.pageX as number, lineMinX as number);
      lineMinY = lineMinY === null ? event.pageX : Math.min(event.pageY as number, lineMinY as number);
      draw(drawInfo, ctx);
      // 记录历史信息
      lineArr.push(pathInfo);
    } else if (drawMethod.value === 4) {
      let RectInfo: RectPath = {
        x: pointerInfo.x,
        y: pointerInfo.y,
        width: event.pageX - pointerInfo.x,
        height: event.pageY - pointerInfo.y,
      }
      let drawInfo: DrawInfo = {
        type: 'rect',
        data: RectInfo,
        x: pointerInfo.x,
        y: pointerInfo.y,
        width: event.pageX - pointerInfo.x,
        height: event.pageY - pointerInfo.y,
      }
      pathArr.pop();
      pathArr.push(drawInfo);
      drawArr(pathArr, ctx, canvas);
    } else if (drawMethod.value === 5) {
      let RoundInfo: RoundPath = {
        x: (parseFloat(pointerInfo.x) + parseFloat(event.x)) / 2,
        y: (parseFloat(pointerInfo.y) + parseFloat(event.y)) / 2,
        radus: Math.min(Math.abs(parseFloat(pointerInfo.x) - parseFloat(event.x)) / 2, Math.abs(parseFloat(pointerInfo.y) - parseFloat(event.y)) / 2),
      }
      let drawInfo: DrawInfo = {
        type: 'round',
        data: RoundInfo,
        x: RoundInfo.x - RoundInfo.radus,
        y: RoundInfo.y - RoundInfo.radus,
        height: 2 * RoundInfo.radus,
        width: 2 * RoundInfo.radus
      }
      pathArr.pop();
      pathArr.push(drawInfo);
      drawArr(pathArr, ctx, canvas);
    }
  }
}

function handleMouseUp() {
  if (mouseButtonDown) {
    mouseButtonDown = false;
    if (drawMethod.value === 1) {
      let drawInfo: DrawInfo = {
        type: 'brush',
        data: lineArr,
        x: lineMinX,
        y: lineMinY,
        width: lineMaxX - lineMinX,
        height: lineMaxY - lineMinY
      }
      pathArr.push(drawInfo);
      pathInfo = {
        lastX: null,
        lastY: null,
        beginY: null,
        beginX: null,
      };
      lineMinX = null;
      lineMinY = null;
      lineMaxX = null;
      lineMaxY = null;
      lineArr = [];
    }
    // 将点击插入的空信息删除
    while (pathArr.length && pathArr[pathArr.length - 1].type === 'null') {
      pathArr.pop();
    }
  }
}

// 触发操作按钮
const operationClick = (val: any) => {
  // 撤销功能
  if (val === "revoke") {
    if (pathArr.length === 0) return;
    pathArr.pop();
    drawArr(pathArr, ctx, canvas);
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
    data: TextInfo,
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
