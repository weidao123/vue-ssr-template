import {RequestMethod} from "./decorate";
import PathToRegexp from "path-to-regexp";

interface ContainerValue {
    instance: Object;
    func: Function;
    method?: RequestMethod;
    rules?: RegExp | undefined;
    params?: object | undefined;
}

/**
 * 容器
 */
class Container {
    private readonly container: Map<string, ContainerValue> = new Map();

    public add (k: string, v: ContainerValue) {
        this.container.set(k ,v);
    }

    public remove (k: string) {
        this.container.delete(k);
    }

    public hasKey(k: string) {
        return this.container.has(k);
    }

    public get (k: string, method: RequestMethod): ContainerValue {

        const value = this.container.get(k);
        if (value && value.method === method) {
            return value;
        }

        const entries = this.container.entries();
        let next = entries.next();
        while (!next.done) {
            const value  = next.value[1] as ContainerValue;
            if (value && value.method === method) {
                if (value.rules && value.rules.test(k)) {
                    return value;
                }
            }
            next = entries.next();
        }
        return null;
    }

    public findAll(call: (key: string, value: ContainerValue) => boolean | void) {
        const entries = this.container.entries();
        let next = entries.next();
        while (!next.done) {
            const state = call(next.value[0], next.value[1]);
            if (!state) {
                next = entries.next();
            } else {
                break;
            }
        }
    }

    public getByType(server: Function) {
        const entries = this.container.entries();
        let next = entries.next();
        while (!next.done) {
            const value = next.value[1] as ContainerValue;
            if (value.instance instanceof server) {
                return value.instance;
            }
            next = entries.next();
        }
        return null;
    }

    public getByName(name: string) {
        let res = null;
        this.findAll((k, value) => {
            if (value.instance.constructor.name === name) {
                res = value.instance;
                return true;
            }
        });
        return res;
    }
}

/**
 * 只暴露操作容器的方法，不直接对外暴露container属性
 */
function getContainer() {
    const box = new Container();
    const keys = Object.keys((box as any).__proto__);
    const res = {};

    keys.forEach(k => res[k] = box[k].bind(box));
    return res;
}

export default getContainer() as Container;
