<template>
  <div class="help-page">
    <div class="help-body">
      <div class="admin-box">
        <img :src="png" alt="" />
        <div class="text-box">
          <span>联系我：</span>
          <span>邮箱：jianqianyan@qq.com</span>
          <span>Github：jianqianyan</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import png from "@/assets/00005.png";
</script>
<style lang="less">
.help-page {
  width: calc(100 - 15px);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  padding: 10px 7px;
  margin-bottom: 10px;
  .help-body {
    width: 100%;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    .admin-box {
      width: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .text-box {
        margin-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
    }
    img {
      width: 200px;
    }
  }
}
</style>
