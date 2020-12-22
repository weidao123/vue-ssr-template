import {Controller, Req, RequestMapping} from "../lib";

const path = require("path");
const ServerRender = require("vue-server-renderer");
const ClientConf = require("../../config/webpack.client");
const {getServerBundle} = require("../util/BundleUtil");
const {getClientBundle} = require("../util/BundleUtil");
const fs = require("fs");
const dev = require("../util").isDev();

@Controller()
export default class FrontController {

    @RequestMapping({path: "*" })
    public async index(@Req req) {
        const output = ClientConf.output.path;
        const templatePath = dev ? path.join(__dirname, "../../index.html") : (output + "/index.html");
        const template = fs.readFileSync(templatePath, "utf-8");
        const serverBundle = await getServerBundle();
        const clientBundle = await getClientBundle();
        try {
            const renderer = ServerRender.createBundleRenderer(serverBundle, {
                clientManifest: clientBundle,
                template,
                runInNewContext: false,
                inject: true
            });
            return await renderer.renderToString({url: req.url});
        } catch (e) {
            return e.toString();
        }
    }
}
