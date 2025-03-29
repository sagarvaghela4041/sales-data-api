import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class Region {
    @PrimaryGeneratedColumn()
    region_id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Order, (order) => order.region)
    orders: Order[];
}