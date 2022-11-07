<template>
    <canvas className='canvas' id="drawCanvas"></canvas>
    <OperationBox @operationEmits="operationClick"></OperationBox>
    <configBox @colorChange="colorChange" @widthChange="widthChange" :config="colorConfig"></configBox>
</template>

<script setup lang="ts">
import OperationBox from './ExCanvas/OperationBox.vue';
import configBox from './ExCanvas/ConfigBox.vue'
import { onMounted, reactive, ref } from 'vue'
import { Path, ctxFormat } from './EsCanvas'
import { CoreErrorCodes } from '@intlify/core-base';
import Color from 'element-plus/es/components/color-picker/src/utils/color';

let mouseButtonDown = false;
let canvas: any;
let ctx: any;

// 用于保存历史路径
// 保存当前这次的绘制路径
let lineArr: Array<Path> = [];
let pathArr: Array<Array<Path>> = [];

// 默认笔刷格式
let ctxInfo: ctxFormat = {
    strokeStyle: 'black',
    lineWidth: 3
}

// 绘制路径信息
let pathInfo: Path = {
    lastX: null,
    lastY: null,
    beginY: null,
    beginX: null,
    strokeStyle: ctxInfo.strokeStyle,
    lineWidth: ctxInfo.lineWidth
}

// 配置调色板信息
let colorConfig: any = ref({
    panWidth: ctxInfo.lineWidth,
    colorList: [
        'FF6900',
        'FCB900',
        '7BDCB5',
        '00D084',
        '8ED1FC',
        '0693E3',
        'ABB8C3',
        'EB144C',
        'F78DA7',
        '9900EF',
        '000000'
    ]
})

// 绘制动作
function draw(pathInfo: Path, useCtx: any) {
    if (pathInfo.beginX !== null && pathInfo.beginY !== null && useCtx) {
        const { lastX, lastY, beginX, beginY, strokeStyle, lineWidth } = pathInfo;
        useCtx.beginPath();
        useCtx.lineCap = 'round';
        useCtx.moveTo(beginX, beginY);
        useCtx.lineTo(lastX, lastY);
        useCtx.strokeStyle = strokeStyle || 'black';
        useCtx.lineWidth = lineWidth || 3;
        useCtx.stroke();
        useCtx.closePath();
    }
}
function handleMouseDown() {
    mouseButtonDown = true;
    lineArr = []
}
function handleMouseMove(event: any) {
    if (mouseButtonDown) {
        pathInfo = {
            beginX: pathInfo.lastX,
            beginY: pathInfo.lastY,
            lastX: event.pageX,
            lastY: event.pageY,
            strokeStyle: ctxInfo.strokeStyle,
            lineWidth: ctxInfo.lineWidth
        }
        draw(pathInfo, ctx)
        // 记录历史信息
        lineArr.push(pathInfo);
    }
}
function handleMouseUp() {
    mouseButtonDown = false;
    pathInfo = {
        lastX: null,
        lastY: null,
        beginY: null,
        beginX: null,
    }
    pathArr.push(lineArr)
    lineArr = []
}

// 触发操作按钮
const operationClick = (val: any) => {
    // 撤销功能
    if (val === 'revoke') {
        if (pathArr.length === 0) return;
        pathArr.pop()
        let rect = canvas!.getBoundingClientRect();
        ctx.clearRect(rect.x, rect.y, rect.width, rect.height);
        pathArr.map(path => {
            path.map(item => {
                draw(item, ctx);
            })
        })
    }
}

const colorChange = (val: any) => {
    if (val) {
        ctxInfo.strokeStyle = val;
    }
}

const widthChange = (val: any) => {
    if (val) {
        ctxInfo.lineWidth = val;
        colorConfig.value.panWidth = val;
    }
}

onMounted(() => {
    canvas = document.querySelector('#drawCanvas');
    if (!canvas) return;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = (document.body.clientWidth) * dpr;
    canvas.height = (document.body.clientHeight - 20) * dpr;
    canvas.style.width = (document.body.clientWidth) + 'px';
    canvas.style.height = (document.body.clientHeight - 20) + 'px'

    ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    mouseButtonDown = false;
    if (window.PointerEvent) {
        canvas.addEventListener('pointerdown', handleMouseDown, false);
        canvas.addEventListener('pointermove', handleMouseMove, false);
        canvas.addEventListener('pointerup', handleMouseUp, false);
    } else {
        canvas.addEventListener('mousedown', handleMouseDown, false);
        canvas.addEventListener('mousemove', handleMouseMove, false);
        canvas.addEventListener('mouseup', handleMouseUp, false);
    }
})
</script>

<style scoped>
.canvas {
    width: 100vw;
    height: 100vh;
}
</style>