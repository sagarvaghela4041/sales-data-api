import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from './product.entity';

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, (order) => order.order_items)
    order: Order;

    @ManyToOne(() => Product, (product) => product.order_items)
    product: Product;

    @Column('int')
    quantity_sold: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unit_price: number;

    @Column('decimal', { precision: 3, scale: 2 })
    discount: number;
}
