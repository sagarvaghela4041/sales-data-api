import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { OrderItem } from './order-item.entity';

@Entity()
export class Product {
    @PrimaryColumn()
    product_id: string;

    @Column()
    name: string;

    @ManyToOne(() => Category, (category) => category.products)
    category: Category;

    @Column('decimal', { precision: 10, scale: 2 })
    unit_price: number;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    order_items: OrderItem[];
}