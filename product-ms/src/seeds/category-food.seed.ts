import { AppDataSource } from "../common/data-access/data-source";
import CategoryFood from "../modules/product/models/category-food.persistence.entity";

export const seedCategoryFood = async () => {
  try {
    const repo = AppDataSource.getRepository(CategoryFood);

    const categories = [
    { name: "refrigerados" },
    { name: "secos" },
    { name: "congelados" },
  ];

    const existingCategories = await repo.find({
      where: categories.map((cat) => ({ name: cat.name })),
    });
    const existingNames = existingCategories.map((cat) => cat.name);

    const newCategories = categories.filter((cat) => !existingNames.includes(cat.name));

    if (newCategories.length > 0) {
      const entities = repo.create(newCategories);
      await repo.save(entities);
      newCategories.forEach((cat) => console.log(`CategoryFood '${cat.name}' created`));
    } else {
      console.log("All CategoryFood entries already exist");
    }
  } catch (err) {
    console.error("Error seeding CategoryFood:", err);
    throw err;
  }
};
