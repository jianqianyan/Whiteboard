<template>
    <div class="operation-box">
        <div class="revoke-box button-style" @click="operationClick('revoke')">
            <svg-icon iconName="icon-chexiao" />
        </div>
        <div class="user-box button-style" @click="operationClick('user')">
            <svg-icon iconName="icon-yonghu"></svg-icon>
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
    bottom: 20px;
    left: 40px;
    z-index: 15;
}
.user-box{
    margin-top: 10px;
}
</style>