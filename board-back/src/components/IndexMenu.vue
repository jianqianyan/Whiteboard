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
  width: 220px;
  box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 10%);
  padding-top: 15px;
}

.menu-son {
  // height: 45px;
  // width: calc(100% - 10px);
  border-bottom: 1px solid #edf1f7;
  display: flex;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  line-height: 1.5rem;
  align-items: center;
  color: var(--font-color);
}
</style>
