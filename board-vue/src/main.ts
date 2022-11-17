import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import i18n from './i18n';
import './assets/svg/iconfont.js'
import './style/base.less'

const app = createApp(App);
import { setupSvgIcon } from './plugin/SvgIcon/index'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
setupSvgIcon(app)

app.use(i18n)
app.use(ElementPlus)
app.mount('#app');
