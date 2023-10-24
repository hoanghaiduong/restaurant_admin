import { BusinessModel } from "src/business-model/entities/business-model.entity";
import { DaySchedule, OpenCloseTime } from "src/common/interface/Open-closeTime";
import { TypeOfService } from "src/type-of-service/entities/type-of-service.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column()
    avatar: string;

    @Column()
    coverImage: string;

    @Column()
    facadeImage: string;

    //LOẠI HÌNH DỊCH VỤ
    @OneToMany(() => TypeOfService, typeOfServices => typeOfServices)
    typeOfSerivces: TypeOfService[];
    
    //sản phẩm đặc trưng (đồ ăn/đồ uống)
    // featuredProducts:Produc
}
