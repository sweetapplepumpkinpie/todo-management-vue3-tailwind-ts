import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

import "./style.css"

export const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router)

router.isReady().then(() => {
  app.mount("#app").$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*")
  })
})
