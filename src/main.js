import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";
import "./assets/css/trulo.css";

window.eventBus = mitt();

createApp(App).mount("#app");
