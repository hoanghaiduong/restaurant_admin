import { BusinessModel } from "src/business-model/entities/business-model.entity";
import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Location } from "src/common/interface/locations";
import { DetailInformation } from "src/detail-information/entities/detail-information.entity";
import { Product } from "src/product/entities/product.entity";
import { RepresentativeInformation } from "src/representative-information/entities/representative-information.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()

export class Restaurant extends DateTimeEntity {
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
        type: 'jsonb',

    })
    location: Location

    @Column({
        nullable: false,
        type: 'integer',
        default: 0
    })
    statusGranted: number;//trạng thái đăng ký nhà hàng 0: chưa được chấp nhận, 1 là đã được chấp nhận, 2 là đang chờ xử lý

    @Column({
        nullable: true,
        type: 'integer',
        default: 0
    })
    progress: number


    @Column({
        nullable: true,
        default: false
    })
    disabled: boolean
    @ManyToOne(() => BusinessModel, businessModels => businessModels.restaurants, { nullable: false })
    businessModel: BusinessModel;

    @ManyToOne(() => User, users => users.restaurants, { nullable: false })
    user: User;

    @OneToOne(() => RepresentativeInformation, representativeInformation => representativeInformation.restaurant, { nullable: true })

    representativeInformation: RepresentativeInformation;

    @OneToOne(() => DetailInformation, detailInformation => detailInformation.restaurant, { nullable: true })

    detailInformation: DetailInformation;

    @OneToMany(() => Product, products => products.restaurant, { nullable: true })
    products: Product[];
    @BeforeInsert()
    @BeforeUpdate()
    async checkStatusAndProgress(): Promise<void> {
        // if (this.statusGranted === 1) {//nếu trạng thái đã được
        //     this.progress = 100;
        // }
        // else if()

        // else if (this.representativeInformation !== null && this.detailInformation !== null) {
        //     this.progress = 100;
        //     this.statusGranted = 1;
        // }
        // else if (this.representativeInformation !== null && this.detailInformation === null || this.representativeInformation === null && this.detailInformation !== null) {
        //     this.progress = 50;
        //     this.statusGranted = 0;
        // }

    }
}
