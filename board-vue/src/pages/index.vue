<template>
  <div class="index">
    <EsCanvas></EsCanvas>
    <el-dialog v-model="dialogVisible" width="auto" align-center>
      <div class="login-box">
        <input type="text">
        <el-button>登录</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import EsCanvas from "../components/EsCanvas.vue";
import { ref } from "vue";

const dialogVisible = ref(true);
</script>

<style scoped lang="less">
</style>
