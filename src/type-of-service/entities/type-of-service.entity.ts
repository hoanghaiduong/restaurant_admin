import { BaseEntity } from "src/base/entities/base.entity";
import { BusinessModel } from "src/business-model/entities/business-model.entity";
import { DetailInformation } from "src/detail-information/entities/detail-information.entity";
import { Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class TypeOfService extends BaseEntity {
    @ManyToMany(() => BusinessModel)
    @JoinTable({
        name:'model-service'
    })
    businessModels: BusinessModel[];

    // @ManyToOne(()=>DetailInformation,detailInformations=>detailInformations.typeOfSerivces,{nullable:true})
    // detailInformation: DetailInformation
}
