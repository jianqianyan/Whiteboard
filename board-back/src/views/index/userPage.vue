<template>
  <div class="user-page">
    <div class="user-page-body">
      <div class="search-box">
        <div class="input-box">
          <div class="left-box">
            <div class="input-text">用户id</div>
            <el-input v-model="userId" size="small"></el-input>
          </div>
          <div class="right-box">
            <div class="input-text">用户名称</div>
            <el-input v-model="userName" size="small"></el-input>
          </div>
        </div>
        <div class="button-box">
          <el-button @click="search()">搜索</el-button>
          <el-button>清空</el-button>
        </div>
      </div>
      <el-table :data="userdata" style="width: 100%" v-loading="loading">
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="userName" label="用户名称"></el-table-column>
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
import API from "../../plugin/axios/axiosInstance";
import { ref, onBeforeMount } from "vue";
import { ElMessage } from "element-plus";
let userId = ref("");
let userName = ref("");
let total = ref(100);
let pageNum = ref(1);
let pageSize = ref(10);
let loading = ref(false);
const userdata = ref([]);
const handleClick = (data: any) => {
  console.log(data.$index);
};
const search = () => {
  getUserList();
};
const getUserList = () => {
  loading.value = true;
  (API as any)({
    url: "/admin/getUserList",
    methods: "get",
    params: {
      page: pageNum.value,
      pageSize: pageSize.value,
      userName: userName.value,
      userId: userId.value,
    },
  })
    .then((res: any) => {
      if (res.data.status === 200) {
        userdata.value = res.data.data;
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
onBeforeMount(() => {
  getUserList();
});
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
