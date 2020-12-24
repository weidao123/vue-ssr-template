import VueRouter from "vue-router";
import Vue from "vue";
import Home from "../views/Home";
import Index from "../views/Index";

Vue.use(VueRouter);

export default function () {
    const router = new VueRouter({
        mode: "history",
        base: 'front',
        routes: [{
            path: "/",
            component: Index,
        }, {
            path: "/home",
            component: Home,
        }]
    });
    router.beforeEach((form, to, next) => {
        //console.log("form path:" + form.path);
        //console.log("to path:" + to.path);
        next();
    });
    return router;
}
