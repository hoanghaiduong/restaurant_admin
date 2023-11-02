import { BusinessModel } from "src/business-model/entities/business-model.entity";
import { DaySchedule, OpenCloseTime } from "src/common/interface/Open-closeTime";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { TypeOfService } from "src/type-of-service/entities/type-of-service.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DetailInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'jsonb',
    })
    sunday: DaySchedule;

    @Column({
        type: 'jsonb',
    })
    monday: DaySchedule;
    @Column({
        type: 'jsonb',
    })
    tuesday: DaySchedule;
    @Column({
        type: 'jsonb',
    })
    wednesday: DaySchedule;
    @Column({
        type: 'jsonb',
    })
    thursday: DaySchedule;
    @Column({
        type: 'jsonb',
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
    descriptionS: string;

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
    restaurant: Restaurant;
    //sản phẩm đặc trưng (đồ ăn/đồ uống)
    // featuredProducts:Produc
}
