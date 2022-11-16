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
      <div class="login-dialog">
        <div class="code-input">
            <el-input></el-input>    
        </div>
        <div class="choose-user">
          <div class="user-login">
            <button>{{ $t('button.userLogin' ) }}</button>
          </div>
          <div class="tourist-login">
            <button>{{ $t('button.touristLogin' )}}</button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialogVisible = ref(true);
const falsec = ref(false);
</script>

<style scoped lang="less">
.code-input{
    margin: 0 0 10px 0 ;
}
.choose-user {
  width: 100%;
  .tourist-login {
    margin-top: 10px;
  }
}
</style>
