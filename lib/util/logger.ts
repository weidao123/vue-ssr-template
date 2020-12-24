import {Config} from "../core/config";

const Console = require("console").Console;
const fs = require("fs");
const path = require("path");

const {logDir} = Config.getConfig();
const logPath = path.resolve(process.cwd(), logDir, "web.log");
const errPath = path.resolve(process.cwd(), logDir, "err.log");
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const options = {
    flags: 'a',     // append模式
    encoding: 'utf8',
};

const stdout = fs.createWriteStream(logPath, options);
const stderr = fs.createWriteStream(errPath, options);

const logger = new Console({stdout, stderr });

type LoggerLevel = "INFO" | "DEBUG" | "ERROR" | "WARNING";

function getLogContent(level: LoggerLevel, msg: string) {
    const d = new Date();
    const time = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours() + 1}:${d.getMinutes()}:${d.getSeconds()}`;
    return `> [${level}] [${time}] ${msg}`;
}

/**
 * 日志记录
 */
export default class Logger {

    public static warning(str: string) {
        const msg = getLogContent("WARNING", str);
        logger.warn('\x1B[33m%s\x1B[0m', msg);
    }

    public static info(str: string) {
        const msg = getLogContent("INFO", str);
        logger.warn(msg);
    }

    public static debug(str: string) {
        const msg = getLogContent("DEBUG", str);
        logger.debug(msg);
    }

    public static error(str: string) {
        const msg = getLogContent("ERROR", str);
        console.error("\x1B[31m%s\x1B[0m", msg);
        logger.error("\x1B[31m%s\x1B[0m", msg);
    }
}
