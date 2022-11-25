<template>
    <div class="config-box">
        <div class="round-box button-style" @click="methodChange(0)"
            :class="{ 'button-clicked': buttonHover.value === 0 }">
            <svg-icon iconName="icon-zhizhen" :color="buttonColor(0)"></svg-icon>
        </div>
        <div class="brush-box">
            <el-popover :width="280" placement="right" trigger="click">
                <template #reference>
                    <div class="icon-bi button-style" @click="methodChange(1)"
                        :class="{ 'button-clicked': buttonHover.value === 1 }">
                        <svg-icon iconName="icon-bi" :color="buttonColor(1)"></svg-icon>
                    </div>
                </template>
                <template #default>
                    <div class="color-pick">
                        <div v-for="(item, index) in colorList" :key="index + 'color'">
                            <ColorChunk :color="item" @click="colorChange(item, index)" class="color-chunk"
                                :name="item">
                            </ColorChunk>
                        </div>
                    </div>
                    <div class="width-pick">
                        <input type="range" :value="panWidth.value" min="0" max="10" @change="widthChange" />
                        <div class="width-box">{{ panWidth.value }}</div>
                    </div>
                </template>
            </el-popover>
        </div>
        <div class="text-box button-style" @click="methodChange(2)"
            :class="{ 'button-clicked': buttonHover.value === 2 }">
            <svg-icon iconName="icon-wenzi" :color="buttonColor(2)"></svg-icon>
        </div>
        <div class="image-box button-style" @click="methodChange(3)"
            :class="{ 'button-clicked': buttonHover.value === 3 }">
            <svg-icon iconName="icon-tupian" :color="buttonColor(3)"></svg-icon>
        </div>
        <div class="rectangle-box button-style" @click="methodChange(4)"
            :class="{ 'button-clicked': buttonHover.value === 4 }">
            <svg-icon iconName="icon-juxing" :color="buttonColor(4)"></svg-icon>
        </div>
        <div class="round-box button-style" @click="methodChange(5)"
            :class="{ 'button-clicked': buttonHover.value === 5 }">
            <svg-icon iconName="icon-radio-on" :color="buttonColor(5)"></svg-icon>
        </div>
    </div>
</template>

<script setup lang="ts">
import ColorChunk from "./ConfigBox/ColorChunk.vue";
import { toRef, reactive } from "vue";
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
let buttonHover = reactive({ value: 0 });
let buttonColor = function (number: number) {
    let root = document.querySelector(":root");
    let buttonColor = getComputedStyle(root as Element).getPropertyValue('--button-color') || '#FFF';
    let buttonHoverColor = getComputedStyle(root as Element).getPropertyValue('--button-hover-color') || '#000000';
    return buttonHover.value === number ? buttonHoverColor : buttonColor;
}

function colorChange(color: any, index: any) {
    emits("brushChange", { strokeStyle: "#" + color });
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
    methodChange(1, true)
}

const widthChange = (val: any) => {
    panWidth.value = val.target.value;
    emits("brushChange", { lineWidth: panWidth.value });
};

const methodChange = (val: any, isChange?: boolean) => {
    if (!isChange && val === buttonHover.value) {
        buttonHover.value = 0;
    } else {
        buttonHover.value = val;
    }
    emits("methodChange", buttonHover.value);
};
</script>

<style scoped lang="less">
@import "./currencyStyle.less";

.config-box {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 15;

    .text-box,
    .brush-box,
    .image-box,
    .rectangle-box,
    .round-box {
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

.button-clicked {
    background: var(--button-hover-background);
}
</style>
