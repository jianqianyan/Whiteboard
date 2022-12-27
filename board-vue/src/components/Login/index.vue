<template>
  <div class="login">
    <el-dialog
      v-model="bodyVisible"
      width="250"
      :close-on-click-modal="true"
      :close-on-press-escape="true"
      :show-close="false"
      :before-close="userChange"
      align-center
    >
      <template #header>
        <div class="login-header">
          <img :src="logo" alt="" />
        </div>
      </template>
      <div class="login-dialog">
        <div class="choose-user" v-if="loginStatus === 0">
          <div class="user-login">
            <button @click="changeToUserLogin()">
              {{ $t("button.userLogin") }}
            </button>
          </div>
          <div class="tourist-login">
            <button @click="changeToTouristLogin()">
              {{ $t("button.touristLogin") }}
            </button>
          </div>
          <div class="user-register">
            <button>
              {{ $t("button.register") }}
            </button>
          </div>
        </div>
        <div class="user-login" v-if="loginStatus === 1">
          <div class="phone-box">
            <input
              type="text"
              class="phone-input"
              :placeholder="$t('button.phone')"
              v-model="phone"
            />
          </div>
          <div class="password-box">
            <form>
              <input
                type="password"
                class="password-input"
                :placeholder="$t('button.password')"
                autocomplete="off"
                v-model="password"
              />
            </form>
          </div>
          <div class="login-button">
            <button @click="login()">{{ $t("button.login") }}</button>
          </div>
          <div class="return-button">
            <p @click="returnChoose()">返回</p>
          </div>
        </div>
        <div class="tourist-login" v-if="loginStatus === 2"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, watch } from "vue";
import logo from "../../assets/png/logo.jpg";
import i18n from "../../i18n";
import API from "../../plugin/axios/axiosInstance";
import { ElMessage } from "element-plus";
const props = defineProps(["loginVisible"]);

const dialogVisible = toRef(props, "loginVisible");
let bodyVisible = ref(false);
let loginStatus = ref(0);
let phone = ref(null);
let password = ref(null);

const emits = defineEmits(["userChange"]);
watch(dialogVisible, (value) => {
  bodyVisible.value = value;
});

function userChange(val: any) {
  emits("userChange", val);
  bodyVisible.value = false;
}
function changeToUserLogin() {
  loginStatus.value = 1;
}
function changeToTouristLogin() {
  loginStatus.value = 2;
}
function returnChoose() {
  loginStatus.value = 0;
}
function login() {
  if (phone.value === null || password.value === null) {
    ElMessage({
      message: i18n.global.t("Tips.PasswrodOrPhoneNotNull"),
      type: "warning",
    });
    return;
  }
  let body = {
    password: password.value,
    phone: phone.value,
  };
  API({
    method: "post",
    url: "/user/login",
    data: body,
  })
    .then((res) => {
      if (res.data.status === 200) {
        emits("userChange", res.data.data.userId);
        bodyVisible.value = false;
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<style scoped lang="less">
.login-header {
  text-align: center;
  margin-left: 16px;
}
.choose-user {
  width: 100%;
  .tourist-login {
    margin-top: 10px;
  }
  .user-register {
    margin-top: 10px;
  }
}
.user-login {
  .password-box {
    margin-top: 10px;
  }
  .login-button {
    margin-top: 10px;
  }
  .return-button {
    display: flex;
    max-height: 30px;
    justify-content: end;
    p {
      cursor: pointer;
    }
  }
}
</style>
