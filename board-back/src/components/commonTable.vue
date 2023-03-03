<template>
  <div class="common-table">
    <div class="table-header">
      <div
        v-for="(item, index) in data.header"
        :key="index + 'header'"
        class="header-son"
      >
        {{ item }}
      </div>
    </div>
    <div class="table-body"></div>
  </div>
</template>
<script lang="ts" setup>
import { toRef, defineProps } from "vue";
const props = defineProps(["data"]);
let data = toRef(props, "data");
</script>
<style lang="less">
.common-table {
  width: 100%;
  .table-header {
    width: 100%;
    display: flex;
    .header-son {
      flex: 1;
    }
  }
}
</style>
