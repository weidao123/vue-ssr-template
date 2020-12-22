import "reflect-metadata";
import {ControllerOptions, MetaKey, MethodOptions} from "../core/decorate";
import Container from "../core/container";
const path = require("path");

type Constructor = { new (...args) }

/**
 * 解析装饰器到容器里
 */
export default class ParserDecorate {

    public static parser(map: Map<string, Function>) {
        const entries = map.entries();
        let next = entries.next();
        while (!next.done) {
            const fun = next.value[1];
            if (typeof fun === "function") {
                const hasMetadata = Reflect.hasMetadata(MetaKey.CONTROLLER, fun);
                if (hasMetadata) {
                    this.parseController(fun);
                }
            }
            next = entries.next();
        }
    }

    /**
     * 解析控制器的装饰器 添加到容器
     * @param fun
     */
    private static parseController(fun: Constructor) {
        const metadata = Reflect.getMetadata(MetaKey.CONTROLLER, fun) as ControllerOptions;
        const target = new fun();
        Reflect.ownKeys(target.__proto__).forEach(value => {
            if (Reflect.hasMetadata(MetaKey.METHOD, target[value])) {
                const methodOpt = Reflect.getMetadata(MetaKey.METHOD, target[value]) as MethodOptions;
                const url = path.join(metadata.path, methodOpt.path).replace(/\\/g, "/");

                // 解析path参数key
                // params: {key: index} key: 参数名称 index: 参数的位置
                const params = {};
                const match = url.match(/\/:?\w+/g);
                let newUrl = url;
                if (match) {
                    match.forEach((str, index) => {
                        if (str.startsWith("/:")) {
                            const name = str.replace("/:", "");
                            newUrl = newUrl.replace(name, "\\w+").replace(":", "");
                            params[name] = index;
                        }
                    });
                }

                // path参数的匹配规则
                const rules = new RegExp("^" + newUrl.replace(/\//g, "\\/") + "$");
                const not = url.indexOf(":") === -1;
                Container.add(url, {
                    instance: target,
                    func: target[value],
                    method: methodOpt.method,
                    rules: not ? undefined : rules,
                    params,
                });
            }
        });
    }
}
