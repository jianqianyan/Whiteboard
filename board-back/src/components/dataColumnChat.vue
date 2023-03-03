<template>
  <div class="column-chat">
    <div id="column-chat-body" style="width: 100%; height: 300px"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import * as echarts from "echarts";
onMounted(() => {
  let columnChatEle = document.getElementById("column-chat-body");
  if (columnChatEle) {
    let columnChat = echarts.init(columnChatEle);
    columnChat.setOption({
      title: {
        text: "本周使用情况",
        textStyle: {
          fontSize: 12,
          fontWeight: 400,
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
        },
      ],
      color: ["#6965db"],
    });
  }
});
</script>
<style scoped lang="less">
.column-chat {
  width: 100%;
  height: 300px;
  //   background: blue;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  #column-chat-body {
    margin: 10px 5px;
  }
}
</style>
