import Container from "./container";

import {Request, Response} from "express";

/**
 * 调用
 */
export async function invoke(req: Request, res: Response) {
    const value = Container.get(req.url);
    if (!value || value.method !== req.method.toUpperCase()) {
        res.status(404);
        res.send("404");
    } else {
        const data = await value.func.call(value.instance);
        res.send(data);
    }
}
