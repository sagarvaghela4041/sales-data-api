import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from './customer.entity';
import { OrderItem } from './order-item.entity';
import { Region } from './region.entity';

@Entity()
export class Order {
    @PrimaryColumn()
    order_id: string;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @Column({ type: 'date' })
    date_of_sale: Date;

    @Column()
    payment_method: string;

    @Column('decimal', { precision: 10, scale: 2 })
    shipping_cost: number;

    @ManyToOne(() => Region, (region) => region.orders)
    region: Region;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    order_items: OrderItem[];
}