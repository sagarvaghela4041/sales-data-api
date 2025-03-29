import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderService } from './data-loader.service';
import { Customer } from '../../entities/customer.entity';
import { Product } from '../../entities/product.entity';
import { Order } from '../../entities/order.entity';
import { OrderItem } from '../../entities/order-item.entity';
import { Category } from '../../entities/category.entity';
import { Region } from '../../entities/region.entity';
import { TransactionService } from '../../common/services/transaction.service';
import { DataLoaderController } from './data-loader.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer, Product, Order, OrderItem, Category, Region]),
    ],
    providers: [DataLoaderService, TransactionService],
    controllers: [DataLoaderController],
    exports: [TypeOrmModule],
})
export class DataLoaderModule { }
