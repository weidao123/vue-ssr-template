import {Controller, RequestMapping} from "../lib/decorate";

@Controller({ path: "/front" })
export default class FrontController {

    @RequestMapping({path: "/list" })
    public list() {
        return "hello list";
    }
}
