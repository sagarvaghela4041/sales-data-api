import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RevenueService } from '../services/revenue.service';
import { RevenueQueryDto } from '../dtos/request/revenue-query.dto';
import { RevenueResponseDto } from '../dtos/response/revenue-response.dto';

@ApiTags('Revenue')
@Controller('revenue')
export class RevenueController {
    constructor(private readonly revenueService: RevenueService) { }

    @Get('total')
    async getTotalRevenue(@Query() query: RevenueQueryDto): Promise<RevenueResponseDto> {
        const totalRevenue = await this.revenueService.calculateTotalRevenue(query);
        return { totalRevenue };
    }

    @Get('by-product')
    async getTotalRevenueByProduct(@Query() query: RevenueQueryDto): Promise<any[]> {
        return await this.revenueService.calculateTotalRevenueByProduct(query);
    }

    @Get('by-category')
    async getTotalRevenueByCategory(@Query() query: RevenueQueryDto): Promise<any[]> {
        return await this.revenueService.calculateTotalRevenueByCategory(query);
    }

    @Get('by-region')
    async getTotalRevenueByRegion(@Query() query: RevenueQueryDto): Promise<any[]> {
        return await this.revenueService.calculateTotalRevenueByRegion(query);
    }

    @Get('trends')
    async getRevenueTrends(@Query() query: RevenueQueryDto): Promise<any[]> {
        return await this.revenueService.calculateRevenueTrends(query);
    }
}
