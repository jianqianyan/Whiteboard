<template>
  <div class="data-page">
    <div class="data-header">
      <div class="data-title">
        实例名称：mysql&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #67c23a">
          运行中</span
        >
      </div>
      <div class="header-button">
        <el-button type="primary">创建代理实例</el-button>
        <el-button type="primary" plain>重启实例</el-button>
        <el-button type="primary" plain>数据库管理工具</el-button>
      </div>
    </div>
    <hr />
    <div class="data-body">
      <div class="body-header">
        <div class="left-box">
          <el-button type="primary" plain>手动备份</el-button>
          <el-button type="primary" plain>设置自动备份</el-button>
        </div>
        <div class="right-box">
          <el-link type="primary">如何本地恢复备份</el-link>
          <el-button style="margin-left: 10px" type="primary" plain
            >克隆实例</el-button
          >
        </div>
      </div>
      <el-table style="100%" :data="data">
        <el-table-column
          label="备份开始/持续时间"
          prop="begintime"
        ></el-table-column>
        <el-table-column label="备份大小" prop="size"></el-table-column>
        <el-table-column label="生成方式" prop="method"></el-table-column>
        <el-table-column label="备份类型" prop="type"></el-table-column>
        <el-table-column label="状态"
          ><template #default>
            <el-tag type="success" disable-transitions>可用</el-tag>
          </template></el-table-column
        >
        <el-table-column label="操作">
          <template #default>
            <el-button link type="primary" size="small">下载 </el-button>
          </template></el-table-column
        >
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
import { ref } from "vue";
let data = ref([
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
  {
    begintime: "2023-5-12 01:00:47/1分钟",
    size: "1.00MB",
    method: "物理生成",
    type: "自动创建",
  },
]);
</script>
<style scoped lang="less">
.data-page {
  width: calc(100 - 15px);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  padding: 10px 10px;

  .data-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  .data-body {
    width: 100%;
    margin-top: 10px;
    .body-header {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
.page-box {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
