import "reflect-metadata";
import {ControllerOptions, MetaKey, MethodOptions} from "../core/decorate";
import Container from "../core/container";
import {Logger} from "../index";
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
                const controller = Reflect.hasMetadata(MetaKey.CONTROLLER, fun);
                const service = Reflect.hasMetadata(MetaKey.SERVICE, fun);
                if (controller) {
                    this.parseController(fun);
                }
                if (service) {
                    this.parseService(fun);
                }
            }
            next = entries.next();
        }
    }

    /**
     * 解析Service注入
     */
    public static parserAutowrite() {
        Container.findAll((k, value) => {
            if (k.startsWith("SERVICE")) {
                this.inject(value.instance);
            }
        })
    }

    /**
     * 服务注入
     * @param target
     */
    private static inject(target: Object) {
        const fields = Reflect.ownKeys((target as any).__proto__);
        for (const name of fields) {
            if (
                typeof target[name] !== "function" &&
                Reflect.hasMetadata(MetaKey.INJECT, target, name as string)
            ) {
                if (typeof name !== "string") return;
                const type = Reflect.getMetadata("design:type", target, name);
                let server = null;
                if (type && type !== Object) {
                    // by type
                    server = Container.getByType(type);
                } else {
                    // by name
                    server = Container.getByName(name);
                }

                if (!server) {
                    Logger.error(`inject fail: ${name}, not find server`);
                } else {
                    Logger.info(`inject success: ${server.constructor.name} -> ${target.constructor.name}:${name}`);
                    target[name] = server;
                }
            }
        }
    }

    /**
     * 将Service注入容器
     */
    private static serviceCount = 0;
    private static parseService(fun: Constructor) {
        Container.add(`SERVICE_${this.serviceCount}`, {
            instance: new fun(),
            func: fun,
        });
        this.serviceCount++;
    }

    /**
     * 解析控制器的装饰器 添加到容器
     * @param fun
     */
    private static parseController(fun: Constructor) {
        const metadata = Reflect.getMetadata(MetaKey.CONTROLLER, fun) as ControllerOptions;
        const target = new fun();
        Reflect.ownKeys(target.__proto__).forEach(value => {
            if (
                typeof target[value] === "function"
                && Reflect.hasMetadata(MetaKey.METHOD, target[value])
            ) {
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
        this.inject(target);
    }
}
