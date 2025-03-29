import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { DataLoaderService } from './data-loader.service';

@Controller('data-loader')
export class DataLoaderController {
    constructor(private readonly dataLoaderService: DataLoaderService) { }

    @Get('load-data')
    async loadData(@Query('fileName') fileName: string, @Res() res: Response) {
        if (!fileName) {
            return res.status(400).send('File name is required.');
        }

        try {
            await this.dataLoaderService.loadData(fileName);
            return res.status(200).send(`Data successfully loaded from: ${fileName}`);
        } catch (error) {
            return res.status(500).send(`Error loading data: ${error.message}`);
        }
    }
}
