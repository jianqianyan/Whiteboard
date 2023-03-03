<template>
  <div class="user-page">
    <div class="user-page-body">
      <div class="search-box">
        <div class="input-box">
          <div class="left-box">
            <div class="input-text">手机号</div>
            <el-input v-model="userPhone" size="small"></el-input>
          </div>
          <div class="right-box">
            <div class="input-text">用户名称</div>
            <el-input v-model="userName" size="small"></el-input>
          </div>
        </div>
        <div class="button-box">
          <el-button>搜索</el-button>
          <el-button>清空</el-button>
        </div>
      </div>
      <el-table :data="userdata" style="width: 100%">
        <el-table-column prop="id" label="用户id"></el-table-column>
        <el-table-column prop="name" label="用户名称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="email" label="用户邮箱"></el-table-column>
        <el-table-column fixed="right" label="Operations" width="120">
          <template #default="scoped">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scoped)"
              >详情</el-button
            >
            <el-button link type="primary" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :page-size="pageSize"
          :pager-count="11"
          layout="prev, pager, next"
          :total="total"
          v-model:current-page="pageNum"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
let userPhone = ref("");
let userName = ref("");
let total = ref(100);
let pageNum = ref(1);
let pageSize = ref(10);
const userdata = reactive([
  {
    id: "0001",
    name: "千言",
    phone: "10010",
    createTime: "2022-3-3 21:02",
    email: "10010@qq.com",
  },
  {
    id: "0002",
    name: "千言",
    phone: "10010",
    createTime: "2022-3-3 21:02",
    email: "10010@qq.com",
  },
  {
    id: "0002",
    name: "千言",
    phone: "10010",
    createTime: "2022-3-3 21:02",
    email: "10010@qq.com",
  },
]);
const handleClick = (data: any) => {
  console.log(data.$index);
};
</script>
<style scoped lang="less">
.user-page {
  width: calc(100 - 15px);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  padding: 10px 7px;
  .user-page-body {
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
    .pagination {
      width: 100%;
      display: flex;
      justify-content: end;
    }
  }
}
</style>
