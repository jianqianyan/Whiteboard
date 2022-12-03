<template>
    <div class="img-up">
        <el-dialog v-model="visable" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" width="450px">
            <template #header>
                <div class="login-header">
                    上传图片
                </div>
            </template>
            <div class="input-box">
                <input type="file" id="file">
            </div>
            <div class="img-box">
                <img :src="imgSrc.value" alt="">
            </div>
            <div class="button-box">
                <button @click="Determine" :disabled="imgSrc.value === ''">确定</button>
                <button @click="Cancel">取消</button>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, toRef, watch, reactive, ref } from "vue";
const props = defineProps(["imgupVisble"]);
let imgupVisble = toRef(props, 'imgupVisble');
const emits = defineEmits(["imgUpload"]);
let visable = ref(false);

let imgSrc = reactive({ value: "" });
const Determine = () => {
    if (imgSrc.value !== "") {
        emits("imgUpload", { src: imgSrc });
    }
    visable.value = false;
}
const Cancel = () => {
    visable.value = false;
}
watch(imgupVisble, (newValue, oldValue) => {
    visable.value = imgupVisble.value;
    nextTick(() => {
        let file = document.getElementById("file");
        (file as HTMLElement).onchange = function (e: any) {
            let fileData = e.target.files[0];
            let reader = new FileReader();
            reader.readAsDataURL(fileData);
            reader.onload = function (e: any) {
                imgSrc.value = e.target.result;
            }
        }
    })
})
</script>

<style scoped lang="less">
.input-box {
    width: 100%;

    input {
        width: 100%;
        margin: 0;
    }
}

.img-box {
    widows: 100%;
    margin: 10px 0 0 0;

    img {
        width: 100px;
    }
}

.button-box {
    widows: 100%;
    display: flex;
    justify-content: space-between;
    margin: 10px 0 0 0;

    button {
        margin: 0;
        width: 45%;
    }
}
</style>