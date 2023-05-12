<template>
  <div class="operation-page">
    <div class="operation-header">
      <div class="input-box1">
        <div class="input-son">
          <div class="input-title">系统模块</div>
          <el-input size="small"></el-input>
        </div>
        <div class="input-son">
          <div class="input-title">操作人员</div>
          <el-input size="small"></el-input>
        </div>
        <div class="input-son">
          <div class="input-title">类型</div>
          <el-input size="small"></el-input>
        </div>
        <div class="input-son">
          <div class="input-title">状态</div>
          <el-input size="small"></el-input>
        </div>
      </div>
      <div class="input-box2">
        <div class="input-son">
          <div class="input-title">操作时间</div>
          <el-input size="small"></el-input>
        </div>
        <div class="input-son">
          <div class="button-box">
            <el-button type="primary" :icon="Search">搜索</el-button>
            <el-button :icon="RefreshRight">重置</el-button>
          </div>
        </div>
        <div class="input-son"></div>
        <div class="input-son"></div>
      </div>
      <div class="input-box3">
        <el-button :icon="Delete" type="danger" plain>删除</el-button>
        <el-button :icon="Delete" type="danger" plain>清空</el-button>
        <el-button :icon="Download" type="warning" plain>导出</el-button>
      </div>
    </div>
    <div class="operation-body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="日志编号" prop="id"></el-table-column>
        <el-table-column label="系统模块" prop="model"></el-table-column>
        <el-table-column label="操作类型" prop="type"></el-table-column>
        <el-table-column label="请求方式" prop="method"></el-table-column>
        <el-table-column label="操作人员" prop="user"></el-table-column>
        <el-table-column label="主机" prop="ip"></el-table-column>
        <el-table-column label="操作地点" prop="address"></el-table-column>
        <el-table-column label="操作状态" prop="status"></el-table-column>
        <el-table-column
          label="操作日期"
          prop="date"
          width="180"
        ></el-table-column>
        <el-table-column label="操作">
          <template #default>
            <el-button link type="primary" size="small">详细 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page-box">
        <el-pagination
          :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          small
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  Search,
  RefreshRight,
  Delete,
  Download,
} from "@element-plus/icons-vue";
import { ref } from "vue";
const tableData = ref([
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
  {
    id: 100,
    model: "用户管理",
    type: "用户管理",
    method: "post",
    user: "admin",
    ip: "127.0.0.1",
    address: "内网",
    statue: "成功",
    date: "2023-05-12 15:50:00",
  },
]);
</script>
<style scoped lang="less">
.operation-page {
  width: calc(100 - 15px);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  padding: 10px 7px;
  margin-bottom: 10px;
  .operation-header {
    width: 100%;
    .input-box1,
    .input-box2 {
      display: flex;
      width: 100%;
      margin-top: 10px;
      .input-son {
        display: flex;
        align-items: center;
        flex: 1;
        .input-title {
          width: 120px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          margin-right: 10px;
          font-size: 12px;
        }
        .button-box {
          margin-left: 20px;
        }
      }
    }
    .input-box3 {
      margin: 10px 0 0 20px;
    }
  }
  .operation-body {
    margin-top: 15px;
  }
  .page-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
