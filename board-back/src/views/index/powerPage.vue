<template>
  <div class="power-page">
    <el-tabs v-model="activeName" class="demo-tabs" type="card">
      <el-tab-pane label="用户权限管理" name="1">
        <div class="power-table">
          <el-table :data="userData" style="width: 100%">
            <el-table-column prop="id" label="用户id"></el-table-column>
            <el-table-column prop="name" label="用户名称"></el-table-column>
            <el-table-column prop="power" label="具体权限"></el-table-column>
            <el-table-column
              prop="lastChange"
              label="最后修改时间"
            ></el-table-column>
            <el-table-column label="操作">
              <template #default>
                <el-button link type="primary" size="small">修改</el-button>
                <el-button
                  link
                  type="primary"
                  size="small"
                  @click="userDialog = true"
                  >分配权限</el-button
                >
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
      </el-tab-pane>
      <el-tab-pane label="管理员权限管理" name="2">
        <div class="power-table">
          <el-table :data="adminData" style="width: 100%">
            <el-table-column prop="id" label="用户id"></el-table-column>
            <el-table-column prop="name" label="用户名称"></el-table-column>
            <el-table-column prop="power" label="具体权限"></el-table-column>
            <el-table-column
              prop="lastChange"
              label="最后修改时间"
            ></el-table-column>
            <el-table-column label="操作">
              <template #default>
                <el-button link type="primary" size="small">修改</el-button>
                <el-button link type="primary" size="small">分配权限</el-button>
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
      </el-tab-pane>
    </el-tabs>
    <el-dialog v-model="userDialog" title="权限分配" width="40%">
      <el-form label-width="120px">
        <el-form-item label="用户id"> 1 </el-form-item>
        <el-form-item label="用户姓名">张三</el-form-item>
        <el-form-item label="权限分配">
          <el-checkbox label="新增白板" />
          <el-checkbox label="修改白板" />
          <el-checkbox label="删除白板" />
          <el-checkbox label="分享白板" />
          <el-checkbox label="密码重置" />
          <el-checkbox label="名字修改" />
          <el-checkbox label="注销功能" />
        </el-form-item>
      </el-form>
      <div class="button-box">
        <el-button style="width: 10vw" type="primary">保存</el-button>
        <el-button style="width: 10vw">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
const activeName = ref("1");
const userDialog = ref(false);
const adminDialog = ref(false);
const userData = [
  {
    id: "1",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "2",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "3",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "4",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "5",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "6",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "7",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "8",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "9",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "10",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "11",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "12",
    name: "张三",
    power: "新增白板，修改白板...",
    lastChange: "2023/5/11 21:23",
  },
];
const adminData = [
  {
    id: "1",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "2",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "3",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "4",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "5",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "6",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "7",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "8",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "9",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "10",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "11",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
  {
    id: "12",
    name: "李四",
    power: "白板管理，用户管理...",
    lastChange: "2023/5/11 21:23",
  },
];
</script>
<style scoped lang="less">
.power-page {
  width: calc(100 - 15px);
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  padding: 10px 7px;

  .power-table {
    width: 100%;
  }

  .page-box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.button-box {
  width: 100%;
  display: flex;
  justify-content: space-around;
}
</style>
