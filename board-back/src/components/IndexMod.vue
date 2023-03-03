<template>
  <div class="index-mod">模块</div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.index-mod {
  width: 100%;
  border-style: solid;
  border-width: 2px;
  border-color: #edf1f7;
  height: 25vh;
  transition: all 0.5s;
  background-color: white;
}
.index-mod:hover {
  border-color: rgb(44 51 73 / 10%);
  transform: translateY(-5px);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 10%);
}
</style>
