<template>
    <canvas className='canvas' id="drawCanvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
let mouseButtonDown = false;
let ctx: any;
let pathInfo: any = {
    lastX: null,
    lastY:  null,
    beginY: null,
    beginX: null,
    strokeStyle: 'black',
    lineWidth: 3
}
function draw(pathInfo: any, useCtx: any) {
    if (pathInfo.beginX !== null && pathInfo.beginY !== null && useCtx) {
        const {lastX, lastY, beginX, beginY, strokeStyle, lineWidth} = pathInfo;
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
function handleMouseDown(event: any) {
    mouseButtonDown = true;
}
function handleMouseMove(event: any) {
    if (mouseButtonDown) {
        pathInfo = {
            beginX: pathInfo.lastX,
            beginY: pathInfo.lastY,
            lastX: event.pageX,
            lastY: event.pageY,
            strokeStyle: 'black',
            lineWidth: 3
        }
        draw(pathInfo, ctx)
    }
}
function handleMouseUp(event: any) {
    mouseButtonDown = false;
    pathInfo = {
        lastX: null,
        lastY:  null,
        beginY: null,
        beginX: null,
    }
}

onMounted(() => {
    let canvas: any = document.querySelector('#drawCanvas');
    if (!canvas) return;
    let dpr = window.devicePixelRatio || 1;
    canvas.width = (document.body.clientWidth - 20) * dpr;  
    canvas.height = (document.body.clientHeight - 20) * dpr;  
    canvas.style.width = (document.body.clientWidth - 20) + 'px';  
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