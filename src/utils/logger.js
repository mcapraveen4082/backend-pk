const winston = require('winston');
const path = require('path');

// Create a logger instance
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
            filename: path.join('logs', 'error.log'), 
            level: 'error' 
        }),
        new winston.transports.DailyRotateFile({
            filename: path.join('logs', '%DATE%.log'),
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '10d'
        })
    ]
});

module.exports = logger;

