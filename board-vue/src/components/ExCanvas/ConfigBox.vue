<template>
    <div class="config-box">
        <el-popover :width="280" placement="right" trigger="click">
            <template #reference>
                <div class="icon-bi button-style" @click="methodChange(1)">
                    <svg-icon iconName="icon-bi"></svg-icon>
                </div>
            </template>
            <template #default>
                <div class="color-pick">
                    <div v-for="(item, index) in colorList" :key="index + 'color'">
                        <ColorChunk :color="item" @click="colorChange(item, index)" class="color-chunk" :name="item">
                        </ColorChunk>
                    </div>
                </div>
                <div class="width-pick">
                    <input type="range" :value="panWidth.value" min="0" max="10" @change="widthChange" />
                    <div class="width-box">{{ panWidth.value }}</div>
                </div>
            </template>
        </el-popover>
        <div class="text-box button-style" @click="methodChange(2)">
            <svg-icon iconName="icon-wenzi"></svg-icon>    
        </div>
        <div class="image-box button-style" @click="methodChange(3)">
            <svg-icon iconName="icon-tupian"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorChunk from "./ConfigBox/ColorChunk.vue";
import { toRef, ref,reactive } from "vue";
const props = defineProps(["config"]);
const emits = defineEmits(["brushChange", "methodChange"]);
let config: any = toRef(props, "config");
let panWidth = reactive({ value: config.value.panWidth || 3 });
let colorList = config.value.colorList || [
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
];

function colorChange(color: any, index: any) {
    emits("brushChange", { strokeStyle: "#" + color});
    let chunks = document.querySelectorAll(".color-chunk");
    for (let i = 0; i < chunks.length; ++i) {
        let style: any = chunks[i].getAttribute("style");
        let shadow = "box-shadow";
        if (style.indexOf(shadow) !== -1) {
            let styleArr = style.split(";");
            styleArr = styleArr.filter((item: any) => item.indexOf(shadow) === -1);
            style = styleArr.join(";");
        }
        if (i === index) {
            style = style + ";" + shadow + ": #" + color + " 0px 0px 4px";
        }
        chunks[i].setAttribute("style", style);
    }
}

const widthChange = (val: any) => {
    panWidth.value = val.target.value;
    emits("brushChange", { lineWidth: panWidth.value});
};

const methodChange = (val: any) => {
    emits("methodChange", val);
};
</script>

<style scoped lang="less">
@import "./currencyStyle.less";

.config-box {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 15;

    .text-box {
        margin-top: 10px;
    }
    .image-box{
        margin-top: 10px;
    }
}

.color-pick {
    display: flex;
    flex-wrap: wrap;
}

.width-pick {
    width: 100%;
    display: flex;
    align-items: center;

    input {
        width: 80%;
    }

    .width-box {
        width: 20%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
