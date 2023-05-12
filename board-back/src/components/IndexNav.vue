<template>
  <div class="index-nav">
    <div class="nav-title">
      <p>Whiteboard</p>
      <div class="nav-input">
        <el-input
          class="w-50 m-2"
          placeholder="Please Input"
          size="small"
          :prefix-icon="Search"
          width="280"
        />
      </div>
    </div>
    <div class="nav-body"></div>
    <div class="user-box">
      <div class="user-box-body">
        <div class="bell">
          <el-icon><Bell /></el-icon>
        </div>
        <div class="user-img"><img :src="userImg" alt="" /></div>
        <div class="user-name"><p>Qian yan</p></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userImg from "../assets/user.png";
import { Search } from "@element-plus/icons-vue";
</script>

<style scoped lang="less">
.index-nav {
  height: 100%;
  width: 100%;
  box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 10%);
  display: flex;
  justify-content: space-between;
}
.nav-title {
  // background: red;
  display: flex;
  align-items: center;
  padding-left: 1rem;
  font-size: 1.1rem;
  .nav-input {
    width: 280px;
    margin-left: 20px;
  }
}
.user-box {
  display: flex;
  align-items: center;
  margin-right: 20px;
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
    .bell {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      height: 2.5rem;
      width: 2.5rem;
      margin-right: 10px;
    }
  }
}
</style>
