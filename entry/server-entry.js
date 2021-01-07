import VueAppFactory from "../web/app";

/**
 * 服务端的入口
 * @param url
 */
export default function ({ url }) {
    const { app, router } = VueAppFactory();
    // 这里的front 是vue router设置的base
    if (url.startsWith("/front")) {
        url = url.replace("/front", "");
    }
    router.push(url);
    const components = router.getMatchedComponents();
    return app;
}
