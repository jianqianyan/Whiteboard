<template>
  <div class="qr-code-box">
    <el-dialog v-model="bodyVisible" width="300" :close-on-click-modal="true" :close-on-press-escape="true"
      :show-close="false" align-center :before-close="beforeClose">
      <div class="canvas-box"><canvas ref="qrCodeCanvas"></canvas></div>
      <div class="url-box"><span>{{ url }}</span></div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import QRCode from "qrcode"
import { defineProps, ref, toRef, watch, watchEffect } from 'vue';
const props = defineProps(["url", "urlVisible"]);
const dialogVisible = toRef(props, "urlVisible");
const emits = defineEmits(["qrClosed"]);
const qrCodeCanvas = ref();
let url = toRef(props, 'url');
let bodyVisible = ref(false);
watch(dialogVisible, async (value) => {
  bodyVisible.value = value;
  if (qrCodeCanvas.value) {
    await QRCode.toCanvas(qrCodeCanvas.value, url.value)
  }
})
function beforeClose() {
  bodyVisible.value = false;
  emits("qrClosed");
}
watchEffect(async () => {
  if (bodyVisible.value && qrCodeCanvas.value) {
    await QRCode.toCanvas(qrCodeCanvas.value, url.value);
  }
});

</script>

<style scoped>
.canvas-box{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>