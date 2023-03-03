<template>
  <div class="data-map-chat">
    <div id="data-map-chat-body" style="width: 100%; height: 300px"></div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import * as echarts from "echarts";

onMounted(() => {
  let mapchatEle = document.getElementById("data-map-chat-body");
  if (mapchatEle) {
    let mapchat = echarts.init(mapchatEle);
    mapchat.setOption({
      title: {
        text: "Proportion of Browsers",
        subtext: "Fake Data",
        top: 10,
        left: 10,
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        type: "scroll",
        bottom: 10,
        data: (function () {
          var list = [];
          for (var i = 1; i <= 28; i++) {
            list.push(i + 2000 + "");
          }
          return list;
        })(),
      },
      visualMap: {
        top: "middle",
        right: 10,
        color: ["red", "yellow"],
        calculable: true,
      },
      radar: {
        indicator: [
          { text: "IE8-", max: 400 },
          { text: "IE9+", max: 400 },
          { text: "Safari", max: 400 },
          { text: "Firefox", max: 400 },
          { text: "Chrome", max: 400 },
        ],
      },
      series: (function () {
        var series = [];
        for (var i = 1; i <= 28; i++) {
          series.push({
            type: "radar",
            symbol: "none",
            lineStyle: {
              width: 1,
            },
            emphasis: {
              areaStyle: {
                color: "rgba(0,250,0,0.3)",
              },
            },
            data: [
              {
                value: [
                  (40 - i) * 10,
                  (38 - i) * 4 + 60,
                  i * 5 + 10,
                  i * 9,
                  (i * i) / 2,
                ],
                name: i + 2000 + "",
              },
            ],
          });
        }
        return series;
      })(),
    });
  }
});
</script>
<style lang="less">
.data-map-chat {
  width: 100%;
  height: 300px;
  display: flex;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(44 51 73 / 5%);
  box-shadow: 0px 0px 10px rgb(44 51 73 / 5%);
  #data-map-chat-body {
    margin: 10px 5px;
  }
}
</style>
