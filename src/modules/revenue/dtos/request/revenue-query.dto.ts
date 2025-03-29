import { IsString, IsOptional } from 'class-validator';
import { DateRangeDto } from './date-range.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class RevenueQueryDto extends DateRangeDto {
    @ApiPropertyOptional({ required: false, description: 'ID of the product to filter by' })
    @IsOptional()
    @IsString()
    productId?: string;

    @ApiPropertyOptional({ required: false, description: 'Category name to filter by' })
    @IsOptional()
    @IsString()
    category?: string;

    @ApiPropertyOptional({ required: false, description: 'Region name to filter by' })
    @IsOptional()
    @IsString()
    region?: string;
}
