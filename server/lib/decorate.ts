import "reflect-metadata";

export enum MetaKey {
    CONTROLLER = "CONTROLLER",
    METHOD = "METHOD",
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
    path: string;
}

export interface MethodOptions {
    path: string;
    method?: RequestMethod;
}

/**
 * 控制器
 */
export function Controller(options: ControllerOptions) {
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
