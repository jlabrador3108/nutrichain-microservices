import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import Product from "./product.persistence.entity";

@Entity()
export default class UnitMeasurement extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  abbreviation!: string; // Ej: "kg", "L"

  @OneToMany(() => Product, (product) => product.unitMeasurement)
  products!: Product[];
}
