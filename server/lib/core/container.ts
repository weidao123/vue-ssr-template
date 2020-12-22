import {RequestMethod} from "./decorate";

interface ContainerValue {
    instance: Object;
    func: Function;
    method: RequestMethod;
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

                // 路径模糊匹配
                const path = next.value[0];
                if (path.endsWith("/*")) {
                    const part = path.replace("/*", "");
                    if (path.startsWith(part)) {
                        return value;
                    }
                }
            }

            next = entries.next();
        }
        return null;
    }

}

export default new Container();
