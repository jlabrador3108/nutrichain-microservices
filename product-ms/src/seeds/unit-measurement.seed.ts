import { AppDataSource } from "../common/data-access/data-source";
import UnitMeasurement from "../modules/product/models/unit-measurement.persistence.entity";

export const seedUnitMeasurement = async () => {
  try {
    const repo = AppDataSource.getRepository(UnitMeasurement);

    const units = [
      { name: "Kilogram", abbreviation: "kg" },
      { name: "Liter", abbreviation: "l" },
      { name: "Piece", abbreviation: "pcs" },
    ];

    const existingUnits = await repo.find({
      where: units.map((u) => ({ name: u.name })),
    });
    const existingNames = existingUnits.map((u) => u.name);

    const newUnits = units.filter((u) => !existingNames.includes(u.name));

    if (newUnits.length > 0) {
      const entities = repo.create(newUnits);
      await repo.save(entities);
      newUnits.forEach((u) => console.log(`UnitMeasurement '${u.name}' created`));
    } else {
      console.log("All UnitMeasurement entries already exist");
    }
  } catch (err) {
    console.error("Error seeding UnitMeasurement:", err);
    throw err;
  }
};
