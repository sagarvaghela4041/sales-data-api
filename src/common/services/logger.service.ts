import { Injectable } from '@nestjs/common';
import { createLogger, format, transports } from 'winston';

@Injectable()
export class LoggerService {
    private logger;

    constructor() {
        this.logger = createLogger({
            level: 'info',
            format: format.combine(
                format.timestamp(),
                format.json(),
            ),
            transports: [
                new transports.Console(),
                new transports.File({ filename: 'logs/data-refresh.log', maxsize: 1024 * 1024 * 10, maxFiles: 5 }),
            ],
        });
    }

    log(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }
}
