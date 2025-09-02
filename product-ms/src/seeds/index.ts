import "reflect-metadata";
import { AppDataSource } from "../common/data-access/data-source";
import { seedCategoryFood } from "./category-food.seed";
import { seedUnitMeasurement } from "./unit-measurement.seed";
import { seedProduct } from "./product.seed";

const runSeeds = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    await seedCategoryFood();
    await seedUnitMeasurement();
    await seedProduct();

    console.log("All seeds executed successfully");
    await AppDataSource.destroy();
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

runSeeds();
