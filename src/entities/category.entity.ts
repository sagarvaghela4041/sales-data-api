import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    category_id: number;

    @Column({ unique: true })
    name: string;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];
}