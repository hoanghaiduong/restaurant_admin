import { BusinessModel } from "src/business-model/entities/business-model.entity";
import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Location } from "src/common/interface/locations";
import { DetailInformation } from "src/detail-information/entities/detail-information.entity";
import { RepresentativeInformation } from "src/representative-information/entities/representative-information.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Restaurant extends DateTimeEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({
        nullable: false
    })
    type: string;

    @Column()
    street: string;

    @Column({
        nullable: false
    })
    phone: string;

    @Column()
    province: string;

    @Column()
    district: string;

    @Column()
    ward: string;

    @Column()
    houseNumber: string;

    @Column({
        type: 'jsonb'
    })
    location: Location

    @Column({
        nullable: false,
        type: 'integer',
        default: 0
    })
    statusGranted: number;
    
    @Column({
        nullable: true,
        default: false
    })
    disabled: boolean
    @ManyToOne(() => BusinessModel)
    businessModel: BusinessModel;

    @ManyToOne(() => User, users => users.restaurants, { nullable: false })
    user: User;

    @OneToOne(() => RepresentativeInformation, { nullable: true, eager: true })
    @JoinColumn()
    representativeInformation: RepresentativeInformation;

    @OneToOne(() => DetailInformation, { nullable: true, eager: true })
    @JoinColumn()
    detailInformation: DetailInformation;
}
