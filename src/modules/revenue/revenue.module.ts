import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueController } from './controllers/revenue.controller';
import { RevenueService } from './services/revenue.service';
import { RevenueRepository } from './repositories/revenue.repository';

@Module({
    imports: [TypeOrmModule.forFeature([])],
    controllers: [RevenueController],
    providers: [RevenueService, RevenueRepository],
})
export class RevenueModule { }
