<template>
  <div class="line-chat">
    <div id="line-chat-body" style="width: 100%; height: 300px"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";
onMounted(() => {
  let lineChatEle = document.getElementById("line-chat-body");
  if (lineChatEle) {
    let lineChat = echarts.init(lineChatEle);
    lineChat.setOption({
      title: {
        text: "今年使用情况",
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
        },
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["使用人数", "新增白板数"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: [
          "Jan.",
          "Feb.",
          "Mar.",
          "Apr.",
          "May.",
          "Jun.",
          "Jul.",
          "Aug.",
          "Sep.",
          "Oct.",
          "Nov.",
          "Dec.",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "使用人数",
          type: "line",
          stack: "Total",
          data: [120, 132, 101, 134, 90, 230, 210, 240, 260, 300, 310, 330],
        },
        {
          name: "新增白板数",
          type: "line",
          stack: "Total",
          data: [125, 151, 140, 144, 200, 210, 250, 260, 270, 290, 300, 330],
        },
      ],
    });
  }
});
</script>
<style scoped lang="less">
.line-chat {
  width: 100%;
  height: 300px;
  //   background: red;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  #line-chat-body {
    margin: 10px 5px;
  }
}
</style>
