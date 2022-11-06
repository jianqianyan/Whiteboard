<template>
    <div class="config-box">
        <el-popover :width="280" placement="right" trigger="click">
            <template #reference>
                <div class="icon-bi">
                    <svg-icon iconName="icon-bi"></svg-icon>
                </div>
            </template>
            <template #default>
                <div class="color-pick">
                    <div v-for="(item, index) in colorList" :key="index + 'color'">
                        <ColorChunk :color="item" @click="colorChange(item)"></ColorChunk>
                    </div>
                </div>
            </template>
        </el-popover>
    </div>
</template>

<script setup lang="ts">
import ColorChunk from './ConfigBox/ColorChunk.vue'
const emits = defineEmits(['colorChange']);
let colorList = [
    'FF6900',
    'FCB900',
    '7BDCB5',
    '00D084',
    '8ED1FC',
    '0693E3',
    'ABB8C3',
    'EB144C',
    'F78DA7',
    '9900EF'
]
function colorChange(color: any){
    emits('colorChange', '#' + color)
}
</script>

<style scoped lang="less">
.config-box {
    position: absolute;
    top: 40px;
    left: 50px;
    z-index: 15;

    .icon-bi {
        border: 1px solid #409eff;
        border-radius: 50%;
        background: #fff;
        width: 2em;
        height: 2em;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.color-pick {
    display: flex;
    flex-wrap: wrap;
}
</style>