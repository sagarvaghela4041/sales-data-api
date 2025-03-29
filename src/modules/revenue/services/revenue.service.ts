import { Injectable } from '@nestjs/common';
import { RevenueRepository } from '../repositories/revenue.repository';

@Injectable()
export class RevenueService {
    constructor(private readonly revenueRepository: RevenueRepository) { }

    async calculateTotalRevenue(query: any): Promise<number> {
        return this.revenueRepository.calculateTotalRevenue(query);
    }

    async calculateTotalRevenueByProduct(query: any): Promise<any[]> {
        return this.revenueRepository.calculateTotalRevenueByProduct(query);
    }

    async calculateTotalRevenueByCategory(query: any): Promise<any[]> {
        return this.revenueRepository.calculateTotalRevenueByCategory(query);
    }

    async calculateTotalRevenueByRegion(query: any): Promise<any[]> {
        return this.revenueRepository.calculateTotalRevenueByRegion(query);
    }

    async calculateRevenueTrends(query: any): Promise<any[]> {
        return this.revenueRepository.calculateRevenueTrends(query);
    }
}
