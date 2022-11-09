<template>
    <div class="operation-box">
        <div class="revoke-box button-style" @click="operationClick('revoke')">
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
@import './currencyStyle.less';
.operation-box {
    position: absolute;
    bottom: 50px;
    left: 50px;
    z-index: 15;
}
</style>