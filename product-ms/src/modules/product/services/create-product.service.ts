import { AppDataSource } from "../../../common/data-access/data-source";
import { SingleResponse } from "../../../common/interfaces/response-interfaces";
import { ResponseHandler } from "../../../common/utils/response-handler";
import { CreateProductDto } from "../dtos/create-product.dto";
import { ProductProps } from "../entities/product.entity";
import CategoryFood from "../models/category-food.persistence.entity";
import Product from "../models/product.persistence.entity";
import UnitMeasurement from "../models/unit-measurement.persistence.entity";

export class CreateProductService {
  private productRepo = AppDataSource.getRepository(Product);
  private categoryFoodRepo = AppDataSource.getRepository(CategoryFood);
  private unitMeasurementRepo = AppDataSource.getRepository(UnitMeasurement);

  async create(data: CreateProductDto): Promise<SingleResponse<Product>> {
    const category = await this.categoryFoodRepo.findOne({ where: { id: data.categoryFoodId } });
    if (!category) {
      throw ResponseHandler.error({
        message: `CategoryFood with id: ${data.categoryFoodId} not found`,
        statusCode: 400,
      });
    }

    const unit = await this.unitMeasurementRepo.findOne({ where: { id: data.unitMeasurementId } });
    if (!unit) {
      throw ResponseHandler.error({
        message: `UnitMeasurement with id: ${data.unitMeasurementId} not found`,
        statusCode: 400,
      });
    }

    const existingSku = await this.productRepo.findOne({ where: { sku: data.sku } });
    if (existingSku) {
      throw ResponseHandler.error({
        message: `Product with sku: ${data.sku} already exists`,
        statusCode: 400,
      });
    }

    const productData: ProductProps = {
      name: data.name,
      description: data.description,
      imageUrl: data.imageUrl,
      weight: data.weight,
      sku: data.sku,
      categoryFood: category,
      unitMeasurement: unit,
    };

    const product = this.productRepo.create(productData);
    const savedProduct = await this.productRepo.save(product);

    return { data: savedProduct };
  }
}
