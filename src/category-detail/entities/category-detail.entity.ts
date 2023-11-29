import { BaseEntity } from "src/base/entities/base.entity";
import { Category } from "src/categories/entities/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryDetail extends BaseEntity {

    // @ManyToOne(() => Category, category => category.categoryDetails)
    // category: Category;
}
