import { Command, CommandRunner } from 'nest-commander';
import { DataLoaderService } from './data-loader.service';

@Command({
    name: 'load-data',
    arguments: '<file-path>',
    description: 'Load CSV data into the database',
})
export class DataLoaderCommand extends CommandRunner {
    constructor(private readonly dataLoaderService: DataLoaderService) {
        super(); // Ensure proper initialization of the parent class
    }

    async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        const [filePath] = passedParams;
        if (!filePath) {
            throw new Error('File path must be provided.');
        }

        try {
            await this.dataLoaderService.loadData(filePath);
            console.log('Data successfully loaded from:', filePath);
        } catch (error) {
            console.error('Error loading data:', error.message);
        }
    }
}
