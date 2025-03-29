import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { parse } from 'fast-csv';
import { Customer } from '../../entities/customer.entity';
import { Product } from '../../entities/product.entity';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Category } from '../../entities/category.entity';
import { Region } from '../../entities/region.entity';

@Injectable()
export class DataLoaderService {
    private readonly logger = new Logger(DataLoaderService.name);

    constructor(
        @InjectRepository(Customer)
        private readonly customerRepo: Repository<Customer>,
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>,
        @InjectRepository(Order)
        private readonly orderRepo: Repository<Order>,
        @InjectRepository(OrderItem)
        private readonly orderItemRepo: Repository<OrderItem>,
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>,
        @InjectRepository(Region)
        private readonly regionRepo: Repository<Region>,
    ) { }

    /**
     * Load data from a CSV file into the database.
     */
    async loadData(fileName: string): Promise<void> {
        const filePath = `${fileName}`;

        const stream = createReadStream(filePath)
            .pipe(parse({ headers: true }))
            .on('error', (error) => this.logger.error(`Error reading CSV file: ${error.message}`))
            .on('data', async (row) => {
                stream.pause();
                await this.processRow(row);
                stream.resume();
            })
            .on('end', () => this.logger.log(`CSV processing completed for file: ${fileName}`));
    }

    /**
     * Process a single row of the CSV file.
     */
    private async processRow(row: any): Promise<void> {
        try {
            // Validate required fields
            this.validateRow(row);

            // Upsert related entities
            const customer = await this.upsertCustomer(row);
            const product = await this.upsertProduct(row);
            const region = await this.upsertRegion(row);

            // Create order and order items
            const order = await this.createOrder(row, customer, region);
            await this.createOrderItem(row, order, product);
        } catch (error) {
            this.logger.error(`Error processing row with Order ID ${row['Order ID']}: ${error.message}`);
        }
    }

    /**
     * Validate a single row of data.
     */
    private validateRow(row: any): void {
        const requiredFields = ['Order ID', 'Product ID', 'Customer ID', 'Quantity Sold', 'Unit Price', 'Date of Sale'];

        requiredFields.forEach((field) => {
            if (!row[field]) {
                throw new Error(`Missing required field: ${field}`);
            }
        });
    }

    /**
     * Upsert a customer into the database.
     */
    private async upsertCustomer(row: any): Promise<Customer> {
        const customer = this.customerRepo.create({
            customer_id: row['Customer ID'],
            name: row['Customer Name'],
            email: row['Customer Email'],
            address: row['Customer Address'],
        });

        return this.customerRepo.save(customer);
    }

    /**
     * Upsert a product into the database.
     */
    private async upsertProduct(row: any): Promise<Product> {
        let category = await this.categoryRepo.findOne({ where: { name: row.Category } });
        if (!category) {
            category = this.categoryRepo.create({ name: row.Category });
            category = await this.categoryRepo.save(category);
        }

        const product = this.productRepo.create({
            product_id: row['Product ID'],
            name: row['Product Name'],
            category,
            unit_price: parseFloat(row['Unit Price']),
        });

        return this.productRepo.save(product);
    }

    /**
     * Upsert a region into the database.
     */
    private async upsertRegion(row: any): Promise<Region> {
        let region = await this.regionRepo.findOne({ where: { name: row.Region } });
        if (!region) {
            region = this.regionRepo.create({ name: row.Region });
            region = await this.regionRepo.save(region);
        }
        return region;
    }

    /**
     * Create an order in the database.
     */
    private async createOrder(row: any, customer: Customer, region: Region): Promise<Order> {
        const order = this.orderRepo.create({
            order_id: row['Order ID'],
            customer,
            date_of_sale: new Date(row['Date of Sale']),
            payment_method: row['Payment Method'],
            shipping_cost: parseFloat(row['Shipping Cost']),
            region,
        });

        return this.orderRepo.save(order);
    }

    /**
     * Create an order item in the database.
     */
    private async createOrderItem(row: any, order: Order, product: Product): Promise<void> {
        const orderItem = this.orderItemRepo.create({
            order,
            product,
            quantity_sold: parseInt(row['Quantity Sold'], 10),
            unit_price: parseFloat(row['Unit Price']),
            discount: parseFloat(row.Discount || '0'),
        });

        await this.orderItemRepo.save(orderItem);
    }
}
