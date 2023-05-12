<template>
  <div class="menu">
    <div
      :class="['menu-son', activeItem === item && 'active']"
      v-for="(item, index) in menu"
      :key="index"
      @click="linkto(item)"
    >
      <svg-icon
        :iconName="item.icon"
        :color="activeItem == item ? '#fff' : '#000'"
      ></svg-icon
      >&nbsp;
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
  icon: string;
  constructor(name: string, link: string, icon: string) {
    this.name = name;
    this.link = link;
    this.icon = icon;
  }
}
const menuList = [
  {
    name: "首页",
    link: "/index/homePage",
    icon: "icon-shouye",
  },
  {
    name: "用户",
    link: "/index/userPage",
    icon: "icon-renshu",
  },
  {
    name: "白板",
    link: "/index/boardPage",
    icon: "icon-baiban",
  },
  {
    name: "报错",
    link: "/index/errorPage",
    icon: "icon-icon-cross-solid",
  },
  {
    name: "权限管理",
    link: "/index/power",
    icon: "icon-quanxianyuechi",
  },
  {
    name: "系统设置",
    link: "/index/system",
    icon: "icon-wangluoxitong",
  },
  {
    name: "数据备份与恢复",
    link: "/index/dataBackup",
    icon: "icon-shujuku",
  },
  {
    name: "操作日志",
    link: "/index/operation",
    icon: "icon-rizhi",
  },
  {
    name: "帮助与支持",
    link: "/index/help",
    icon: "icon-bangzhu",
  },
];
let menu = reactive<routerClass[]>([]);
let activeItem = ref<routerClass>();
for (let menuItem of menuList) {
  menu.push(new routerClass(menuItem.name, menuItem.link, menuItem.icon));
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
  :deep(.svg-icon) {
    width: 1.2rem;
    height: 1.2rem;
  }
}
.active {
  background: #6965db;
  color: #fff;
  animation-name: behover;
  animation-duration: 1s;
}
.menu-son:hover {
  animation-name: behover;
  animation-duration: 1s;
  background: #6965db;
  color: #fff;
}

@keyframes behover {
  from {
    background-color: #fff;
  }
  to {
    background-color: #6965db;
    color: #fff;
  }
}
</style>
