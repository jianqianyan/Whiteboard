<template>
  <div class="data-menu">
    <div
      class="menu-son"
      v-for="(item, index) in menuList"
      :key="index + 'menu'"
    >
      <div class="icon-box">
        <svg-icon :iconName="item.icon"></svg-icon>
      </div>
      <div class="text-box">
        <p>{{ item.title }}</p>
        <p>{{ item.number }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const menuList = [
  {
    title: "总用户人数",
    icon: "icon-zhiborenshu",
    number: 10080,
  },
  {
    title: "总白板数量",
    icon: "icon-baiban",
    number: 10011,
  },
  {
    title: "今日新增用户",
    icon: "icon-renshu",
    number: 56,
  },
  {
    title: "今日新增白板数量",
    icon: "icon-baiban",
    number: 120,
  },
  {
    title: "新增报错",
    icon: "icon-icon-cross-solid",
    number: 1,
  },
];
</script>
<style scoped lang="less">
.data-menu {
  width: 100%;
  height: 100px;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  display: flex;
  justify-content: space-around;
  .menu-son {
    width: 100%;
    display: flex;
    height: 100px;
    align-items: center;
    margin-left: 10px;
    .icon-box {
      width: 70px;
      display: flex;
      justify-content: center;
    }
    .text-box {
      width: 150px;
    }
  }
}
</style>
