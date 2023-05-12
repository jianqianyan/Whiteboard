<template>
  <div class="system-page">
    <div class="system-message">
      <div class="box-title">系统信息</div>
      <hr />
      <div class="message-body">
        <div class="left-box">
          <div>版本型号：V1.0</div>
          <div>操作系统版本：Windows 10</div>
          <div class="">部署时间：2023/5/12 9:43</div>
        </div>
        <div class="right-box">
          <div>CPU：1.2GHZ 内存：100G</div>
          <div>内存存储：200G</div>
          <div>MAC地址（有线）：00：36：50：05：ED：FD</div>
          <div>MAC地址（无线）：08：3E：8E：78：F5：F4</div>
        </div>
      </div>
    </div>
    <div class="system-setting">
      <div class="box-title">系统设置</div>
      <hr />
      <div class="message-body">
        <div class="left-box">
          <el-form label-width="120px">
            <el-form-item label="访问地址">
              <el-input v-model="address" size="small"></el-input>
            </el-form-item>
            <el-form-item label="发件邮箱">
              <el-input v-model="email" size="small"></el-input>
            </el-form-item>
            <el-form-item label="发件手机">
              <el-input v-model="phone" size="small"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="right-box"></div>
      </div>
    </div>
    <div class="storage-message">
      <data-dashboard></data-dashboard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dataDashboard from "@/components/dataDashboard.vue";
const address = ref("http://localhost:5173/");
const email = ref("XXXXX@163.com");
const phone = ref("130XXXXXXXX");
</script>
<style lang="less" scoped>
.system-page {
  .system-message,
  .system-setting {
    width: calc(100 - 15px);
    border-style: solid;
    border-width: 2px;
    border-color: rgb(44 51 73 / 5%);
    box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
    padding: 10px 7px;
    margin-bottom: 10px;
    .box-title {
      margin-bottom: 10px;
      font-size: 18px;
    }
    .message-body {
      display: flex;
      margin: 10px 0;
      .left-box,
      .right-box {
        flex: 1;
        div {
          margin: 5px 5px;
          :deep(.el-form-item__label) {
            height: 100% !important;
            margin: 5px 0;
          }
        }
      }
    }
  }
}
</style>
