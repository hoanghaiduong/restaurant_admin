import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends DateTimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    actived: boolean;

    @OneToMany(() => User, users => users.role,{onDelete:'SET NULL'})
    users: User[];
}
