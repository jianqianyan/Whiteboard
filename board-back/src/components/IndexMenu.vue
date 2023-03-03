<template>
  <div class="menu">
    <div
      :class="['menu-son', activeItem === item && 'active']"
      v-for="(item, index) in menu"
      :key="index"
      @click="linkto(item)"
    >
      {{ item.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import router from "@/router";
const routerRef = ref(router);
class routerClass {
  name: string;
  link: string;
  constructor(name: string, link: string) {
    this.name = name;
    this.link = link;
  }
}
const menuList = [
  {
    name: "首页",
    link: "/index/homePage",
  },
  {
    name: "用户",
    link: "/index/userPage",
  },
  {
    name: "白板",
    link: "/index/boardPage",
  },
  {
    name: "报错",
    link: "/index/errorPage",
  },
];
let menu = reactive<routerClass[]>([]);
let activeItem = ref<routerClass>();
for (let menuItem of menuList) {
  menu.push(new routerClass(menuItem.name, menuItem.link));
}
const linkto = (item: routerClass) => {
  activeItem.value = item;
  routerRef.value.push(item.link);
};
onMounted(() => {
  activeItem.value = menu[0];
});
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
  transform: all 0.2s;
  cursor: pointer;
}
.active {
  background: rgb(44 51 73 / 10%);
  animation-name: behover;
  animation-duration: 1s;
}
.menu-son:hover {
  animation-name: behover;
  animation-duration: 1s;
  background: rgb(44 51 73 / 10%);
}

@keyframes behover {
  from {
    background-color: #fff;
  }
  to {
    background-color: rgb(44 51 73 / 10%);
  }
}
</style>
