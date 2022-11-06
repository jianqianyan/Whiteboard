<template>
    <div class="operation-box">
        <div class="revoke-box" @click="operationClick('revoke')">
            <svg-icon iconName="icon-chexiao" />
        </div>
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['operationEmits']);
function operationClick(val: any) {
    emits('operationEmits', val)
}
</script>
<style scoped lang="less">
.operation-box {
    position: absolute;
    bottom: 50px;
    left: 50px;
    z-index: 15;
    .revoke-box{
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
</style>