import { AppDataSource } from "../common/data-access/data-source";
import CategoryFood from "../modules/product/models/category-food.persistence.entity";
import Product from "../modules/product/models/product.persistence.entity";
import UnitMeasurement from "../modules/product/models/unit-measurement.persistence.entity";

export const seedProduct = async () => {
  try {
    const productRepo = AppDataSource.getRepository(Product);
    const categoryRepo = AppDataSource.getRepository(CategoryFood);
    const unitRepo = AppDataSource.getRepository(UnitMeasurement);

    const fruitsCategorySeco = await categoryRepo.findOne({
      where: { name: "secos" },
    });
    const kgUnitKg = await unitRepo.findOne({ where: { abbreviation: "kg" } });

    if (!fruitsCategorySeco || !kgUnitKg) {
      throw new Error(
        "CategoryFood: seco or UnitMeasurement: kg not found. Run seeds in order."
      );
    }

    const fruitsCategoryRef = await categoryRepo.findOne({
      where: { name: "refrigerados" },
    });
    const kgUnitL = await unitRepo.findOne({ where: { abbreviation: "l" } });

    if (!fruitsCategoryRef || !kgUnitL) {
      throw new Error(
        "CategoryFood: congelados or UnitMeasurement: l not found. Run seeds in order."
      );
    }

    const products = [
      {
        name: "Manzana",
        description: "Manzanas frescas",
        sku: "manzana-001",
        weight: 1,
        categoryFood: fruitsCategorySeco,
        unitMeasurement: kgUnitKg,
        imageUrl: "https://example.com/apple.jpg",
      },
      {
        name: "Pollo",
        description: "Pollo congelado",
        sku: "pollo-001",
        weight: 5,
        categoryFood: fruitsCategoryRef,
        unitMeasurement: kgUnitL,
        imageUrl: "https://example.com/banana.jpg",
      },
    ];

    const existingProducts = await productRepo.find({
      where: products.map((p) => ({ sku: p.sku })),
    });
    const existingSkus = existingProducts.map((p) => p.sku);

    const newProducts = products.filter((p) => !existingSkus.includes(p.sku));

    if (newProducts.length > 0) {
      const entities = productRepo.create(newProducts);
      await productRepo.save(entities);
      newProducts.forEach((p) => console.log(`Product '${p.name}' created`));
    } else {
      console.log("All Product entries already exist");
    }
  } catch (err) {
    console.error("Error seeding Product:", err);
    throw err;
  }
};
