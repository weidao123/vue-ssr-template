import VueAppFactory from "../web/app";

/**
 * 服务端的入口
 * @param url
 */
export default function ({ url }) {
    const { app, router } = VueAppFactory();
    router.push(url);
    const components = router.getMatchedComponents();
    return app;
}
