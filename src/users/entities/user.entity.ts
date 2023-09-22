import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Location } from "src/common/interface/locations";
import { Role } from "src/roles/entities/role.entity";
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
    locations: Location[]

    @Column({
        type: 'jsonb',
        nullable: true
    })

    firebase: object;

    @ManyToOne(() => Role, role => role.users, { onDelete: 'SET NULL' })
    role: Role

    // @ManyToOne()
    //providerId
}
