import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/svg/iconfont.js";

import "./assets/main.css";
import "./style/base.less";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import { setupSvgIcon } from "./plugin/SvgIcon/index";
const app = createApp(App);
setupSvgIcon(app);
app.use(createPinia());
app.use(router);
app.use(ElementPlus);

app.mount("#app");
