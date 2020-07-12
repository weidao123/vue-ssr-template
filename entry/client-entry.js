import VueAppFactory from "../src/app";

const {app, router} = VueAppFactory();

router.onReady(() => {
    app.$mount("#app");
});
