import {RequestMethod} from "./decorate";

interface ContainerValue {
    instance: Object;
    func: Function;
    method: RequestMethod;
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

    public get (k: string): ContainerValue {
        return this.container.get(k);
    }
}

export default new Container();
