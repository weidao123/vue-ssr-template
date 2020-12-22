import {Autowrite, Service} from "../../lib";
import FrontService from "./FrontService";

@Service()
export default class UserService {

    @Autowrite()
    public front: FrontService;

    public getName(): string {
        return "weidao";
    }
}
