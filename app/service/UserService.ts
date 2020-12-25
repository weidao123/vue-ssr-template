import {Autowrite, Service} from "summer-boot";
import FrontService from "./FrontService";

@Service()
export default class UserService {

    @Autowrite()
    public front: FrontService;

    public getName(): string {
        return "weidao";
    }
}
