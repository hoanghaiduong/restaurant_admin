import { DateTimeEntity } from "src/common/entities/DateTime.entity";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lobby extends DateTimeEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
}
