import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { DataLoaderModule } from './modules/data-loader/data-loader.module';
import { DataRefreshModule } from './modules/data-refresh/data-refresh.module';
import { RevenueModule } from './modules/revenue/revenue.module';

@Module({
  imports: [
    DatabaseModule,
    DataLoaderModule,
    DataRefreshModule,
    RevenueModule
  ],
})
export class AppModule { }
