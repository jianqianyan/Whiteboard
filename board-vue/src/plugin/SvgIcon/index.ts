import { App } from 'vue'

import SvgIcon from './index.vue'

export function setupSvgIcon(app: App) {
  app.component('SvgIcon', SvgIcon)
}