import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Customer {
    @PrimaryColumn()
    customer_id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    address: string;

    @OneToMany(() => Order, (order) => order.customer)
    orders: Order[];
}
