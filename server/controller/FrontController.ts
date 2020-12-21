import {Controller, PathVariable, Req, RequestMapping, RequestMethod, Res} from "../lib/decorate";

@Controller({ path: "/front" })
export default class FrontController {

    @RequestMapping({path: "/list" })
    public list() {
        return "hello list";
    }

    @RequestMapping({path: "/:id", method: RequestMethod.PUT })
    public update(@Req req, @Res res, @PathVariable("id") id) {
        return {
            msg: "update success",
            url: req.url,
            id
        };
    }

    @RequestMapping({path: "/user/:id/put/:name" })
    public delete(data: number, @PathVariable("id") id: string, @PathVariable("name") name: string) {
        return { id, name, data: 200 };
    }

}
