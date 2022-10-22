/**
 * @file main.js is the root file for the Vue.js setup
 * @author robotpsychology (Ali Alrabeah)
 * @see <a href="https://github.com/robotpsychology/wxyc-dj-hub">WXYC DJ Hub Repo</a>
 * @license MIT
 * @description Import the necessary modules from Vue, Primevue, etc. Create an app instance in Vue. Instantiate app components.
 */

// Vue, Pinia, and Router imports
import { createApp } from "vue"
import { createPinia } from 'pinia'
import { router } from "@/router"

// Primvue Core Import
import PrimeVue from "primevue/config"

// Primevue Component Imports
import AutoComplete from "primevue/autocomplete"
import InputText from "primevue/inputtext"
import Password from "primevue/password"
import SelectButton from "primevue/selectbutton"
import RadioButton from "primevue/radiobutton"
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog"
import Button from "primevue/button"
import Dropdown from "primevue/dropdown"
import Textarea from "primevue/textarea"
import ToastService from "primevue/toastservice"
import Calendar from "primevue/calendar"
import Toast from "primevue/toast";


import DataTable from "primevue/datatable";
import Column from "primevue/column";


// !!! Necessary imports for Primevue to work !!!
import "primevue/resources/themes/saga-blue/theme.css" //theme
import "primevue/resources/primevue.min.css" //core css
import "primeicons/primeicons.css" //icons

// Imports of Global SCSS Variables and Global Reset CSS Rules. This overrides some Primvue theme defeaults such as, importantly, --font-family.
import "./assets/global.scss";
import "./assets/reset.css";

// App.vue import to mount Vue App !!!
import App from "./App.vue"

// Decleration of Vue App
const app = createApp(App)

// Registering Primevue, Vue Router, Pinia, and Primevue ToastService
app.use(PrimeVue)
    .use(router)
    .use(createPinia())
    .use(ToastService)
// .use(store)

// Primevue Component Registration 
app.component("AutoComplete", AutoComplete)
    .component("InputText", InputText)
    .component("Password", Password)
    .component("SelectButton", SelectButton)
    .component("RadioButton", RadioButton)
    .component("Checkbox", Checkbox)
    .component("Dialog", Dialog)
    .component("Button", Button)
    .component("Dropdown", Dropdown)
    .component("Textarea", Textarea)
    .component("Calendar", Calendar)
    .component("Toast", Toast)
    .component("DataTable", DataTable)
    .component("Column", Column)


app.mount("#app")
