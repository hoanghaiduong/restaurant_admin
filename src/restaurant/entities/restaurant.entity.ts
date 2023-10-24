import { BusinessModel } from "src/business-model/entities/business-model.entity";
import { Location } from "src/common/interface/locations";
import { RepresentativeInformation } from "src/representative-information/entities/representative-information.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Restaurant {
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

    @ManyToOne(() => BusinessModel)
    businessModel: BusinessModel;

    @OneToOne(() => RepresentativeInformation, { nullable: false, eager: true })
    @JoinColumn()
    prepresentativeInformation: RepresentativeInformation
}
