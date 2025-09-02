import { Entity, Column, ManyToOne, JoinColumn } from "typeorm";
import { BaseEntity } from "../../../common/entities/base.entity";
import UnitMeasurement from "./unit-measurement.persistence.entity";
import CategoryFood from "./category-food.persistence.entity";

@Entity()
export default class Product extends BaseEntity {
  @Column()
  name!: string;

  @Column()
  sku!: string;

  @Column()
  description!: string;

  @Column()
  imageUrl!: string;

  @Column("decimal")
  weight!: number;

  @ManyToOne(() => UnitMeasurement, (unit) => unit.products, { eager: true })
  @JoinColumn({ name: "unitMeasurementId" })
  unitMeasurement!: UnitMeasurement;

  @ManyToOne(() => CategoryFood, (cat) => cat.products, { eager: true })
  @JoinColumn({ name: "categoryFoodId" })
  categoryFood!: CategoryFood;
}
