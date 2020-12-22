import {Service} from "../../lib";

@Service()
export default class FrontService {
    public getName(): string {
        return "weidao";
    }
}
