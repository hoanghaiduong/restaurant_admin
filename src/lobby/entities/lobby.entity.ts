import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lobby extends DateTimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;


    @Column({
        nullable: true
    })
    description: string;

    @Column()
    maxOfNumberTable: number;


    @Column({
        nullable: true
    })
    numberOfFloors: number;

    @Column({
        nullable: true
    })
    photo: string;

    @Column({
        nullable: true,
        type: 'text',
        array: true
    })
    images: string;

    @Column({
        nullable: true
    })
    acreage: string;

    @ManyToOne(() => Restaurant, restaurant => restaurant.lobbies, { nullable: false })
    restaurant: Restaurant;
}
