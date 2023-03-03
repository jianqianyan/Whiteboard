import type { App } from "vue";

import SvgIcon from "./Index.vue";

export function setupSvgIcon(app: App) {
  app.component("SvgIcon", SvgIcon);
}
