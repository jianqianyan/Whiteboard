<template>
  <div class="home-page">
    <div class="home-mod1">
      <data-menu></data-menu>
    </div>
    <div class="home-mod2">
      <div class="left-chat">
        <data-line-chat></data-line-chat>
      </div>
      <div class="right-chat">
        <data-column-chat></data-column-chat>
      </div>
    </div>
    <div class="home-mod3">
      <div class="left-chat">
        <data-dashboard></data-dashboard>
      </div>
      <div class="right-chat">
        <data-map-chat></data-map-chat>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import dataMenu from "@/components/dataMenu.vue";
import dataLineChat from "@/components/dataLineChat.vue";
import dataColumnChat from "@/components/dataColumnChat.vue";
import dataDashboard from "@/components/dataDashboard.vue";
import dataMapChat from "@/components/dataMapChat.vue";
</script>
<style scoped lang="less">
.home-page {
  width: 100%;
  // display: flex;
  word-wrap: break-word;
  div {
    float: left;
  }
  .home-mod1 {
    width: 100%;
  }
  .home-mod2 {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    height: 300px;
    .left-chat {
      width: 55%;
    }
    .right-chat {
      width: 44%;
    }
  }
  .home-mod3 {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    height: 300px;
    .left-chat {
      width: 44%;
    }
    .right-chat {
      width: 55%;
    }
  }
}
</style>
