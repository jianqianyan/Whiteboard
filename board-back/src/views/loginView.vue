<template>
  <div class="login-body">
    <div class="login-box">
      <div class="login-title">Whiteboard background system</div>
      <div class="user-input">
        <input type="text" class="base-input" placeholder="User" />
      </div>
      <div class="password-input">
        <input type="password" class="base-input" placeholder="Password" />
      </div>
      <div class="login-button">
        <button class="base-button">Login</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped lang="less">
.login-body {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color);
}
.login-box {
  width: 300px;
  height: 220px;
  // background-color: red;
  margin-bottom: 100px;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(44 51 73 / 10%);
  box-shadow: 0 0.5rem 1rem 0 rgb(44 51 73 / 10%);
  border-radius: 15px;
  padding: 40px 35px;
  // display: flex;
  justify-content: center;
  div {
    width: 100%;
  }
  .login-title {
    display: flex;
    justify-content: center;
  }
  .user-input {
    margin-top: 25px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .password-input {
    margin-top: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .login-button {
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
