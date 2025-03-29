import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { DataLoaderService } from '../data-loader/data-loader.service';
import { LoggerService } from '../../common/services/logger.service';

@Injectable()
export class DataRefreshService {
    constructor(
        private readonly dataLoaderService: DataLoaderService,
        private readonly logger: LoggerService,
    ) { }

    @Cron(CronExpression.EVERY_DAY_AT_2AM) // Runs every day at 2 AM
    async handleDailyRefresh() {
        this.logger.log('Starting daily data refresh...');

        try {
            await this.dataLoaderService.loadData('data.csv'); // Adjust the file name as needed
            this.logger.log('Data refresh completed successfully.');
        } catch (error) {
            this.logger.error(`Data refresh failed: ${error.message}`);
        }
    }
}
