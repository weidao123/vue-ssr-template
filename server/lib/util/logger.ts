export default class Logger {
    public static warning(str: string) {
        console.warn('\x1B[33m%s\x1B[0m', `[WARNING] ${str}`);
    }

    public static info(str: string) {
        console.log(`[INFO] ${str}`);
    }
}
