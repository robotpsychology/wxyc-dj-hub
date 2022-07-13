/**
 * @file main.js is the root file for the Vue.js setup
 * @author robotpsychology (Ali Alrabeah)
 * @see <a href="https://github.com/robotpsychology/wxyc-dj-hub">WXYC DJ Hub Repo</a>
 * @license MIT
 * @description Import the necessary modules from Vue, Primevue, etc. Create an app instance in Vue. Instantiate app components.
 */

import { createApp } from "vue"
import Vue from "vue"
import { createPinia } from 'pinia'
import App from "./App.vue"
import { router } from "@/router"


// Vue.config.productionTip = false

import PrimeVue from "primevue/config"
import AutoComplete from "primevue/autocomplete"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import SelectButton from "primevue/selectbutton"
import RadioButton from "primevue/radiobutton"
import Checkbox from "primevue/checkbox";

import Dialog from "primevue/dialog"
import Button from "primevue/button"
import Menubar from "primevue/menubar"
import Dropdown from "primevue/dropdown"
import Textarea from "primevue/textarea"
import ToastService from "primevue/toastservice"


import "primevue/resources/themes/saga-blue/theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeicons/primeicons.css" //icons



const app = createApp(App)
app.use(PrimeVue)
app.use(router)
app.use(createPinia())
app.use(ToastService)
// .use(store)

app.component("AutoComplete", AutoComplete)
app.component("InputText", InputText)
app.component("Password", Password)
app.component("SelectButton", SelectButton)
app.component("RadioButton", RadioButton)
app.component("Checkbox", Checkbox)
app.component("Dialog", Dialog)
app.component("Button", Button)
app.component("Menubar", Menubar)
app.component("Dropdown", Dropdown)
app.component("Textarea", Textarea)


app.mount("#app")
