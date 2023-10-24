import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Location } from "src/common/interface/locations";
import { Role } from "src/roles/entities/role.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(() => Role, role => role.users, { eager: true, nullable: true, onDelete: "SET NULL", onUpdate: "CASCADE" })
    role: Role

    // @ManyToOne()
    //providerId
}
