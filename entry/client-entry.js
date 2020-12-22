import VueAppFactory from "../web/app";

const {app, router} = VueAppFactory();

router.onReady(() => {
    app.$mount("#app");
});
