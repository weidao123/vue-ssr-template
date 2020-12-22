/**
 * 日志记录
 */
export default class Logger {
    public static warning(str: string) {
        console.warn('\x1B[33m%s\x1B[0m', `> [WARNING] ${str}`);
    }

    public static info(str: string) {
        console.log(`> [INFO] ${str}`);
    }

    public static error(str: string) {
        console.error("\x1B[31m%s\x1B[0m", `> [ERROR] ${str}`);
    }
}