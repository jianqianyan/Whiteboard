<template>
    <div class="color-chunk" ref="colorChunk">
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
const props = defineProps(["color"]);
let colorChunk: any = ref(null);
onMounted(() => {
    if (colorChunk.value) {
        colorChunk.value.setAttribute('style', 'background:' + '#' + props.color)
    }
})
</script>

<style scoped lang="less">
.color-chunk{
    width: 30px;
    height: 30px;
    border-radius: 4px;
    margin: 0 6px 6px 0;
    cursor: pointer;
    overflow: hidden;
}
</style>