import { DaySchedule, OpenCloseTime } from "src/common/interface/Open-closeTime";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { TypeOfService } from "src/type-of-service/entities/type-of-service.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class DetailInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'jsonb',
        nullable: true,

    })
    sunday: DaySchedule;

    @Column({
        type: 'jsonb',
        nullable: true
    })
    monday: DaySchedule;
    @Column({
        type: 'jsonb',
        nullable: true
    })
    tuesday: DaySchedule;
    @Column({
        type: 'jsonb',
        nullable: true
    })
    wednesday: DaySchedule;
    @Column({
        type: 'jsonb',
        nullable: true
    })
    thursday: DaySchedule;
    @Column({
        type: 'jsonb',
        nullable: true
    })
    friday: DaySchedule;
    @Column({
        type: 'jsonb',
        nullable: true
    })
    saturday: DaySchedule;

    @Column({
        nullable: false
    })
    keyword_search: string;

    @Column({
        type: 'text',
        nullable: false
    })
    descriptions: string;

    @Column({
        nullable: false
    })
    avatar: string;

    @Column({
        nullable: false
    })
    coverImage: string;

    @Column({
        nullable: false
    })
    facadeImage: string;

    @Column({
        nullable: false,
        array: true,
        type: 'text'
    })
    menuImages: string[];

    //LOẠI HÌNH DỊCH VỤ
    @ManyToMany(() => TypeOfService)
    @JoinTable({
        name: "detail_information_type_of_service", // Tùy chỉnh tên bảng liên kết nhiều-đến-nhiều
        joinColumn: {
            name: "detail_information_id",
        },
        inverseJoinColumn: {
            name: "type_of_service_id",
        },
    })
    typeOfServices: TypeOfService[];

    @OneToOne(() => Restaurant, restaurant => restaurant.detailInformation, { nullable: false })
    @JoinColumn()
    restaurant: Restaurant;
}

