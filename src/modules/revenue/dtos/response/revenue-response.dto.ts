import { ApiProperty } from "@nestjs/swagger";

export class RevenueResponseDto {
    @ApiProperty({ example: 123, description: 'Total revenue' })
    totalRevenue: number;
}
