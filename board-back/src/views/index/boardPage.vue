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
        <div
          class="list-son"
          v-for="(item, index) in boardData"
          :key="index + 'boardson'"
        >
          <ex-canvas :brushData="item.data"></ex-canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import API from "@/plugin/axios/axiosInstance";
import ExCanvas from "./ExCanvas.vue";
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
let boardId = ref("");
let userId = ref("");
let pageSize = ref(10);
let pageNum = ref(1);
let total = ref(0);
const boardData = ref();
const getBoardList = async () => {
  (API as any)({
    url: "/admin/getBoardList",
    methods: "get",
    params: {
      page: pageNum.value,
      pageSize: pageSize.value,
      boardId: boardId.value,
      userId: userId.value,
    },
  })
    .then((res: any) => {
      if (res.data.status === 200) {
        boardData.value = res.data.data;
        console.log(res.data.data);
        total.value = res.data.total;
      } else {
        ElMessage({
          type: "warning",
          message: res.data.message,
        });
      }
    })
    .catch((err: any) => {
      ElMessage({
        type: "error",
        message: err.message,
      });
    });
};
onMounted(() => {
  getBoardList();
});
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
    .boardList-box {
      width: 100%;
      height: 600px;
      .list-son {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 250px;
        box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
        border-style: solid;
        border-width: 1px;
        float: left;
      }
    }
  }
}
</style>
