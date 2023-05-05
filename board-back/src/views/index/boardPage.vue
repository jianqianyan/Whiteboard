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
          <el-button @click="search()">搜索</el-button>
          <el-button @click="empty()">清空</el-button>
        </div>
      </div>
      <div class="boardList-box" v-loading="loading">
        <div
          class="list-son"
          v-for="(item, index) in boardData"
          :key="index + 'boardson'"
          @click="watchCanvas(index)"
        >
          <ex-canvas
            :brushData="item.data"
            :size="10"
            :key="item.boardId"
            :width="200"
            :height="100"
          ></ex-canvas>
          <div class="board-message">白板Id:{{ item.boardId }}</div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          :page-size="pageSize"
          :total="total"
          layout="prev, pager, next"
          v-model:current-page="pageNum"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog v-model="dialogVisble"
      ><div class="dialog-box">
        <div class="dialog-box-body">
          <ex-canvas
            :brushData="dialogCanvas.data"
            :size="5"
            :key="dialogCanvas.boardId"
            :width="400"
            :height="200"
          >
          </ex-canvas>
          <div class="canvas-message">
            <span>userId: {{ dialogCanvas.userId }}</span>
            <span>创建时间: {{ dialogCanvas.createTime }}</span>
          </div>
          <div class="canvas-button">
            <el-button>禁用</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
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
let loading = ref(false);
const boardData = ref();
const dialogVisble = ref(false);
const dialogCanvas = ref({ data: "", boardId: "", userId: "", createTime: "" });
const getBoardList = async () => {
  loading.value = true;
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
      loading.value = false;
    })
    .catch((err: any) => {
      ElMessage({
        type: "error",
        message: err.message,
      });
      loading.value = false;
    });
};
const handleCurrentChange = () => {
  getBoardList();
};
const search = () => {
  getBoardList();
};
const empty = () => {
  userId.value = "";
  boardId.value = "";
};
const watchCanvas = (index: number) => {
  dialogVisble.value = true;
  dialogCanvas.value = boardData.value[index];
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
      height: 500px;
      margin-top: 20px;
      .list-son {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 18%;
        margin: 10px;
        padding-bottom: 10px;
        box-shadow: 0px 0px 10px rgb(44 51 73 / 30%);
        float: left;
        transition: all 0.3s;
      }
      .list-son:hover {
        animation: float 0.3s ease-in-out;
        transform: translateY(-3px);
        box-shadow: 5px 5px 10px rgb(44 51 73 / 30%);
      }
    }
    .pagination {
      width: 100%;
      display: flex;
      justify-content: end;
    }
  }
}
@keyframes float {
  0% {
    transform: translateY(0px);
    box-shadow: 0px 0px 10px rgb(44 51 73 / 30%);
  }
  50% {
    transform: translateY(-2px);
    box-shadow: 5px 5px 10px rgb(44 51 73 / 30%);
  }
  100% {
    transform: translateY(-3px);
    box-shadow: 5px 5px 10px rgb(44 51 73 / 30%);
  }
}
.dialog-box {
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog-box-body {
    width: 100%;
    display: flex;
    flex-direction: column;
    .canvas-message {
      width: 100%;
      display: flex;
      justify-content: end;
      span {
        display: flex;
        align-items: center;
        line-height: 25px;
        padding-left: 5px;
      }
    }
    .canvas-button {
      width: 100%;
      height: 60px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
