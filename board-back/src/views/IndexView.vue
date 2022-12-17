<template>
  <div class="index-view">
    <div class="index-nav">
      <index-nav></index-nav>
    </div>
    <div class="index-body">
      <index-menu></index-menu>
      <div class="router-box">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IndexMenu from "@/components/IndexMenu.vue";
import IndexNav from "@/components/IndexNav.vue";
</script>

<style scoped lang="less">
.index-view {
  height: 100vh;
  width: 100vw;
  .index-nav {
    height: 60px;
  }
  .index-body {
    height: calc(100% - 60px);
    width: 100%;
    display: flex;
  }
  .router-box {
    flex: 1;
  }
}
</style>
