import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class DateRangeDto {
    @ApiPropertyOptional({ required: false, description: 'Start date of the range' })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiPropertyOptional({ required: false, description: 'End date of the range' })
    @IsOptional()
    @IsDateString()
    endDate?: string;
}
