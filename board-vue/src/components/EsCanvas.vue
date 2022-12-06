<template>
  <canvas className="canvas" id="drawCanvas"></canvas>
  <OperationBox @operationEmits="operationClick"></OperationBox>
  <configBox @brushChange="brushChange" @methodChange="methodChange" :config="colorConfig"></configBox>
  <textInput @textEntry="textEntry" v-show="textInputShow.value"></textInput>
  <ImgUp :imgupVisble="imgupVisble" @imgUpload="imgUpload"></ImgUp>
</template>

<script setup lang="ts">
import OperationBox from "./ExCanvas/OperationBox.vue";
import configBox from "./ExCanvas/ConfigBox.vue";
import textInput from "./ExCanvas/textInput.vue";
import ImgUp from "./ExCanvas/ImgUp.vue";
import { onMounted, reactive, ref, nextTick, computed } from "vue";
import { ctxFormat } from "./ExCanvas/EsCanvas";
import { draw, drawArr, DrawInfo, BrushPath, TextPath, ImagePath, RectPath, RoundPath, moveDraw } from "./ExCanvas/Brush";
import { checkClick } from '../tools/checkClick'
import { brushAdd } from "./onlineFunctions";

let mouseButtonDown = false;
let canvas: any;
let ctx: any;
let textInputShow = reactive({ value: false });
let drawMethod = reactive({ value: 0 });
let beclicked = -1;
let userId = "1";
let boardId = "1";
let baseBrushId = "U" + userId + "B" + boardId + "T";
let imgupVisble = computed(() => {
  return drawMethod.value === 3;
})

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
  mouseButtonDown = true;
  switch (drawMethod.value) {
    case 1: {
      lineArr = [];
      break;
    }
    case 2: {
      if (textInputShow.value) {
        textInputShow.value = false;
        return;
      }
      pointerInfo = {
        x: event.pageX,
        y: event.pageY - 20,
      };
      textInputShow.value = true;
      nextTick(() => {
        let input = document.querySelector(".text-input");
        let inputbody = document.getElementById('input-body');
        let path = "left: " + pointerInfo.x + "px;" + "top: " + pointerInfo.y + "px;";
        (input as Element).setAttribute("style", path);
        setTimeout(() => {
          inputbody?.focus();
        }, 100)
      });
      break;
    }
    case 3: {
      break;
    }
    case 4:
    case 5: {
      pointerInfo = {
        x: event.pageX,
        y: event.pageY
      }
      let nowDate = new Date();
      let nowTime = nowDate.getTime();
      let drawInfo: DrawInfo = {
        type: 'null',
        data: null,
        brushId: baseBrushId + nowTime,
        userId: userId,
        boardId: boardId,
      }
      pathArr.push(drawInfo);
      break;
    }
    case 0: {
      beclicked = checkClick(pathArr, event.pageX, event.pageY);
      pointerInfo.x = event.pageX;
      pointerInfo.y = event.pageY;
      for (let i = 0; i < pathArr.length; ++i) {
        if (pathArr[i].checked) {
          pathArr[i].checked = false;
          drawArr(pathArr, ctx, canvas);
        }
      }
      if (beclicked !== -1) {
        pathArr[beclicked].checked = true;
        drawArr(pathArr, ctx, canvas);
      }
      break;
    }
  }
}

function handleMouseMove(event: any) {
  if (!mouseButtonDown) return;
  switch (drawMethod.value) {
    case 1: {
      pathInfo = {
        beginX: pathInfo.lastX,
        beginY: pathInfo.lastY,
        lastX: event.pageX,
        lastY: event.pageY,
        strokeStyle: ctxInfo.strokeStyle,
        lineWidth: ctxInfo.lineWidth,
      };
      let nowDate = new Date();
      let nowTime = nowDate.getTime();
      let drawInfo: DrawInfo = {
        type: 'brush',
        data: pathInfo,
        brushId: baseBrushId + nowTime,
        userId: userId,
        boardId: boardId,
      }
      lineMaxX = lineMaxX === null ? event.pageX : Math.max(event.pageX as number, lineMaxX as number);
      lineMaxY = lineMaxY === null ? event.pageY : Math.max(event.pageY as number, lineMaxY as number);
      lineMinX = lineMinX === null ? event.pageX : Math.min(event.pageX as number, lineMinX as number);
      lineMinY = lineMinY === null ? event.pageX : Math.min(event.pageY as number, lineMinY as number);
      draw(drawInfo, ctx);
      // 记录历史信息
      lineArr.push(pathInfo);
      break;
    }
    case 4: {
      let RectInfo: RectPath = {
        x: pointerInfo.x,
        y: pointerInfo.y,
        width: event.pageX - pointerInfo.x,
        height: event.pageY - pointerInfo.y,
      }
      let nowDate = new Date();
      let nowTime = nowDate.getTime();
      let drawInfo: DrawInfo = {
        type: 'rect',
        data: RectInfo,
        x: pointerInfo.x,
        y: pointerInfo.y,
        width: event.pageX - pointerInfo.x,
        height: event.pageY - pointerInfo.y,
        brushId: baseBrushId + nowTime,
        userId: userId,
        boardId: boardId,
      }
      pathArr.pop();
      pathArr.push(drawInfo);
      drawArr(pathArr, ctx, canvas);
      break;
    }
    case 5: {
      let RoundInfo: RoundPath = {
        x: (parseFloat(pointerInfo.x) + parseFloat(event.x)) / 2,
        y: (parseFloat(pointerInfo.y) + parseFloat(event.y)) / 2,
        radus: Math.min(Math.abs(parseFloat(pointerInfo.x) - parseFloat(event.x)) / 2, Math.abs(parseFloat(pointerInfo.y) - parseFloat(event.y)) / 2),
      }
      let nowDate = new Date();
      let nowTime = nowDate.getTime();
      let drawInfo: DrawInfo = {
        type: 'round',
        data: RoundInfo,
        x: RoundInfo.x - RoundInfo.radus,
        y: RoundInfo.y - RoundInfo.radus,
        height: 2 * RoundInfo.radus,
        width: 2 * RoundInfo.radus,
        brushId: baseBrushId + nowTime,
        userId: userId,
        boardId: boardId,
      }
      pathArr.pop();
      pathArr.push(drawInfo);
      drawArr(pathArr, ctx, canvas);
      break
    }
    case 0: {
      if (beclicked === -1) return;
      let moveX = event.pageX - pointerInfo.x;
      let moveY = event.pageY - pointerInfo.y;
      pointerInfo.x = event.pageX;
      pointerInfo.y = event.pageY;
      for (let i = 0; i < pathArr.length; ++i) {
        if (pathArr[i].checked) {
          pathArr[i] = moveDraw(moveX, moveY, pathArr[i]);
        }
      }
      drawArr(pathArr, ctx, canvas);
    }
  }
}

function handleMouseUp() {
  if (!mouseButtonDown) return;
  mouseButtonDown = false;
  // 将点击插入的空信息删除
  while (pathArr.length && pathArr[pathArr.length - 1].type === 'null') {
    pathArr.pop();
  }
  switch (drawMethod.value) {
    case 1: {
      let nowDate = new Date();
      let nowTime = nowDate.getTime();
      let drawInfo: DrawInfo = {
        type: 'brush',
        data: lineArr,
        x: lineMinX,
        y: lineMinY,
        width: lineMaxX - lineMinX,
        height: lineMaxY - lineMinY,
        brushId: baseBrushId + nowTime,
        userId: userId,
        boardId: boardId,
      }
      pathArr.push(drawInfo);
      brushAdd(drawInfo);

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
      break;
    }
    case 4: case 5: {
      brushAdd(pathArr[pathArr.length - 1]);
    }
  }
}

// 触发操作按钮
const operationClick = (val: any) => {
  // 撤销功能
  switch (val) {
    case "revoke": {
      if (pathArr.length === 0) return;
      pathArr.pop();
      drawArr(pathArr, ctx, canvas);
      break;
    }
  }
};

// 笔刷信息更改
const brushChange = (val: any) => {
  ctxInfo.strokeStyle = val.strokeStyle ? val.strokeStyle : ctxInfo.strokeStyle;
  ctxInfo.lineWidth = val.lineWidth ? val.lineWidth : ctxInfo.lineWidth;
};

// 更换绘制方式（如笔刷，文字）
const methodChange = (val: any) => {
  drawMethod.value = val;
  textInputShow.value = false;
};

// 文字输入
const textEntry = (val: any) => {
  let TextInfo: TextPath = {
    fontWidth: "20px",
    fontFamily: "serif",
    fontColor: ctxInfo.strokeStyle,
    text: val,
    x: pointerInfo.x,
    y: pointerInfo.y + 27,
  };
  let nowDate = new Date();
  let nowTime = nowDate.getTime();
  let drawInfo: DrawInfo = {
    type: 'text',
    data: TextInfo,
    x: pointerInfo.x,
    y: pointerInfo.y + 27,
    brushId: baseBrushId + nowTime,
    userId: userId,
    boardId: boardId,
  }
  ctx.font = TextInfo.fontWidth + " " + TextInfo.fontFamily;
  draw(drawInfo, ctx);
  ctx.save();
  let textMsg = ctx.measureText(val);
  drawInfo.width = textMsg.width;
  drawInfo.height = textMsg.actualBoundingBoxAscent + textMsg.actualBoundingBoxDescent;
  drawInfo.y = (drawInfo.y as number) - (drawInfo.height as number);
  pathArr.push(drawInfo);
  textInputShow.value = false;
  ctx.stroke();
  brushAdd(drawInfo);
};

// 图片上传结束
const imgUpload = (val: any) => {
  let ImageInfo: ImagePath = {
    x: 200,
    y: 200,
    src: val.src.value,
    width: 100,
    height: 100
  };
  let nowDate = new Date();
  let nowTime = nowDate.getTime();
  let drawInfo: DrawInfo = {
    type: 'image',
    data: ImageInfo,
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    brushId: baseBrushId + nowTime,
    userId: userId,
    boardId: boardId,
  }
  pathArr.push(drawInfo);
  draw(drawInfo, ctx);
  brushAdd(drawInfo);
}

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
