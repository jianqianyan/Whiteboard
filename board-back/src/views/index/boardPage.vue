<template>
  <div class="board-page">
    <div class="board-page-body">
      <div class="search-box">
        <div class="input-box">
          <div class="left-box">
            <div class="input-text">白板id</div>
            <el-input v-model="boardId" size="small"></el-input>
          </div>
          <div class="right-box">
            <div class="input-text">用户id</div>
            <el-input v-model="userId" size="small"></el-input>
          </div>
        </div>
        <div class="button-box">
          <el-button>搜索</el-button>
          <el-button>清空</el-button>
        </div>
      </div>
      <div class="boardList-box">
        <div class="list-son"></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
let boardId = ref("");
let userId = ref("");
const boardData = reactive([]);
</script>
<style scoped lang="less">
.board-page {
  width: calc(100 - 15px);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  padding: 10px 7px;
  .board-page-body {
    width: 100%;
    .search-box {
      width: 100%;
      display: flex;
      margin-bottom: 10px;
      justify-content: space-between;
      .input-box {
        display: flex;
      }
      .left-box,
      .right-box {
        width: 30vw;
        display: flex;
        .input-text {
          width: 100px;
          display: flex;
          align-items: center;
          margin-left: 10px;
          font-size: 12px;
        }
      }
      .button-box {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
