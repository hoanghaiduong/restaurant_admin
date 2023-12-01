import { BadRequestException } from "@nestjs/common";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('representative-information')
export class RepresentativeInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: false,
        nullable: false
    })
    registerType: boolean;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    phoneNumber: string;

    @Column({ nullable: true })
    anotherPhoneNumber: string;

    @Column({
        type: 'text',
        array: true,
        nullable:false
    })
    idCard: string[];

    @Column({
        type: 'text',
        array: true,
    })
    businessRegImages: string[];

    @Column({ nullable: false })
    taxCode: string;

    @Column({
        type: 'text',
        array: true,
        nullable: false
    })
    taxCodeImages: string[];
    @Column({
        type: 'text',
        array: true,
    })
    relatedImages: string[];
    //if it is a company then
    @Column({ nullable: true })
    companyName: string;
    @Column({ nullable: true })
    companyAddress: string;
    @Column({ nullable: true })
    fullNameOfRepresentative: string;

    @BeforeInsert()
    @BeforeUpdate()
    async validateCompanyField(): Promise<void> {
        if (this.registerType) {
            const requiredFields = ['companyName', 'companyAddress', 'fullNameOfRepresentative'];

            for (const field of requiredFields) {
                if (!this[field]) {
                    throw new BadRequestException(`"${field}" là bắt buộc khi registerType là true.`);
                }
            }
        }
    }

    @OneToOne(() => Restaurant, restaurant => restaurant.representativeInformation, { nullable: false,onDelete:'CASCADE' })
    @JoinColumn()
    restaurant: Restaurant;
}
