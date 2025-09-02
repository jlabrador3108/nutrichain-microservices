import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import Product from "./product.persistence.entity";

@Entity()
export default class CategoryFood extends BaseEntity {
  @Column()
  name!: string; // refrigerados, secos, congelados

  @OneToMany(() => Product, (product) => product.categoryFood)
  products!: Product[];
}
