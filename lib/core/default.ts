/**
 * 默认的实现类
 * 如果没有实现 Application 的类
 * 就会默认使用App作为启动类
 */
import Application from "./application";

export default class App extends Application {
    constructor() {
        super();
    }

    before(app) {}
}