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
      <div class="login-dialog" v-if="userId === '-1'">
        <div class="choose-user" v-if="loginStatus === 0">
          <div class="user-login">
            <button @click="changeToUserLogin()">
              {{ $t("button.userLogin") }}
            </button>
          </div>
          <div class="user-register">
            <button @click="changeToTouristLogin()">
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
        <div class="user-register" v-if="loginStatus === 2">
          <div class="phone-box">
            <input
              type="text"
              class="phone-input"
              :placeholder="$t('button.phone')"
              v-model="registerData.phone"
            />
          </div>
          <div class="password-box">
            <form>
              <input
                type="password"
                class="password-input"
                :placeholder="$t('button.password')"
                autocomplete="off"
                v-model="registerData.password"
              />
            </form>
          </div>
          <div class="password-box">
            <form>
              <input
                type="password"
                class="password-input"
                :placeholder="$t('button.confirmPassword')"
                autocomplete="off"
                v-model="registerData.confirmPassword"
              />
            </form>
          </div>
          <div class="login-button">
            <button @click="register()">{{ $t("button.register") }}</button>
          </div>
          <div class="return-button">
            <p @click="returnChoose()">返回</p>
          </div>
        </div>
      </div>
      <div class="user-dialog" v-else>
        <div class="user-name">{{ userData.userName }}</div>
        <div class="user-id">UID: {{ userId }}</div>
        <button @click="shareWhiteboard()">
          {{ $t("button.shareWhiteboard") }}
        </button>
        <button @click="logOut()">
          {{ $t("button.logOut") }}
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, toRef, watch, reactive } from "vue";
import logo from "../../assets/png/logo.jpg";
import i18n from "../../i18n";
import API from "../../plugin/axios/axiosInstance";
import { ElMessage } from "element-plus";
const props = defineProps(["loginVisible", "userId"]);

const dialogVisible = toRef(props, "loginVisible");
const userId = toRef(props, "userId");
let bodyVisible = ref(false);
let loginStatus = ref(0);
let phone = ref(null);
let password = ref(null);
let registerData = ref({ phone: null, password: null, confirmPassword: null });
const userData = reactive({ phone: null, userName: null });

const emits = defineEmits(["userChange", "shareWhiteboard"]);
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
function shareWhiteboard() {
  emits("shareWhiteboard", "1");
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
        localStorage.setItem("userId", res.data.data.userId);
        localStorage.setItem("token", res.data.data.token);
        bodyVisible.value = false;
        ElMessage({
          message: i18n.global.t("Tips.LoginSucess"),
          type: "success",
        });
      } else {
        ElMessage({
          type: "error",
          message: res.data.message,
        });
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        ElMessage({
          type: "error",
          message: err.response.data.message,
        });
      }
    });
}
const register = () => {
  if (
    !registerData.value.phone ||
    !registerData.value.password ||
    !registerData.value.confirmPassword
  ) {
    ElMessage({
      message: i18n.global.t("Tips.PasswrodOrPhoneNotNull"),
      type: "warning",
    });
    return;
  }
  // 检验两次密码是否相同
  if (registerData.value.password != registerData.value.confirmPassword) {
    ElMessage({
      message: i18n.global.t("Tips.confirmNOTLike"),
      type: "warning",
    });
    return;
  }
  let body = {
    password: registerData.value.password,
    phone: registerData.value.phone,
  };
  API({
    method: "post",
    url: "/user/register",
    data: body,
  })
    .then((res) => {
      ElMessage({
        type: res.data.status === 200 ? "success" : "error",
        message: res.data.message,
      });
      if (res.data.status === 200) {
        loginStatus.value = 1;
      }
    })
    .catch((err) => {
      if (err.response.status === 401) {
        ElMessage({
          type: "error",
          message: err.response.data.message,
        });
      }
    });
};
const logOut = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  document.location.reload();
};
watch(userId, (value) => {
  if (userId.value !== "-1") {
    API({
      method: "get",
      url: "/user/getUser",
      params: { userId: userId.value },
    })
      .then((res) => {
        if (res.data.status === 200) {
          userData.phone = res.data.data.phone;
          userData.userName = res.data.data.userName;
        } else {
          ElMessage({
            type: "warning",
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
</script>

<style scoped lang="less">
.login-header {
  text-align: center;
  margin-left: 16px;
}
.choose-user {
  width: 100%;
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
.user-register {
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
.user-dialog {
  display: flex;
  align-items: center;
  flex-direction: column;
  .user-name {
    font-size: 15px;
    margin-bottom: 8px;
  }
  .user-id {
    font-size: 10px;
  }
  button {
    margin-top: 10px;
  }
}
</style>
