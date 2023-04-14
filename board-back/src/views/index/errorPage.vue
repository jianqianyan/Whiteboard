<template>
  <div class="error-page">
    <el-table style="width: 100%;" :data="errorData">
      <el-table-column prop="date" label="日期" width="180"></el-table-column>
      <el-table-column label="优先级" width="180">
        <template #default="scoped">
          <div class="proproty-box">
            <el-icon :color="iconColor(scoped.row.priorityCode)">
              <Warning />
            </el-icon>&nbsp;
            {{ scoped.row.priority }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="state" label="状态" width="120"></el-table-column>
      <el-table-column prop="message" label="报错信息"></el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template #default="scoped">
          <el-button type="success" plain @click="handle(scoped.$index)">标记为已处理</el-button>
          <el-button type="warning" plain @click="details(scoped.$index)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
let errorData = [
  {
    date: '2023-4-14',
    priority: "高",
    priorityCode: 1,
    state: '未解决',
    message: 'error'
  },
  {
    date: '2023-4-14',
    priority: "中",
    priorityCode: 2,
    state: '未解决',
    message: 'error'
  },
  {
    date: '2023-4-14',
    priority: "低",
    priorityCode: 3,
    state: '未解决',
    message: 'error'
  },
]
const handle = (index: number) => {
  console.log(index)
}
const details = (index: number) => {
  console.log(index)
}
let iconColor = (num: number) => {
  let colorArr = ['', 'red', '#e79914', 'green']
  return colorArr[num]
}
</script>
<style lang="less">
.error-page {
  width: calc(100 - 15px);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  padding: 10px 7px;

  .proproty-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
