import winston from 'winston';

//2025-10-05T12:00:00.000Z [ERROR]: Error al obtener los productos
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
})

const customLevels = {
    error: 0,
    warning: 1,
    info: 2,
    debug: 3,
}

const logger = winston.createLogger({
    levels: customLevels,
    format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        logFormat
    ),
    transports: [
        new winston.transports.Console({ level: "debug" }),
        new winston.transports.File({ filename: "logs/error.log", level: "warning"})
    ]
})

export default logger;