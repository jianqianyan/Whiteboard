<template>
  <canvas className="canvas" id="drawCanvas"></canvas>
  <canvas
    className="paintingCanvas"
    id="paintingCanvas"
    v-if="isPainting"
  ></canvas>
  <OperationBox @operationEmits="operationClick"></OperationBox>
  <configBox
    @brushChange="brushChange"
    @methodChange="methodChange"
    :config="colorConfig"
    v-if="!onlyWatch"
  ></configBox>
  <textInput @textEntry="textEntry" v-show="textInputShow.value"></textInput>
  <ImgUp :imgupVisble="imgupVisble" @imgUpload="imgUpload"></ImgUp>
  <Login
    :loginVisible="loginVisible"
    @userChange="userChange"
    :userId="userId"
  ></Login>
</template>

<script setup lang="ts">
import OperationBox from "./ExCanvas/OperationBox.vue";
import configBox from "./ExCanvas/ConfigBox.vue";
import textInput from "./ExCanvas/textInput.vue";
import ImgUp from "./ExCanvas/ImgUp.vue";
import { onMounted, reactive, ref, nextTick, computed } from "vue";
import { canvasInit, ctxFormat } from "./ExCanvas/EsCanvas";
import {
  draw,
  drawArr,
  DrawInfo,
  BrushPath,
  TextPath,
  ImagePath,
  RectPath,
  RoundPath,
  moveDraw,
  drawBeClick,
  drawPainting,
} from "./ExCanvas/Brush";
import { checkClick } from "../tools/checkClick";
import { brushAdd, brushUpdate } from "./onlineFunctions";
import { timesTamp } from "../tools/generalTools";
import API from "../plugin/axios/axiosInstance";
import Login from "../components/Login/index.vue";

let mouseButtonDown = false;
let canvas: any;
let paintingCanvas: any;
let ctx: any;
let paintingCtx: any;
let textInputShow = reactive({ value: false });
let drawMethod = reactive({ value: 0 });
let beclicked = -1;
let userId = ref("-1");
let bemoved: boolean = false;
let boardId = "1";
let isPainting = ref(false);
let onlyWatch = ref(false);
const baseBrushId = () => {
  return "U" + userId.value + "B" + boardId + "T";
};
let imgupVisble = computed(() => {
  return drawMethod.value === 3;
});
let loginVisible = ref(false);

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
let paintingPath: DrawInfo;

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
        let inputbody = document.getElementById("input-body");
        let path =
          "left: " + pointerInfo.x + "px;" + "top: " + pointerInfo.y + "px;";
        (input as Element).setAttribute("style", path);
        setTimeout(() => {
          inputbody?.focus();
        }, 100);
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
        y: event.pageY,
      };
      let drawInfo: DrawInfo = {
        type: "null",
        data: null,
        brushId: timesTamp(baseBrushId()),
        userId: userId.value,
        boardId: boardId,
      };
      pathArr.push(drawInfo);
      isPainting.value = true;
      nextTick(() => {
        let newCanvas: any = canvasInit("#paintingCanvas");
        paintingCanvas = newCanvas.canvas;
        paintingCtx = newCanvas.ctx;
      });
      break;
    }
    case 0: {
      let lastClick = beclicked;
      isPainting.value = false;
      beclicked = checkClick(pathArr, event.pageX, event.pageY);
      pointerInfo.x = event.pageX;
      pointerInfo.y = event.pageY;
      for (let i = 0; i < pathArr.length; ++i) {
        pathArr[i].checked = false;
      }
      if (beclicked !== -1) {
        pathArr[beclicked].checked = true;
        paintingPath = pathArr[beclicked];
        isPainting.value = true;
        nextTick(() => {
          let newCanvas: any = canvasInit("#paintingCanvas");
          paintingCanvas = newCanvas.canvas;
          paintingCtx = newCanvas.ctx;
          drawBeClick(paintingPath, paintingCtx, paintingCanvas);
        });
      } else {
        if (lastClick === -1) return;
      }
      drawArr(pathArr, ctx, canvas);
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
      let drawInfo: DrawInfo = {
        type: "brush",
        data: pathInfo,
        brushId: timesTamp(baseBrushId()),
        userId: userId.value,
        boardId: boardId,
      };
      lineMaxX =
        lineMaxX === null
          ? event.pageX
          : Math.max(event.pageX as number, lineMaxX as number);
      lineMaxY =
        lineMaxY === null
          ? event.pageY
          : Math.max(event.pageY as number, lineMaxY as number);
      lineMinX =
        lineMinX === null
          ? event.pageX
          : Math.min(event.pageX as number, lineMinX as number);
      lineMinY =
        lineMinY === null
          ? event.pageX
          : Math.min(event.pageY as number, lineMinY as number);
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
      };
      let drawInfo: DrawInfo = {
        type: "rect",
        data: RectInfo,
        x: pointerInfo.x,
        y: pointerInfo.y,
        width: event.pageX - pointerInfo.x,
        height: event.pageY - pointerInfo.y,
        brushId: timesTamp(baseBrushId()),
        userId: userId.value,
        boardId: boardId,
      };
      pathArr.pop();
      pathArr.push(drawInfo);
      drawPainting(pathArr[pathArr.length - 1], paintingCtx, paintingCanvas);
      break;
    }
    case 5: {
      let RoundInfo: RoundPath = {
        x: (parseFloat(pointerInfo.x) + parseFloat(event.x)) / 2,
        y: (parseFloat(pointerInfo.y) + parseFloat(event.y)) / 2,
        radus: Math.min(
          Math.abs(parseFloat(pointerInfo.x) - parseFloat(event.x)) / 2,
          Math.abs(parseFloat(pointerInfo.y) - parseFloat(event.y)) / 2
        ),
      };
      let drawInfo: DrawInfo = {
        type: "round",
        data: RoundInfo,
        x: RoundInfo.x - RoundInfo.radus,
        y: RoundInfo.y - RoundInfo.radus,
        height: 2 * RoundInfo.radus,
        width: 2 * RoundInfo.radus,
        brushId: timesTamp(baseBrushId()),
        userId: userId.value,
        boardId: boardId,
      };
      pathArr.pop();
      pathArr.push(drawInfo);
      drawPainting(pathArr[pathArr.length - 1], paintingCtx, paintingCanvas);
      break;
    }
    case 0: {
      if (beclicked === -1) return;
      let moveX = Number(event.pageX) - Number(pointerInfo.x);
      let moveY = Number(event.pageY) - Number(pointerInfo.y);
      pointerInfo.x = event.pageX;
      pointerInfo.y = event.pageY;
      for (let i = 0; i < pathArr.length; ++i) {
        if (pathArr[i].checked) {
          pathArr[i] = moveDraw(moveX, moveY, pathArr[i]);
          drawBeClick(pathArr[i], paintingCtx, paintingCanvas);
          bemoved = true;
          break;
        }
      }
    }
  }
}

function handleMouseUp() {
  if (!mouseButtonDown) return;
  mouseButtonDown = false;
  switch (drawMethod.value) {
    case 1: {
      let drawInfo: DrawInfo = {
        type: "brush",
        data: lineArr,
        x: lineMinX,
        y: lineMinY,
        width: lineMaxX - lineMinX,
        height: lineMaxY - lineMinY,
        brushId: timesTamp(baseBrushId()),
        userId: userId.value,
        boardId: boardId,
      };
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
    case 4:
    case 5: {
      if (pathArr.length === 0 || pathArr[pathArr.length - 1].type === "null") {
        // 将点击插入的空信息删除
        while (pathArr.length && pathArr[pathArr.length - 1].type === "null") {
          pathArr.pop();
        }
        return;
      }
      brushAdd(pathArr[pathArr.length - 1]);
      drawArr(pathArr, ctx, canvas);
    }
    case 0: {
      if (!bemoved) return;
      bemoved = false;
      if (beclicked !== -1) {
        let newBrushId = timesTamp(baseBrushId());
        brushUpdate(pathArr[beclicked], newBrushId);
      }
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
    case "user": {
      loginVisible.value = true;
    }
  }
};

// 用户信息改变
const userChange = (val: any) => {
  loginVisible.value = false;
  if (typeof val !== "function") {
    userId.value = val;
    let apiParams = {
      userId: userId.value,
    };
    API({
      url: "/board/boardIdGet",
      method: "get",
      params: apiParams,
    }).then((res) => {
      if (res.data.status === 200) {
        boardId = res.data.data.boardId;
        pathArr.forEach((item) => {
          item.boardId = boardId;
          item.userId = userId.value;
          brushAdd(item);
        });
        onlyWatch.value = false;
        drawMethod.value = 0;
      }
    });
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
  let drawInfo: DrawInfo = {
    type: "text",
    data: TextInfo,
    x: pointerInfo.x,
    y: pointerInfo.y + 27,
    brushId: timesTamp(baseBrushId()),
    userId: userId.value,
    boardId: boardId,
  };
  ctx.font = TextInfo.fontWidth + " " + TextInfo.fontFamily;
  draw(drawInfo, ctx);
  ctx.save();
  let textMsg = ctx.measureText(val);
  drawInfo.width = textMsg.width;
  drawInfo.height =
    textMsg.actualBoundingBoxAscent + textMsg.actualBoundingBoxDescent;
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
    height: 100,
  };
  let drawInfo: DrawInfo = {
    type: "image",
    data: ImageInfo,
    x: 200,
    y: 200,
    width: 100,
    height: 100,
    brushId: timesTamp(baseBrushId()),
    userId: userId.value,
    boardId: boardId,
  };
  pathArr.push(drawInfo);
  draw(drawInfo, ctx);
  brushAdd(drawInfo);
};

onMounted(async () => {
  let newCanvas: any = canvasInit("#drawCanvas");
  let body: any = document.querySelector("body");
  canvas = newCanvas.canvas;
  ctx = newCanvas.ctx;
  if (!canvas) return;
  mouseButtonDown = false;
  if (window.PointerEvent) {
    body.addEventListener("pointerdown", handleMouseDown, false);
    body.addEventListener("pointermove", handleMouseMove, false);
    body.addEventListener("pointerup", handleMouseUp, false);
  } else {
    body.addEventListener("mousedown", handleMouseDown, false);
    body.addEventListener("mousemove", handleMouseMove, false);
    body.addEventListener("mouseup", handleMouseUp, false);
  }
  let LocalUserId = localStorage.getItem("userId");
  let href = window.location.href;
  // 校验token是否过期
  if (LocalUserId) {
    await API({
      url: "/user/getUser",
      method: "get",
      params: { userId: LocalUserId },
    }).then((res) => {
      if (res.data.status === 200) {
        userId.value = LocalUserId as string;
      }
    });
  }
  if (href.indexOf("boardId") !== -1) {
    let url = new URL(href);
    boardId = url.searchParams.get("boardId") as string;
    let apiParams = {
      boardId: boardId,
    };
    API({
      url: "/board/boardInit",
      method: "get",
      params: apiParams,
    }).then((res) => {
      if (res.data.status === 200) {
        res.data.data.map((item: any) => {
          item.data = JSON.parse(item.data);
          pathArr.push(item as DrawInfo);
        });
        drawArr(pathArr, ctx, canvas);
      }
    });
    if (!LocalUserId) {
      onlyWatch.value = true;
      drawMethod.value = -1;
    }
  } else {
    if (LocalUserId) {
      let apiParams = {
        userId: LocalUserId,
      };
      API({
        url: "/board/boardIdGet",
        method: "get",
        params: apiParams,
      }).then((res) => {
        if (res.data.status === 200) {
          userId.value = LocalUserId as string;
          boardId = res.data.data.boardId;
        }
      });
    }
  }
});
</script>

<style scoped>
.canvas {
  top: 0;
  left: 0;
  position: absolute;
}

.paintingCanvas {
  z-index: 15;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
