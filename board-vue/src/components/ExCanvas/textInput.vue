<template>
  <div class="text-input">
    <input type="textarea" :value="value" @change="inputChange" id="input-body"/>
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
    height: 40px;
    outline: none;
    font-size: 20px;
    font-family: serif;
    padding: 0;
    margin: 0;
    border: none;
    background: rgba(0, 0, 0, 0%);
  }
}
</style>
