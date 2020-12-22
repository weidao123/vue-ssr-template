import Loader from "../util/loader";
import Logger from "../util/logger";
import {Application} from "../index";

const path = require("path");
const workDir = process.cwd();

/**
 * App启动程序
 */
function bootstrap() {
    const entry = path.resolve(workDir, "app/application");
    if (Loader.existFile(entry + ".ts") || Loader.existFile(entry + ".js")) {
        import(entry).then(res => {
            const EntryApp = res.default;
            const app = new EntryApp();
            if (app instanceof Application) {
                app.start();
            } else {
                throw new Error("bootstrap class must extends Application class");
            }
        })
    } else {
        Logger.info("running default Application class");
        import("./default").then(res => new res.default().start())
    }
}

bootstrap();
