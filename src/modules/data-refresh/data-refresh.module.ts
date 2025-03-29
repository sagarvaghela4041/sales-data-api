import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { DataRefreshService } from './data-refresh.service';
import { DataLoaderService } from '../data-loader/data-loader.service';
import { LoggerService } from '../../common/services/logger.service';
import { DataLoaderModule } from '../data-loader/data-loader.module';

@Module({
    imports: [ScheduleModule.forRoot(), DataLoaderModule],
    providers: [DataRefreshService, DataLoaderService, LoggerService],
}) export class DataRefreshModule { }
