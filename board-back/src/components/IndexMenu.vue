<template>
  <div class="menu">
    <div class="menu-son" v-for="(item, index) in menuList" :key="index">
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
const menuList = [
  {
    name: "首页",
    link: "index",
  },
  {
    name: "用户",
    link: "user",
  },
  {
    name: "白板",
    link: "board",
  },
];
</script>

<style scoped lang="less">
.menu {
  max-width: 220px;
  // background: red;
  height: 100%;
  border-right-width: 1px;
  border-right-style: solid;
}

.menu-son {
  height: 45px;
  width: 100%;
  // border-style: solid;
  // border-width: 1px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
