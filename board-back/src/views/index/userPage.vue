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
          <el-button @click="empty()">清空</el-button>
        </div>
      </div>
      <el-table :data="userdata" style="width: 100%" v-loading="loading">
        <el-table-column prop="userId" label="用户id"></el-table-column>
        <el-table-column prop="userName" label="用户名称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="email" label="用户邮箱"></el-table-column>
        <el-table-column prop="Available" label="是否可用">
          <template #default="scoped">
            {{ scoped.row.Available == 1 ? "是" : "否" }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scoped">
            <el-button
              link
              type="primary"
              size="small"
              @click="handleClick(scoped)"
              >详情</el-button
            >
            <el-button
              link
              type="primary"
              size="small"
              @click="disableConfirm(scoped)"
              >{{ scoped.row.Available == 1 ? "禁用" : "启用" }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          :page-size="pageSize"
          layout="prev, pager, next"
          :total="total"
          v-model:current-page="pageNum"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-drawer v-model="drawer" :with-header="false" :close="drawerClose()">
      <div
        v-for="(item, index) in Object.entries(newData)"
        :key="index + 'info'"
      >
        <div class="userDish-name">{{ userDish[item[0]] }}</div>
        <div class="userDish-value">
          <div v-if="changeFlag">
            {{
              item[0] == "Available"
                ? item[1] == 1
                  ? "是"
                  : "否"
                : item[1] || "无"
            }}
          </div>
          <div v-else>
            <el-input
              size="small"
              v-model="newData[item[0]]"
              :disabled="checkDisabled(item[0])"
            ></el-input>
          </div>
        </div>
      </div>
      <div class="drawer-button">
        <div class="change-box" v-if="changeFlag">
          <el-button @click="userChange()">修改</el-button>
        </div>
        <div class="save-box" v-else>
          <el-button @click="userSave()">保存</el-button>
          <el-button @click="userCancel()">取消</el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog v-model="dialogVisible" title="提示" width="30%">
      <span>确认将此用户禁用/启用吗</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDisabled()">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import API from "../../plugin/axios/axiosInstance";
import { ref, onBeforeMount } from "vue";
import { ElMessage } from "element-plus";
interface userData {
  userId: string;
  userName: string;
  phone: string;
  email: string;
  createTime: string;
  Available: number;
  [key: string]: string | number;
}
let userId = ref("");
let userName = ref("");
let total = ref(100);
let pageNum = ref(1);
let pageSize = ref(10);
let loading = ref(false);
let drawer = ref(false);
let changeFlag = ref(true);
const userdata = ref([]);
let new_data: userData = {
  userId: "",
  userName: "",
  phone: "",
  email: "",
  createTime: "",
  Available: 0,
};
const newData = ref(new_data);
const dialogVisible = ref(false);
const userDish: { [key: string]: string } = {
  userId: "用户id",
  userName: "用户名称",
  phone: "手机号",
  email: "邮箱",
  createTime: "创建时间",
  Available: "是否可用",
};
const handleClick = (data: any) => {
  drawer.value = true;
  newData.value = userdata.value[data.$index];
};

const disableConfirm = (data: any) => {
  newData.value = userdata.value[data.$index];
  dialogVisible.value = true;
};
const search = () => {
  getUserList();
};
const checkDisabled = (str: string) => {
  const disArr = ["userId", "createTime", "Available"];
  if (disArr.indexOf(str) != -1) {
    return true;
  } else {
    return false;
  }
};
const getUserList = () => {
  loading.value = true;
  (API as any)({
    url: "/admin/getUserList",
    method: "get",
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
const handleCurrentChange = () => {
  getUserList();
};
const userUpdate = () => {
  (API as any)({
    url: "/admin/userUpdate",
    method: "post",
    data: newData.value,
  })
    .then((res: any) => {
      if (res.data.status == 200) {
        ElMessage({
          type: "success",
          message: "更新成功",
        });
        getUserList();
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
const confirmDisabled = () => {
  dialogVisible.value = false;
  newData.value.Available = newData.value.Available == 0 ? 1 : 0;
  userUpdate();
};
const empty = () => {
  userId.value = "";
  userName.value = "";
};
const userChange = () => {
  changeFlag.value = false;
};
const userSave = () => {
  changeFlag.value = true;
  drawer.value = false;
  userUpdate();
  getUserList();
};
const userCancel = () => {
  changeFlag.value = true;
  drawer.value = false;
  getUserList();
};
const drawerClose = () => {
  changeFlag.value = true;
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

.userDish-name {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
}

.userDish-value {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
}

.drawer-button {
  margin-top: 20px;

  .change-box {
    display: flex;
  }

  .save-box {
    display: flex;
  }
}
</style>
