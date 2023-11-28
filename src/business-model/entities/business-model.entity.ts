import { BaseEntity } from "src/base/entities/base.entity";
import { Restaurant } from "src/restaurant/entities/restaurant.entity";
import { TypeOfService } from "src/type-of-service/entities/type-of-service.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BusinessModel extends BaseEntity {
    @OneToMany(() => Restaurant, restaurant => restaurant.businessModel, { nullable: true })
    restaurants: Restaurant[];
    @ManyToMany(() => TypeOfService)
    @JoinTable({
        name: 'model-service'
    })
    typeOfServices: TypeOfService[];
}
