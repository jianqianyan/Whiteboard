<template>
    <div class="img-up">
        <el-dialog v-model="imgupVisble" :close-on-click-modal="false" :close-on-press-escape="false"
            :show-close="false">
            <template #header>
                <div class="login-header">
                    上传图片
                </div>
            </template>
            <div>
                <input type="file">
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { toRef } from "vue";
const props = defineProps(["imgupVisble"]);
let imgupVisble = toRef(props, 'imgupVisble');

</script>