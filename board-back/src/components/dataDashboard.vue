<template>
  <div class="data-dashboard">
    <div id="data-dashboard-body-left" style="width: 50%; height: 300px"></div>
    <div id="data-dashboard-body-right" style="width: 50%; height: 300px"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
onMounted(() => {
  let dashboardEle1 = document.getElementById("data-dashboard-body-left");
  if (dashboardEle1) {
    let dashboard1 = echarts.init(dashboardEle1);
    dashboard1.setOption({
      title: {
        text: "服务器cpu使用情况",
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
        },
      },
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          detail: {
            formatter: "{value}",
          },
          data: [
            {
              value: 75,
              name: "使用率",
            },
          ],
        },
      ],
    });
  }
  let dashboardEle2 = document.getElementById("data-dashboard-body-right");
  if (dashboardEle2) {
    let dashboard2 = echarts.init(dashboardEle2);
    dashboard2.setOption({
      title: {
        text: "服务器内存使用情况",
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
        },
      },
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%",
      },
      series: [
        {
          name: "Pressure",
          type: "gauge",
          detail: {
            formatter: "{value}",
          },
          data: [
            {
              value: 55,
              name: "使用率",
            },
          ],
        },
      ],
    });
  }
});
</script>
<style lang="less">
.data-dashboard {
  width: 100%;
  height: 300px;
  display: flex;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  #data-dashboard-body-left,
  #data-dashboard-body-right {
    margin: 10px 5px;
  }
}
</style>
