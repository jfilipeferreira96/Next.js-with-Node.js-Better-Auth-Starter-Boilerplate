import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";

class Logger {
  private static instance: winston.Logger;

  static {
    
    const logsDir = "logs";
    if (!fs.existsSync(logsDir)) {
      fs.mkdirSync(logsDir);
    }

    winston.addColors({
      error: "red bold",
      warn: "yellow bold",
      info: "blue bold",
      http: "magenta",
      debug: "gray",
    });

    this.instance = winston.createLogger({
      level: process.env.NODE_ENV === "production" ? "info" : "debug",
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.errors({ stack: true }),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          return stack ? `[${timestamp}] ${level}: ${message}\n${stack}` : `[${timestamp}] ${level}: ${message}`;
        })
      ),
      transports: [
        // Log de erros
        new DailyRotateFile({
          filename: "logs/error-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          level: "error",
          maxSize: "20m",
          maxFiles: "14d",
        }),
        // Log combinado
        new DailyRotateFile({
          filename: "logs/combined-%DATE%.log",
          datePattern: "YYYY-MM-DD",
          maxSize: "20m",
          maxFiles: "14d",
        }),
      ],
    });

    this.instance.add(
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.printf(({ level, message, timestamp }) => {
            return `[${timestamp}] ${level}: ${message}`;
          })
        ),
      })
    );
  }

  static info(message: string, meta?: any) {
    this.instance.info(message, meta);
  }

  static error(message: string, error?: any) {
    this.instance.error(message, error instanceof Error ? { stack: error.stack } : error);
  }

  static warn(message: string, meta?: any) {
    this.instance.warn(message, meta);
  }

  static debug(message: string, meta?: any) {
    this.instance.debug(message, meta);
  }

  static http(message: string, meta?: any) {
    this.instance.http(message, meta);
  }
}

export default Logger;
