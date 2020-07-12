const express = require("express");
const ServerRender = require("vue-server-renderer");
const {getBundle, initClientServer, SERVER_PORT} = require("./utils");
const Server = express();

/**
 * 启动Express服务器
 */
(async function () {
    const ENV = process.argv[2].split("=")[1];
    Server.listen(SERVER_PORT, () => console.log("> start server"));
    await initClientServer(Server, ENV);
    Server.get("*", async function (req, res) {
        try {
            const {serverBundle, clientBundle, template} = getBundle();
            const renderer = ServerRender.createBundleRenderer(serverBundle, {
                clientManifest: clientBundle,
                template,
                runInNewContext: false,
                inject: ENV === "development"
            });
            const html = await renderer.renderToString({url: req.url});
            res.end(html);
        } catch (e) {
            console.log(e);
            res.send(e.toString());
        }
    });
})();
