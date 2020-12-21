import Container from "./container";

import {Request, Response} from "express";
import {MetaKey, RequestMethod} from "./decorate";

/**
 * 调用
 */
export async function invoke(req: Request, res: Response) {
    const value = Container.get(req.url, req.method.toUpperCase() as RequestMethod);
    if (value && value.method === req.method.toUpperCase()) {
        const args = [];

        // 获取path参数传递给方法
        if (value.params) {
            const params = {};
            const split = req.url.split("/").slice(1);
            Object.keys(value.params).forEach(key => params[key] = split[value.params[key]]);
            const metadata = Reflect.getMetadata(MetaKey.METHOD_PARAM, value.func);
            metadata && metadata.forEach(item => args[item.index] = params[item.key]);
        }

        // 注入Request | Response
        const resData = Reflect.getMetadata(MetaKey.RESPONSE, value.func);
        const reqData = Reflect.getMetadata(MetaKey.REQUEST, value.func);
        if (reqData) {
            args[reqData.index] = req;
        }
        if (resData) {
            args[resData.index] = res;
        }

        const data = await value.func.call(value.instance, ...args);
        res.send(data);
        return;
    }

    res.status(404);
    res.send("404");
}
