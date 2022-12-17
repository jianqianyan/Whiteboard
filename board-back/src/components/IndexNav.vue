<template>
  <div class="index-nav">
    <div class="nav-title"><p>Whiteboard</p></div>
    <div class="nav-body"></div>
    <div class="user-box">
      <div class="user-box-body">
        <div class="user-img"><img :src="userImg" alt="" /></div>
        <div class="user-name"><p>Qian yan</p></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userImg from "../assets/user.png";
</script>

<style scoped lang="less">
.index-nav {
  height: 100%;
  width: 100%;
  box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 10%);
  display: flex;
}
.nav-title {
  width: 15%;
  // background: red;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  font-size: 1.1rem;
}
.nav-body {
  flex: 1;
}
.user-box {
  width: 10%;
  display: flex;
  align-items: center;
  .user-box-body {
    display: flex;
    .user-img {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 50%;
      border-style: solid;
      border-width: 1px;
      border-color: rgb(44 51 73 / 10%);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-name {
      margin-left: 1rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>
