import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends DateTimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    uid: string;

    @Column({
        nullable: true
    })
    email: string;

    @Column({
        nullable: true
    })
    displayName: string;

    @Column({
        nullable: true
    })
    photoURL: string;

    @Column({
        default: false,
    })
    emailVerified: boolean;

    @Column({
        default: false,
    })
    disabled: boolean;

    @Column({
        type: 'jsonb',
        nullable: true
    })
    locations: {
        lat: number;
        lng: number;
        point: number;
    };
    @Column({
        type: 'jsonb',
        nullable: true
    })
    firebase: object;
    // @ManyToOne()
    //roleId

    // @ManyToOne()
    //providerId
}
