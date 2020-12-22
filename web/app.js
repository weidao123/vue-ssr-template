import Vue from "vue";
import App from "./views/App";
import CreateRouter from "./router";

export default () => {
    const router = CreateRouter();
    const app = new Vue({
        router,
        render: h => h(App),
    });
    return { app, router }
}
