import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Location } from "src/common/interface/locations";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends DateTimeEntity {

    @PrimaryColumn()
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
    location: Location

    @Column({
        type: 'jsonb',
        nullable: true
    })

    firebase: object;

    @Column({
        nullable: false,
        type: 'integer',
        default: 0
    })
    statusGranted: number;
    @ManyToOne(() => Role, role => role.users, { eager: true, nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    role: Role


    @OneToMany(() => Restaurant, restaurant => restaurant.user)
    restaurants: Restaurant[]
    // @ManyToOne()
    //providerId
}
