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

    public get (k: string, method: RequestMethod): ContainerValue {

        const value = this.container.get(k);
        if (value && value.method === method) {
            return value;
        }

        const entries = this.container.entries();
        let next = entries.next();
        while (!next.done) {
            const value  = next.value[1] as ContainerValue;
            if (value
                && value.method === method
                && value.rules
                && value.rules.test(k)) {
                return value;
            }
            next = entries.next();
        }
        return null;
    }

}

export default new Container();
