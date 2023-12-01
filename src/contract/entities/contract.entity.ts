import { Lobby } from "src/lobby/entities/lobby.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Contract {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    bride: string

    @Column()
    groom: string

    @Column({
        type: 'date',
    })
    startDate: string

    @Column({
        type: 'date',
    })
    endDate: string;

    @Column({ nullable: false })
    numberOfTables: number;

    @Column({
        nullable: false
    })
    numberOfSpareTable: number;

    @Column({
        type: 'text',
        array: true
    })
    productIds: string[];
    @ManyToOne(() => Lobby, lobbies => lobbies.contracts, { nullable: false })
    lobby: Lobby
}
