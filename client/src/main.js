import { createApp } from "vue"
import Vue from "vue"
// import Vuex from "vuex"
import App from "./App.vue"
import { store } from './store';
import { router } from "./router"
// import axios from "axios"
// import request from "request"
import "./styles/main.css"

// Vue.config.productionTip = false

import PrimeVue from "primevue/config"
import AutoComplete from "primevue/autocomplete"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import SelectButton from "primevue/selectbutton"
import Dialog from "primevue/dialog"
import Button from "primevue/button"
import Menubar from "primevue/menubar"


import "primevue/resources/themes/saga-blue/theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeicons/primeicons.css" //icons



const app = createApp(App)
app.use(PrimeVue).use(router).use(store)

app.component("AutoComplete", AutoComplete)
app.component("InputText", InputText)
app.component("Password", Password)
app.component("SelectButton", SelectButton)
app.component("Dialog", Dialog)
app.component("Button", Button)
app.component("Menubar", Menubar)


app.mount("#app")
