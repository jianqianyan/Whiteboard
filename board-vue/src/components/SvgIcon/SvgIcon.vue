<template>
    <svg class="icon-svg" aria-hidden="true">
        <use :xlink:href="IconName">
            <title></title>
        </use>
    </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";
const props = defineProps(["iconClass"]);
let IconName = computed(() => {
    return `#icon-${props.iconClass}`
})
</script>

<style scoped>
.icon-svg{
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>