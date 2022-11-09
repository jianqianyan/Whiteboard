<template>
  <div class="text-input">
    <input type="text" :value="value" @change="inputChange"/>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const emits = defineEmits(['textEntry']);
let value = ref("");

const inputChange = (val: any) => {
  value = val.target.value;
  emits('textEntry', val.target.value)
};


</script>

<style scoped lang="less">
.text-input {
  position: absolute;
  left: 200px;
  top: 100px;
  input {
    width: 100px;
    height: 20px;
    outline: none;
  }
}
</style>
