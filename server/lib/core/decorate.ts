import "reflect-metadata";

export enum MetaKey {
    CONTROLLER = "CONTROLLER",
    METHOD = "METHOD",
    METHOD_PARAM = "METHOD_PARAM",
    REQUEST = "REQUEST",
    RESPONSE = "RESPONSE",
    QUERY = "QUERY",
    BODY = "BODY",
    SERVICE = "SERVICE",
}

export enum RequestMethod {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH",
    OPTION = "OPTION",
}

export interface ControllerOptions {
    path?: string;
}

export interface MethodOptions {
    path: string;
    method?: RequestMethod;
}

/**
 * 控制器
 */
export function Controller(options: ControllerOptions = {}) {
    options.path = options.path || "/";
    return function (target: Function) {
        Reflect.defineMetadata(MetaKey.CONTROLLER, options, target);
    }
}

/**
 * 方法装饰器
 * @constructor
 */
export function RequestMapping(options: MethodOptions) {
    options.method = options.method || RequestMethod.GET;
    return function (target: Object, name: string, desc: any) {
        Reflect.defineMetadata(MetaKey.METHOD, options, target[name]);
    }
}

/**
 * 参数装饰器
 * @constructor
 */
export function PathVariable(key: string) {
    return function (target: Object, name: string, index: number) {
        const metadata = Reflect.getMetadata(MetaKey.METHOD_PARAM, target[name]);
        let arr = [{ index, key }];
        if (metadata && Array.isArray(metadata)) {
            arr = arr.concat(metadata)
        }
        Reflect.defineMetadata(MetaKey.METHOD_PARAM, arr, target[name])
    }
}

/**
 * 注入request
 * @constructor
 */
export function Req(target: Object, name: string, index: number) {
    Reflect.defineMetadata(MetaKey.REQUEST, { index }, target[name]);
}

/**
 * 注入response
 * @constructor
 */
export function Res(target: Object, name: string, index: number) {
    Reflect.defineMetadata(MetaKey.RESPONSE, { index }, target[name]);
}

/**
 * 注入query参数
 * @constructor
 */
export function Query(target: Object, name: string, index: number) {
    Reflect.defineMetadata(MetaKey.QUERY, { index }, target[name]);
}

/**
 * 注入body参数
 * @constructor
 */
export function Body(target: Object, name: string, index: number) {
    Reflect.defineMetadata(MetaKey.BODY, { index }, target[name]);
}
