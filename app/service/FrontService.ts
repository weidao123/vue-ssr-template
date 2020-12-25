import {Service} from "summer-boot";

@Service()
export default class FrontService {
    public getName(): string {
        return "weidao";
    }
}
