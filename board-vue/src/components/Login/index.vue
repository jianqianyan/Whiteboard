<template>
  <div class="login">
    <el-dialog
      v-model="dialogVisible"
      width="250"
      :close-on-click-modal="falsec"
      :close-on-press-escape="falsec"
      :show-close="falsec"
      align-center
    >
      <template #header>
        <div class="login-header">
          <img :src="logo" alt="">
        </div>
      </template>
      <div class="login-dialog">
        <div class="choose-user">
          <div class="user-login">
            <button>{{ $t("button.userLogin") }}</button>
          </div>
          <div class="tourist-login">
            <button>{{ $t("button.touristLogin") }}</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import logo from '../../assets/png/logo.jpg'

const dialogVisible = ref(true);
const falsec = ref(false);
</script>

<style scoped lang="less">
.login-header{
  text-align: center;
  margin-left: 16px;
}
.choose-user {
  width: 100%;
  .tourist-login {
    margin-top: 10px;
  }
}
</style>
