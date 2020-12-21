const fs = require("fs");
const {resolve} = require("path");

/**
 * Loader 加载器， 用于加载Service、Controller、Middleware等
 */
export default class Loader {

    /**
     * 加载指定目录的default导出
     * @param path
     */
    public static load(path: string) {
        const exist = fs.existsSync(path);
        const modules: Map<string, Function> = new Map<string, Function>();
        if (!exist) {
            throw new Error(`${path} is not exist`);
        }

        // 文件夹...
        if (fs.statSync(path).isDirectory()) {
            const files = fs.readdirSync(path);
            files.forEach(name => {
                const entries = Loader.load(resolve(path, name)).entries();
                let next = entries.next();
                while (!next.done) {
                    modules.set(next.value[0], next.value[1]);
                    next = entries.next();
                }
            });
            return modules;
        }

        const controller = require(path);
        if (!controller.default) {
            console.warn(`${path} is not load`);
        } else {
            console.log(`${path} load`);
            modules.set(path, controller.default);
        }
        return modules;
    }
}
