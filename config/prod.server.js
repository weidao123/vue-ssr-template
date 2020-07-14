const express = require("express");
const ServerRender = require("vue-server-renderer");
const {getBundle, initClientServer, SERVER_PORT } = require("./utils");
const ProdServer = express();

/**
 * 启动Express服务器
 */
(async function () {
    const ENV = process.argv[2].split("=")[1];
    ProdServer.listen(SERVER_PORT, () => {
        console.log("> start server\r\n");
        console.log("> running at " + ENV + "env\r\n");
        console.log("> application running here http://localhost:" + SERVER_PORT);
    });
    ProdServer.get("*", async function (req, res, next) {
        const {serverBundle, clientBundle, template} = await getBundle();
        if (!clientBundle
            || clientBundle.all.includes(req.url.substring(1))
            || clientBundle.all.includes(req.url)
        ) {
            next();
            return;
        }

        try {
            const renderer = ServerRender.createBundleRenderer(serverBundle, {
                clientManifest: clientBundle,
                template,
                runInNewContext: false,
                inject: ENV === "development"
            });
            const html = await renderer.renderToString({url: req.url});
            res.end(html);
        } catch (e) {
            console.log("=======error=======");
            console.log(e);
            res.send(e.toString());
        }
    });
    await initClientServer(ProdServer, ENV);
})();
