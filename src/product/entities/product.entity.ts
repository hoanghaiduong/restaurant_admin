import { Category } from 'src/categories/entities/category.entity';
import { DateTimeEntity } from 'src/common/entities/DateTime.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Product extends DateTimeEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: true
    })
    description: string;

    @Column('decimal', { precision: 5, scale: 2 })
    price: number;

    @Column({
        nullable: false
    })
    photo: string;
    @Column({
        type: 'text',
        array: true,
        nullable: true
    })
    images: string[];

    @ManyToOne(() => Category, category => category.products, { nullable: false })
    category: Category;

    @ManyToOne(() => Restaurant, restaurants => restaurants.products, { nullable: false })
    restaurant: Restaurant;

}
