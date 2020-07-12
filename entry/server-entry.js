import VueAppFactory from "../src/app";

/**
 * 服务端的入口 会被server.js 调用
 * @param url
 */
export default function ({ url }) {
    const { app, router } = VueAppFactory();
    router.push(url);
    const components = router.getMatchedComponents();
    console.log("router matched :" + components.length);
    return app;
}
