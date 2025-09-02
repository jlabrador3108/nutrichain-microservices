import { seedWarehouse } from "./warehouse.seed.js";
import { seedStock } from "./stock.seed.js";

const runSeeds = async () => {
  try {

    await seedWarehouse();
    await seedStock();

    console.log("All seeds executed successfully");
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

runSeeds();
