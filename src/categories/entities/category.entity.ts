import { BaseEntity } from "src/base/entities/base.entity";
import { CategoryDetail } from "src/category-detail/entities/category-detail.entity";
import { Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category extends BaseEntity{
    @OneToMany(() => CategoryDetail, subCategory => subCategory.category)
    categoryDetails: CategoryDetail[];
}
